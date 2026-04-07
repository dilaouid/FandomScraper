const USER_AGENT = 'FandomScraper/1.0';

export interface IMediaWikiCharacterEntry {
    pageid: number;
    title: string;
    profileImage: string | null;
}

type IMediaWikiGeneratorResponse = {
    continue?: {
        gcmcontinue?: string;
        [key: string]: string | undefined;
    };
    query?: {
        pages?: Record<string, {
            pageid: number;
            title: string;
            original?: {
                source: string;
            };
        }>;
    };
    error?: {
        code?: string;
        info?: string;
    };
};

/**
 * Fetch one page of characters from the MediaWiki generator API.
 * Uses action=query&generator=categorymembers with prop=pageimages to get
 * title, pageid and profile image in a single request.
 *
 * @param apiBaseUrl - The full URL to api.php (e.g. https://wiki.fandom.com/api.php)
 * @param categoryTitle - Full category title including namespace (e.g. "Category:Characters")
 * @param continuationToken - Optional gcmcontinue token for pagination
 * @returns Members on this page and an optional token for the next page
 */
export async function fetchCharacterList(
    apiBaseUrl: string,
    categoryTitle: string,
    continuationToken?: string
): Promise<{ members: IMediaWikiCharacterEntry[]; nextToken?: string }> {
    const url = new URL(apiBaseUrl);
    url.searchParams.set('action', 'query');
    url.searchParams.set('generator', 'categorymembers');
    url.searchParams.set('gcmtitle', categoryTitle);
    url.searchParams.set('gcmnamespace', '0');
    url.searchParams.set('gcmlimit', '500');
    url.searchParams.set('prop', 'pageimages');
    url.searchParams.set('piprop', 'original');
    url.searchParams.set('format', 'json');

    if (continuationToken) {
        url.searchParams.set('gcmcontinue', continuationToken);
    }

    const response = await fetch(url.href, {
        headers: { 'User-Agent': USER_AGENT }
    }).catch((err) => {
        throw new Error(`MediaWiki API unreachable at ${url.href}: ${err}`);
    });

    if (!response.ok) {
        throw new Error(`MediaWiki API error: HTTP ${response.status} for ${url.href}`);
    }

    const body = await response.text();
    let data: IMediaWikiGeneratorResponse;
    try {
        data = JSON.parse(body) as IMediaWikiGeneratorResponse;
    } catch {
        throw new Error(`Invalid JSON response from MediaWiki API: ${url.href}`);
    }

    if (data.error) {
        throw new Error(`MediaWiki API error: ${data.error.info ?? data.error.code ?? 'unknown'}`);
    }

    const pages = data.query?.pages ?? {};
    const members: IMediaWikiCharacterEntry[] = Object.values(pages)
        .filter((page) => page.pageid > 0)
        .map((page) => ({
            pageid: page.pageid,
            title: page.title,
            profileImage: page.original?.source ?? null,
        }));

    return {
        members,
        nextToken: data.continue?.gcmcontinue,
    };
}

/**
 * Fetch all characters from a MediaWiki category, following pagination automatically.
 * Stops early once `maxEntries` items have been collected.
 *
 * @param apiBaseUrl - The full URL to api.php
 * @param categoryTitle - Full category title including namespace
 * @param maxEntries - Stop collecting after this many entries (default: Infinity)
 * @returns All collected character entries
 */
export async function fetchAllCharacters(
    apiBaseUrl: string,
    categoryTitle: string,
    maxEntries: number = Infinity
): Promise<IMediaWikiCharacterEntry[]> {
    const allMembers: IMediaWikiCharacterEntry[] = [];
    let nextToken: string | undefined;

    do {
        const { members, nextToken: token } = await fetchCharacterList(apiBaseUrl, categoryTitle, nextToken);
        allMembers.push(...members);
        nextToken = token;
    } while (nextToken && allMembers.length < maxEntries);

    return allMembers;
}

/**
 * Fetch only the entries in the window [offset, offset + limit) from a MediaWiki category,
 * applying `ignoreList` filtering on the fly so that offset and limit are measured against
 * the filtered stream — not raw API entries.
 *
 * This avoids loading all preceding entries into memory when the offset is large: batches
 * of 500 are streamed and discarded as soon as enough valid entries have been seen.
 *
 * @param apiBaseUrl   - Full URL to api.php
 * @param categoryTitle - Full category title (e.g. "Category:Characters")
 * @param offset       - Number of valid (non-ignored) entries to skip
 * @param limit        - Maximum number of entries to return
 * @param ignoreList   - Substrings: entries whose title contains any of them are skipped
 * @returns The slice of valid entries for the requested window
 */
export async function fetchCharacterWindow(
    apiBaseUrl: string,
    categoryTitle: string,
    offset: number,
    limit: number,
    ignoreList: string[] = []
): Promise<IMediaWikiCharacterEntry[]> {
    if (limit <= 0) return [];

    const result: IMediaWikiCharacterEntry[] = [];
    let nextToken: string | undefined;
    let seen = 0; // valid (non-ignored) entries before our window

    do {
        const { members, nextToken: token } = await fetchCharacterList(apiBaseUrl, categoryTitle, nextToken);
        nextToken = token;

        for (const member of members) {
            const ignored = ignoreList.some(
                (sub) => member.title.toLowerCase().includes(sub.toLowerCase())
            );
            if (ignored) continue;

            if (seen < offset) {
                seen++;
                continue;
            }

            result.push(member);
            if (result.length === limit) return result;
        }
    } while (nextToken);

    return result;
}
