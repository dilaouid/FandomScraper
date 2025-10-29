/**
 * Get the base wiki URL from a full URL
 * @param url - The full URL of the wiki
 * @returns The base wiki URL
 */
export function getWikiUrl(url: string): string {
    const urlParts = url.split('/');
    urlParts.pop();
    return urlParts.join('/') + '/';
}

/**
 * Build a complete URL from a domain and href
 * @param domain - The domain origin
 * @param href - The relative or absolute href
 * @returns The complete URL
 */
export function getDataUrl(domain: string, href: string | null): string {
    return domain + href;
}

