import { allCharactersPage } from './allCharactersPage';

/**
 * Remove the elements from the characters list that contains one of the banned substring
 * @param elements - The elements to filter
 * @param ignore - The list of substring to ban
 * @returns The filtered elements
 */
export function filterBannedElement(elements: HTMLCollectionOf<Element> | NodeListOf<Element>, ignore: string[]): Element[] {
    const elementsArray = Array.from(elements);
    return elementsArray.filter((element) => {
        const innerText = element.textContent?.toLowerCase() ?? '';
        return !ignore.some((substring) => innerText.includes(substring.toLowerCase()));
    });
}

/**
 * Check if a page format is a custom format
 * @param pageFormat - The format to check
 * @returns True if the format is a custom configuration object
 */
function isCustomPageFormat(pageFormat: TPageFormat): pageFormat is ICustomPageFormat {
    return typeof pageFormat === 'object' && 'selector' in pageFormat;
}

/**
 * Get elements according to the page format
 * @param page - The characters page document
 * @param pageFormat - The format of the page (predefined or custom)
 * @param ignore - Optional list of strings to ignore
 * @returns The filtered elements
 */
export function getElementAccordingToFormat(
    page: Document,
    pageFormat: TPageFormat,
    ignore?: string[]
): Element[] | NodeListOf<Element> {
    // Handle custom page format
    if (isCustomPageFormat(pageFormat)) {
        const elements = page.querySelectorAll(pageFormat.selector);
        const customIgnoreList = pageFormat.ignore || [];
        const combinedIgnoreList = ignore ? [...ignore, ...customIgnoreList] : customIgnoreList;
        
        if (combinedIgnoreList.length > 0) {
            return filterBannedElement(elements, combinedIgnoreList);
        }
        
        return elements;
    }

    // Handle predefined formats
    const ignoreList = ignore ? [...ignore, ...allCharactersPage.classic.ignore] : allCharactersPage.classic.ignore;

    if (pageFormat === 'classic') {
        const value = allCharactersPage.classic.listCharactersElement.value;
        return filterBannedElement(page.getElementsByClassName(value), ignoreList);
    } else if (pageFormat === 'table-1') {
        return page.querySelectorAll('table.wikitable td:nth-child(2) a');
    } else if (pageFormat === 'table-2') {
        return page.querySelectorAll('small > b');
    } else if (pageFormat === 'table-3') {
        return page.querySelectorAll('table.fandom-table td:nth-child(2)');
    } else if (pageFormat === 'table-4') {
        return page.querySelectorAll('.characterbox th:nth-child(1) a');
    } else if (pageFormat === 'table-5') {
        return page.querySelectorAll('table.wikitable.sortable td:nth-child(1) a');
    } else if (pageFormat === 'table-6') {
        // Generic table under #mw-content-text where names are in 2nd column
        return page.querySelectorAll('#mw-content-text table td:nth-child(1) a');
    }

    throw new Error('Invalid page format');
}

/**
 * Get the next button configuration for a page format
 * @param pageFormat - The format of the page (predefined or custom)
 * @returns The next button configuration or null if not supported
 */
export function getNextButtonConfig(pageFormat: TPageFormat): { type: string; value: string } | null {
    // Handle custom page format
    if (isCustomPageFormat(pageFormat)) {
        return pageFormat.next || null;
    }

    // Handle predefined formats
    if (typeof pageFormat === 'string' && pageFormat in allCharactersPage) {
        const config = allCharactersPage[pageFormat as TPageFormats];
        if (config && config.next && config.next.value) {
            return config.next;
        }
    }

    return null;
}

/**
 * Get URL from an element according to the page format
 * @param element - The element to extract URL from
 * @param pageFormat - The format of the page (predefined or custom)
 * @param getDataUrlFn - Function to build complete URL
 * @returns The extracted URL
 */
export function getUrlAccordingToFormat(
    element: Element,
    pageFormat: TPageFormat,
    getDataUrlFn: (href: string | null) => string
): string {
    // Handle custom page format
    if (isCustomPageFormat(pageFormat)) {
        // For custom formats, try to get href directly from element first
        let href = element.getAttribute('href');
        
        // If no href, try to find an <a> tag inside
        if (!href) {
            const aElement = element.querySelector('a');
            if (aElement) {
                href = aElement.getAttribute('href');
            }
        }
        
        const url = getDataUrlFn(href);
        if (!url) throw new Error('No URL found');
        return url;
    }

    // Handle predefined formats
    if (pageFormat === 'classic') {
        const url = getDataUrlFn(element.getAttribute('href'));
        if (!url) throw new Error('No URL found');
        return url;
    } else if (pageFormat === 'table-1') {
        const url = getDataUrlFn(element.getAttribute('href'));
        if (!url) throw new Error('No URL found');
        return url;
    } else if (pageFormat === 'table-2') {
        const aElement = element.querySelector('a');
        if (!aElement) throw new Error('No <a> element found');
        const url = getDataUrlFn(aElement.getAttribute('href'));
        if (!url) throw new Error('No URL found');
        return url;
    } else if (pageFormat === 'table-3') {
        const aElement = element.querySelector('a');
        if (!aElement) throw new Error('No <a> element found');
        const url = getDataUrlFn(aElement.getAttribute('href'));
        if (!url) throw new Error('No URL found');
        return url;
    } else if (pageFormat === 'table-4') {
        const url = getDataUrlFn(element.getAttribute('href'));
        if (!url) throw new Error('No URL found');
        return url;
    } else if (pageFormat === 'table-5') {
        const url = getDataUrlFn(element.getAttribute('href'));
        if (!url) throw new Error('No URL found');
        return url;
    } else if (pageFormat === 'table-6') {
        const url = getDataUrlFn(element.getAttribute('href'));
        if (!url) throw new Error('No URL found');
        return url;
    }

    return '';
}

