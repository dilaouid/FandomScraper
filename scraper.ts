import jsdom from "jsdom";

import { IData, IDataSource, ISchema } from './interfaces';
import { Schemas } from './schemas';
import { TAvailableWikis } from './types';

import { allCharactersPage } from './utils/';
import { removeBrackets } from './func/parsing';

interface IConstructor {
    name: TAvailableWikis;
    language?: 'en' | 'fr' | null;
};

interface IGetCharactersOptions {
    limit: number;
    offset: number;
    recursive?: boolean;
    base64?: boolean;
    withId?: boolean;
};

export class FandomScraper {

    private _schema: ISchema;
    private _CharactersPage!: Document;

    constructor(constructor: IConstructor) {
        // check if constructor.name is a valid wiki
        if (!Schemas[constructor.name]) 
            throw new Error(`Invalid wiki name: ${constructor.name}`);
        if (constructor.language == null) constructor.language = 'en';
        this._schema = Schemas[constructor.name][constructor.language];
    }

    public getSchema(): ISchema {
        return this._schema;
    }

    public async getCharactersPage(url: string): Promise<void> {
        this._CharactersPage = await this.fetchPage(url);
    }

    public async fetchPage(url: string): Promise<Document> {
        const text = await fetch(url).then(async res => {
            return await res.text();
        }).catch(err => {
            throw new Error(`Error while fetching ${url}: ${err}`);
        }) as unknown as string;

        return new jsdom.JSDOM(text , { url: url, contentType: "text/html", referrer: url }).window.document;
    }

    public async getAll(options: IGetCharactersOptions = { offset: 0, limit: 100000, recursive: false, base64: true, withId: true }): Promise<any[]> {
        try {
            if (options.limit < 1) throw new Error('Limit must be greater than 0');
            if (options.offset < 0) throw new Error('Offset must be greater than 0');
            if (options.offset > options.limit) throw new Error('Offset must be less than limit');

            if (this._schema.pageFormat === 'classic') {
                return await this._getAllClassic(options);
            } else if (this._schema.pageFormat === 'table-1') {
                // parse in the table-1 way
            } else if (this._schema.pageFormat === 'table-2') {
                // parse in the table-2 way
            }
        } catch (err) {
            console.error(err);
        }
        return [];
    };

    private async _getAllClassic(options: IGetCharactersOptions): Promise<any[]> {
        const data: IData[] = [];
        const pageElement = allCharactersPage.classic.listCharactersElement;
        let hasNext = true;
        let offset = 0;
        let count = 0;
        await this.getCharactersPage(this._schema.charactersUrl);

        while (hasNext && count < options.limit) {
            const elements = this.filterBannedElement(this._CharactersPage.getElementsByClassName(pageElement.value), allCharactersPage.classic.banList);
            for (const element of elements) {
                var characterData = {};
                if (offset >= options.offset) {
                    const url = element.getAttribute('href');
                    if (!url) throw new Error('No URL found');
            
                    const name = element.textContent;
                    if (!name) throw new Error('No name found');

                    const characterPage = await this.fetchPage(new URL(url, this._schema.url).href);
                    if (options.recursive) {
                        characterData = await this.parseCharacterPage(characterPage, options);
                    }

                    if (options.withId) {
                        const allScripts = characterPage.getElementsByTagName('script');
                        const script = Array.from(allScripts).find(script => script.textContent?.includes('pageId'));
                        
                        const id: number = this.extractPageId(script?.textContent || '');
                        data.push({ id: id, url: url, name: name, data: characterData });
                    } else {
                        data.push({ url: url, name: name, data: characterData });
                    }

                    count++;
                    
                    if (!options.recursive) {
                        data[data.length - 1].data = undefined;
                    }

                    if (count == options.limit) {
                        return data; // Return the data when the limit is reached
                    }
                }
                offset++;
            }
          
            // Change the characters page according to the next button
            const nextElement = this._CharactersPage.getElementsByClassName(allCharactersPage.classic.next.value)[0];
            if (!nextElement) {
                hasNext = false;
            } else {
                const nextUrl = nextElement.getAttribute('href');
                if (!nextUrl) {
                    hasNext = false;
                } else {
                    await this.getCharactersPage(nextUrl);
                }
            }
        }
          
        return data;
    }

    private async parseCharacterPage(page: Document, options: IGetCharactersOptions): Promise<any> {
        const format: IDataSource = this._schema.dataSource;
        const data: any = {};
        // for each key in format, get the value from the page according to the attribute data-source=key and get the value
        for (const key in format) {
            if (Object.prototype.hasOwnProperty.call(format, key)) {
                const sourceKey = format[key as keyof IDataSource];
                if (!sourceKey) {
                    continue;
                }

                if (key === "images") {
                    // get the elements with the classname sourceKey
                    const elements = page.getElementsByClassName(sourceKey);
                    if (!elements) { 
                        continue;
                    }

                    const images: string[] = [];
                    for (const element of elements) {
                        // get src attribute
                        const src = element.getAttribute('src');
                        if (!src) { 
                            console.error(`No src found for key ${key}`);
                            continue;
                        }
                        if (options.base64) {
                            const b64 = await this.convertImageToBase64(src);
                            images.push(b64);
                        } else {
                            images.push(src);
                        }
                    }
                    data[key] = images;
                }

                const element = page.querySelector(`[data-source="${sourceKey}"]`);
                if (!element) {
                    continue;
                }

                // get the element with the classname pi-data-value inside the element
                const valueElement = element.getElementsByClassName('pi-data-value')[0];
                if (!valueElement) {
                    continue;
                }

                // get the value from the value element
                const value: string | null = valueElement.textContent;
                if (!value) {
                    continue;
                }
                
                data[key] = removeBrackets(value);
            }
        }
        return data;
    }

    private async convertImageToBase64(imageUrl: string) {
        try {
            const response = await fetch(imageUrl);
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const base64Image = buffer.toString('base64');
            return base64Image;        
        } catch (error) {
            console.error('Error fetching or converting image:', error);
            throw error;
        }
    }
    

    private filterBannedElement(elements: HTMLCollectionOf<Element>, banList: string[]): Element[] {
        const elementsArray = Array.from(elements);
        return elementsArray.filter((element) => {
            const innerText = element.textContent?.toLowerCase() ?? '';
            return !banList.some((substring) => innerText.includes(substring.toLowerCase()));
        });
    }

    private extractPageId(scriptContent: string): number {
        const regex = /"pageId":(\d+)/;
        const match = scriptContent.match(regex);
        if (match && match.length > 1) {
            return parseInt(match[1], 10);
        }
        return 0;
    }

}