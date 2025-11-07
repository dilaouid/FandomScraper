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

		// If provided selector returns nothing, try common infobox image fallbacks
		let candidates: Element[] = Array.from(elements as any);
		if (candidates.length === 0) {
			const fallbackNodeList = page.querySelectorAll(
				[
					'.portable-infobox img.mw-file-element',
					'.portable-infobox .image img',
					'.portable-infobox .pi-image img',
					'.portable-infobox .pi-image-thumbnail img',
					'.infobox-image img',
					'figure .image img',
					'figure.pi-item.pi-image img'
				].join(', ')
			);
			candidates = Array.from(fallbackNodeList);
		}

		const pickFromSrcset = (srcset: string | null): string | null => {
			if (!srcset) return null;
			const parts = srcset
				.split(',')
				.map(s => s.trim().split(' ')[0])
				.filter(Boolean);
			return parts.length > 0 ? parts[parts.length - 1] : null;
		};

		const resolveImageUrl = (element: Element): string | null => {
			// Prefer nested <img> if container is an anchor/div
			const isImg = element.tagName.toLowerCase() === 'img';
			const img = isImg ? element : element.querySelector('img');

			// Try common attributes in order
			let candidate =
				img?.getAttribute('data-src') ||
				img?.getAttribute('src') ||
				pickFromSrcset(img?.getAttribute('data-srcset') || null) ||
				pickFromSrcset(img?.getAttribute('srcset') || null) ||
				element.getAttribute('data-src') ||
				element.getAttribute('src');

			// Fallback: scan attributes for first http(s) that looks like an image
			if (!candidate) {
				const tryAttrs = (el: Element): string | null => {
					for (const attr of Array.from(el.attributes)) {
						const v = attr.value;
						if (!v) continue;
						if (/^https?:\/\//i.test(v) && /\.(png|jpe?g|gif|bmp|svg|webp|tiff?)(?:[/?].*)?$/i.test(v)) {
							return v;
						}
					}
					return null;
				};
				candidate = tryAttrs(img || element) || tryAttrs(element) || null;
			}

			// For anchors, try href if it points directly to an image resource
			if (!candidate && element.tagName.toLowerCase() === 'a') {
				const href = element.getAttribute('href');
				if (href && /^https?:\/\//i.test(href)) {
					candidate = href;
				}
			}

			return candidate ? extractImageURL(candidate) : null;
		};

		const images: string[] = [];
		const seen = new Set<string>();
		for (const element of candidates) {
			const src = resolveImageUrl(element);
			if (!src) {
				continue;
			}
			if (seen.has(src)) {
				continue;
			}
			seen.add(src);
			if (imagesConfig.ignore?.includes(src)) {
                continue;
			}
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

