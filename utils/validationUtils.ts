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
    if (!page) {
        return false;
    }
    
    const id = extractPageIdFn(page);
    if (id === 0) {
        return false;
    }

    const pageString = page.documentElement.innerHTML;
    const parsedUrl = new URL(schemaUrl);
    const path = parsedUrl.pathname;

    if (!pageString.includes(path)) {
        return false;
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

