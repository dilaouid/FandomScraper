import { removeBrackets } from '../func/parsing';

/**
 * Service responsible for extracting data from DOM elements
 */
export class DataExtractor {
    /**
     * Extract page ID from a page document
     * @param page - The page document
     * @returns The page ID, or 0 if not found
     */
    extractPageId(page: Document): number {
        const allScripts = page.getElementsByTagName('script');
        const script = Array.from(allScripts).find(script => script.textContent?.includes('pageId'))?.textContent;
        if (!script) {
            return 0;
        }

        const regex = /"pageId":(\d+)/;
        const match = script.match(regex);
        if (match && match.length > 1)
            return parseInt(match[1], 10);
        return 0;
    }

    /**
     * Extract data from the infobox according to the page version (old or new)
     * @param page - The page document
     * @param key - The data source key
     * @param isOldVersion - Whether the page uses the old infobox format
     * @returns The element containing the data, or null if not found
     */
    getDataAccordingToVersion(page: Document, key: string | IImage, isOldVersion: boolean): Element | null {
        if (isOldVersion) {
            const identifier = '.mw-parser-output';

            const tdElement = Array.from(page.querySelectorAll(identifier + ' td')).find((td) => {
                return td?.textContent?.includes(String(key));
            });
            if (tdElement?.nextElementSibling) {
                return tdElement?.nextElementSibling;
            }

            const thElement = Array.from(page.querySelectorAll(identifier + ' th')).find((th) => {
                return th?.textContent?.includes(String(key));
            });
            if (thElement?.nextElementSibling) {
                return thElement.nextElementSibling;
            }

            return null;
        } else {
            return page.querySelector(`[data-source="${key}"] .pi-data-value`);
        }
    }

    /**
     * Set the value from an element, either as a string or an array
     * @param element - The element to extract value from
     * @param inAttrToArray - Whether to return an array
     * @returns The extracted value
     */
    setValue(element: Element, inAttrToArray: boolean): string[] | string {
        if (inAttrToArray) {
            let value = [element.innerHTML];

            // Split by <br>, <br />, and <li> elements
            value = value.flatMap((item) =>
                item.split(/<br\s*\/?>|<li[^>]*>/).map((value) => removeBrackets(value))
            );
            
            // remove inner tags from the value
            for (let i = 0; i < value.length; i++) {
                const decodedValue = value[i]
                    .replace(/<[^>]*>?/gm, '') // Remove inner tags
                    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with a space
                    .replace(/&lt;br\s*\/?&gt;/g, ''); // Remove HTML line break entity
                value[i] = decodedValue.trim();
            }

            // remove empty values
            const filteredValue = value.filter(value => value !== '');
            return filteredValue;
        } else {
            return removeBrackets(element.textContent || '');
        }
    }

    /**
     * Extract the quote text from a given DOM element
     * @param element - The DOM element from which to extract the quote
     * @returns The extracted quote as a string, or an array of quotes if the element is a list
     */
    extractQuoteFromElement(element: Element): string | string[] {
        if (element.tagName.toLowerCase() === 'ul') {
            const quotes: string[] = [];
            element.querySelectorAll('li').forEach(li => {
                const quote = this.extractQuoteFromElement(li);
                if (typeof quote === 'string' && quote.length > 0) {
                    quotes.push(quote);
                } else if (Array.isArray(quote)) {
                    quotes.push(...quote);
                }
            });
            return quotes;
        }

        const citeElement = element.querySelector('cite, sup');
        let quoteText: string;
        if (citeElement) {
            const clone = element.cloneNode(true) as HTMLElement;
            const citeClone = clone.querySelector('cite, sup');
            if (citeClone) {
                citeClone.remove();
            }
            quoteText = clone.textContent?.trim() || '';
        } else {
            quoteText = element.textContent?.trim() || '';
        }
        return quoteText;
    }
}

