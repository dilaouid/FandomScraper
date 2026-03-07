const WIKI_PATH_MARKER = '/wiki/';
const CATEGORY_CONTINUE_PARAM = 'fandomscraper-cmcontinue';

/**
 * Get the base wiki URL from a full URL
 * @param url - The full URL of the wiki
 * @returns The base wiki URL
 */
export function getWikiUrl(url: string): string {
    const parsedUrl = new URL(url);
    const wikiMarkerIndex = parsedUrl.pathname.indexOf(WIKI_PATH_MARKER);

    if (wikiMarkerIndex === -1) {
        return `${parsedUrl.origin}${parsedUrl.pathname.replace(/\/?$/, '/')}`;
    }

    const wikiPath = parsedUrl.pathname.slice(0, wikiMarkerIndex + WIKI_PATH_MARKER.length);
    return new URL(wikiPath, parsedUrl.origin).href;
}

/**
 * Build a complete URL from a domain and href
 * @param domain - The domain origin
 * @param href - The relative or absolute href
 * @returns The complete URL
 */
export function getDataUrl(domain: string, href: string | null): string {
    if (!href) {
        return '';
    }

    return new URL(href, domain).href;
}

/**
 * Check whether a URL targets a Fandom wiki page.
 * @param url - The URL to inspect
 * @returns True when the URL belongs to a Fandom wiki page
 */
export function isFandomPageUrl(url: string): boolean {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname.endsWith('fandom.com') && parsedUrl.pathname.includes(WIKI_PATH_MARKER);
}

/**
 * Build the MediaWiki API endpoint associated with a wiki page URL.
 * @param url - The wiki page URL
 * @returns The corresponding API endpoint URL
 */
export function getWikiApiUrl(url: string): string {
    const parsedUrl = new URL(url);
    const wikiMarkerIndex = parsedUrl.pathname.indexOf(WIKI_PATH_MARKER);

    if (wikiMarkerIndex === -1) {
        throw new Error(`Cannot build API URL from non-wiki URL: ${url}`);
    }

    const apiPath = `${parsedUrl.pathname.slice(0, wikiMarkerIndex)}/api.php`;
    return new URL(apiPath, parsedUrl.origin).href;
}

/**
 * Extract the MediaWiki title from a wiki page URL.
 * @param url - The wiki page URL
 * @returns The decoded page title, or null when unavailable
 */
export function getWikiTitleFromUrl(url: string): string | null {
    const parsedUrl = new URL(url);
    const wikiMarkerIndex = parsedUrl.pathname.indexOf(WIKI_PATH_MARKER);

    if (wikiMarkerIndex === -1) {
        return null;
    }

    const encodedTitle = parsedUrl.pathname.slice(wikiMarkerIndex + WIKI_PATH_MARKER.length);
    if (!encodedTitle) {
        return null;
    }

    return decodeURIComponent(encodedTitle);
}

/**
 * Build a wiki page URL from a MediaWiki page title.
 * @param sourceUrl - Any URL from the same wiki
 * @param title - The MediaWiki page title
 * @returns The corresponding wiki page URL
 */
export function buildWikiPageUrl(sourceUrl: string, title: string): string {
    const normalizedTitle = title
        .split('/')
        .map((segment) => encodeURIComponent(segment.replace(/ /g, '_')).replace(/%3A/gi, ':'))
        .join('/');

    return new URL(normalizedTitle, getWikiUrl(sourceUrl)).href;
}

/**
 * Read the synthetic category pagination token from a URL.
 * @param url - The URL to inspect
 * @returns The continuation token, or null when absent
 */
export function getCategoryContinuationToken(url: string): string | null {
    return new URL(url).searchParams.get(CATEGORY_CONTINUE_PARAM);
}

/**
 * Build a synthetic URL that carries a category continuation token.
 * @param url - The base category page URL
 * @param continuationToken - The MediaWiki category continuation token
 * @returns The synthetic continuation URL
 */
export function buildCategoryContinuationUrl(url: string, continuationToken: string): string {
    const nextUrl = new URL(url);
    nextUrl.searchParams.set(CATEGORY_CONTINUE_PARAM, continuationToken);
    return nextUrl.href;
}

