import { allCharactersPage } from './allCharactersPage';

/**
 * Remove the elements from the characters list that contains one of the banned substring
 * @param elements - The elements to filter
 * @param ignore - The list of substring to ban
 * @returns The filtered elements
 */
export function filterBannedElement(elements: HTMLCollectionOf<Element>, ignore: string[]): Element[] {
    const elementsArray = Array.from(elements);
    return elementsArray.filter((element) => {
        const innerText = element.textContent?.toLowerCase() ?? '';
        return !ignore.some((substring) => innerText.includes(substring.toLowerCase()));
    });
}

/**
 * Get elements according to the page format
 * @param page - The characters page document
 * @param pageFormat - The format of the page
 * @param ignore - Optional list of strings to ignore
 * @returns The filtered elements
 */
export function getElementAccordingToFormat(
    page: Document,
    pageFormat: string,
    ignore?: string[]
): Element[] | NodeListOf<Element> {
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
    }

    throw new Error('Invalid page format');
}

/**
 * Get URL from an element according to the page format
 * @param element - The element to extract URL from
 * @param pageFormat - The format of the page
 * @param getDataUrlFn - Function to build complete URL
 * @returns The extracted URL
 */
export function getUrlAccordingToFormat(
    element: Element,
    pageFormat: string,
    getDataUrlFn: (href: string | null) => string
): string {
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
    }

    return '';
}

