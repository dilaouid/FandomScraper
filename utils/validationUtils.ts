/**
 * Check if a page is a valid character page
 * @param page - The page document to validate
 * @param schemaUrl - The schema URL to compare against
 * @param extractPageIdFn - Function to extract page ID
 * @returns True if the page is valid, false otherwise
 */
export function isValidCharacterPage(
    page: Document,
    schemaUrl: string,
    extractPageIdFn: (page: Document) => number
): boolean {
    if (!page) return false;

    // A valid character/article page should have a non-zero pageId
    const id = extractPageIdFn(page);
    if (id === 0) return false;

    // If a canonical link is present, ensure it matches the same host as the schema URL
    try {
        const schemaHost = new URL(schemaUrl).host;
        const canonicalHref = page.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
        if (canonicalHref) {
            const canonicalHost = new URL(canonicalHref).host;
            if (schemaHost !== canonicalHost) return false;
        }
    } catch {
        // Ignore URL parsing errors and consider the page valid based on pageId
    }

    return true;
}

/**
 * Determine if a page is using the old infobox version
 * @param page - The page document to check
 * @returns True if the page uses the old version, false otherwise
 */
export function setPageVersion(page: Document): boolean {
    return page.querySelectorAll('.pi-data-value') === null || page.querySelectorAll('.pi-data-value').length < 2;
}

