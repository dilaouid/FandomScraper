import { extractImageURL } from '../utils/extractImageURL';
import { convertImageToBase64 } from '../utils/imageUtils';
import { setPageVersion } from '../utils/validationUtils';
import { DataExtractor } from './DataExtractor';

/**
 * Service responsible for parsing character data from pages
 */
export class CharacterParser {
    private dataExtractor: DataExtractor;

    constructor() {
        this.dataExtractor = new DataExtractor();
    }

    /**
     * Parse a character page and extract all data according to the schema
     * @param page - The character page document
     * @param schema - The schema defining data sources
     * @param getBase64 - Whether to convert images to base64
     * @param keysAttrToArray - Keys that should be converted to arrays
     * @param attributes - Specific attributes to extract (optional)
     * @returns The parsed character data
     */
    async parseCharacterPage(
        page: Document,
        schema: IDataSource,
        getBase64: boolean | undefined,
        keysAttrToArray: string[],
        attributes?: string[]
    ): Promise<any> {
        const data: any = {};

        // remove attributes elements that are not in the format
        if (attributes) {
            attributes = attributes.filter(attribute => Object.keys(schema).includes(attribute));
        }

        // if attributes is length 0, set it to the default attributes of the format
        if (!attributes || attributes.length === 0) {
            attributes = Object.keys(schema);
        }

        const isOldVersion = setPageVersion(page);

        // for each key in format, get the value from the page according to the attribute data-source=key and get the value
        for (const key in schema) {
            if (attributes.includes(key) || keysAttrToArray.includes(key)) {
                const sourceKey = schema[key as keyof IDataSource];
                if (!sourceKey) {
                    continue;
                }

                if (key === "images") {
                    const images = await this.parseImages(page, schema.images, getBase64);
                    data[key] = images;
                } else if (key === "quote") {
                    const quote = this.parseQuote(page, sourceKey);
                    if (quote) {
                        data["quote"] = quote;
                    }
                } else {
                    const element: Element | null = this.dataExtractor.getDataAccordingToVersion(page, sourceKey, isOldVersion);
                    if (!element) {
                        continue;
                    }

                    // get the value from the value element
                    const value: string[] | string = this.dataExtractor.setValue(element, keysAttrToArray.includes(key));
                    if (!value || value.length === 0) {
                        continue;
                    }
                    data[key] = value;
                }
            }
        }
        return data;
    }

    /**
     * Parse images from a character page
     * @param page - The page document
     * @param imagesConfig - The images configuration from schema
     * @param getBase64 - Whether to convert images to base64
     * @returns Array of image URLs or base64 strings
     */
    private async parseImages(
        page: Document,
        imagesConfig: IImage | undefined,
        getBase64: boolean | undefined
    ): Promise<string[]> {
        if (!imagesConfig) {
            return [];
        }

        const elements = imagesConfig.get(page);
        if (!elements) {
            return [];
        }

        const images: string[] = [];
        for (const element of elements) {
            let src = element.getAttribute('src');
            
            // if src is a base64 image, continue
            if (src?.startsWith('data:image')) {
                const attributes = element.attributes;
                // check if one of the attributes value starts with http
                for (const attribute of attributes) {
                    if (attribute.value.startsWith('http')) {
                        src = attribute.value;
                        break;
                    }
                }
            }

            if (!src) {
                console.error(`No src found for images`);
                continue;
            }
            
            src = extractImageURL(src);
            if (imagesConfig.ignore?.includes(src))
                continue;

            if (getBase64) {
                const b64 = await convertImageToBase64(src);
                images.push(b64);
            } else {
                images.push(src);
            }
        }
        return images;
    }

    /**
     * Parse quote from a character page
     * @param page - The page document
     * @param sourceKey - The source key for the quote
     * @returns The parsed quote
     */
    private parseQuote(page: Document, sourceKey: any): string | string[] | null {
        let quoteElement: Element | null = null;
        if (sourceKey && typeof sourceKey === "object" && "get" in sourceKey) {
            quoteElement = (sourceKey as IQuote).get(page);
        } else if (typeof sourceKey === "string") {
            quoteElement = page.querySelector(sourceKey);
        }
        
        if (quoteElement) {
            return this.dataExtractor.extractQuoteFromElement(quoteElement);
        }
        return null;
    }
}

