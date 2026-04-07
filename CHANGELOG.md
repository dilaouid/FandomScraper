# Changelog

## [Unreleased] — Performance improvements (MediaWiki path)

### Context

The `findAll().limit(n).offset(o).exec()` pipeline, when the schema uses the
MediaWiki generator API path (`category` field + Fandom URL), had two
performance problems at scale:

1. **Over-fetching on large offsets** — the implementation called
   `fetchAllCharacters(offset + limit)` which accumulated every entry from
   the beginning of the category before slicing. For a page at `offset = 1000`
   with `limit = 12`, the library was fetching at least 1 012 raw entries from
   the API (multiple HTTP requests of 500 entries each) even though only 12
   were needed.

2. **Sequential page fetches when `recursive: true`** — character pages were
   fetched one at a time inside a `for` loop, meaning the wall-clock time grew
   linearly with the number of results per page.

---

### Changes

#### `services/MediaWikiClient.ts` — new export `fetchCharacterWindow`

```ts
fetchCharacterWindow(
  apiBaseUrl: string,
  categoryTitle: string,
  offset: number,
  limit: number,
  ignoreList?: string[]
): Promise<IMediaWikiCharacterEntry[]>
```

Streams category members in batches of 500, applying `ignore` filtering on
the fly.  `offset` and `limit` are measured against the **filtered** stream
(same semantics as before), so ignored entries never consume an offset slot.
The function returns as soon as it has collected `limit` valid entries — no
further API calls are made.

`fetchAllCharacters` is **unchanged** (still used by `count()`).

#### `utils/concurrency.ts` — new utility `pMap`

A lightweight concurrent-map helper (no new npm dependency):

```ts
pMap<T, R>(items: T[], fn: (item: T, index: number) => Promise<R>, concurrency: number): Promise<R[]>
```

Runs at most `concurrency` calls in flight at any time and preserves result
order.

#### `core/FandomScraper.ts` — updated `_getAllViaMediaWiki`

- Calls `fetchCharacterWindow` instead of `fetchAllCharacters` + filter + slice.
- When `recursive: false`, entries are mapped synchronously (no I/O).
- When `recursive: true`, individual character pages are fetched via `pMap`
  with a default concurrency of **5** (`FandomScraper.CONCURRENT_FETCHES`).

---

### Performance impact

| Scenario | Before | After |
|---|---|---|
| `offset=0, limit=12` | 1 API call (500 entries loaded) | 1 API call (500 entries streamed, 12 kept) |
| `offset=500, limit=12` | 2 API calls (1 012 entries loaded) | 2 API calls (1 012 entries streamed, 12 kept) |
| `offset=1000, limit=12` | 3 API calls (1 012 entries loaded) | 3 API calls (1 012 entries streamed, 12 kept) |
| `recursive=true, limit=12` | 12 sequential HTTP fetches | up to 5 parallel HTTP fetches |

API call count for the category list is unchanged (still O(offset/500 + 1)).
Memory usage is reduced because preceding batches are not accumulated.

---

### Rate-limiting note

The concurrency pool (`CONCURRENT_FETCHES = 5`) is a conservative default.
Fandom wikis generally tolerate short bursts of 4–8 parallel requests, but if
you observe `429 Too Many Requests` errors you can work around them by setting
`recursive: false` and fetching character pages individually, or by contributing
a configurable concurrency option (see below).

---

### Public API

**No breaking changes.** All existing method signatures are preserved:
`.findAll()`, `.limit()`, `.offset()`, `.ignore()`, `.attr()`, `.attrToArray()`,
`.exec()`, `fetchAllCharacters`, `fetchCharacterList`.

`fetchCharacterWindow` is a new named export from
`services/MediaWikiClient.ts` (semver: **minor**).

---

### Semver recommendation

This is a **minor** release (`1.2.0`): new export, no breaking changes,
observable performance improvement.
