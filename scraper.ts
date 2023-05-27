import jsdom from "jsdom";

import { IData, IDataSource, ISchema } from './interfaces';
import { Schemas } from './schemas';
import { TAvailableWikis } from './types';

import { allCharactersPage } from './utils/';
import { formatForUrl, formatName, removeBrackets, switchFirstAndLastName } from './func/parsing';

/**
 * The constructor options.
 * @typedef {Object} IConstructor
 * @property {TAvailableWikis} name - The name of the fiction you want to scrape from the Fandom wiki (ex: 'dragon-ball')
 * @property {'en' | 'fr' | null} [language] - The language of the wiki you want to scrape from the Fandom wiki (optional). Default: 'en'
 */
interface IConstructor {
    /**
     * The name of the fiction you want to scrape from the Fandom wiki (ex: 'dragon-ball')
     */
    name: TAvailableWikis;

    /**
     * The language of the wiki you want to scrape from the Fandom wiki (optional). Default: 'en'
     */
    language?: 'en' | 'fr' | null;
};

interface IGetCharactersOptions {
    
    /**
     * The limit of characters to get (optional). Default: 100000
     */
    limit: number;

    /**
     * The offset of characters to get (optional). Default: 0
     */
    offset: number;

    /**
     * If the scraper should get all the characters recursively (optional). Default: false
     */
    recursive?: boolean;

    /**
     * If the scraper should get the images in base64 (optional). Default: false
     */
    base64?: boolean;

    /**
     * If the scraper should get the id of the character (optional). The id is the pageId of the wikia. Default: false
     */
    withId?: boolean;
};

interface IGetCharacterOptions {
    /**
     * The name of the character you want to get.
     */
    name: string;

    /**
     * If the scraper should get the images in base64 (optional). Default: false
     */
    base64?: boolean;
    
    /**
     * If the scraper should get the id of the character (optional). The id is the pageId of the wikia. Default: true
     */
    withId?: boolean;
};

/**
 * FandomScraper is a class that allows you to scrape a Fandom wiki, and get all the characters of a fiction.
 * The list of available wikis can be found in the TAvailableWikis type.
 */
export class FandomScraper {

    private _schema: ISchema;
    private _CharactersPage!: Document;

    /**
     * Constructs a FandomScraper instance.
     * @param {IConstructor} constructor - The constructor options.
     * @throws Error if an invalid wiki name is provided.
     * @example
     * ```ts
     * const scraper = new FandomScraper({ name: 'dragon-ball', language: 'fr' });
     * ```
     */
    constructor(constructor: IConstructor) {
        if (!Object.keys(Schemas).includes(constructor.name)) throw new Error(`Invalid wiki name provided: ${constructor.name}`);
        if (constructor.language == null) constructor.language = 'en';
        this._schema = Schemas[constructor.name][constructor.language];
    }


    /**
     * Get the schema of the current wiki.
     * @returns The schema of the wiki.
     */
    public getSchema(): ISchema {
        return this._schema;
    }



    /**
     * Get the characters page of the current wiki.
     *  
     * @param {string} url - The url of the characters page.
     * @returns The characters page of the wiki.
     * @throws Error if the characters page is not set.
     * @example
     * ```ts
     * const scraper = new FandomScraper({ name: 'dragon-ball' });
     * await scraper.getCharactersPage('https://kimetsu-no-yaiba.fandom.com/fr/wiki/Catégorie:Personnages');
     * ```
     */
    public async getCharactersPage(url: string): Promise<void> {
        this._CharactersPage = await this.fetchPage(url);
    }

    public async fetchPage(url: string): Promise<Document> {
        const text = await fetch(url).then(async res => {
            const text = await res.text();
            return text;
        }).catch(err => {
            throw new Error(`Error while fetching ${url}: ${err}`);
        }) as unknown as string;

        return new jsdom.JSDOM(text , { url: url, contentType: "text/html", referrer: url }).window.document;
    }


    /**
     * Get all the characters of the current wiki, considering the options provided.
     * @param {IGetCharactersOptions} [options] - The options of the getCharacters method.
     * @returns The characters of the wiki.
     * @throws Error if the limit is less than 1.
     * @throws Error if the offset is less than 0.
     * @throws Error if the offset is greater than the limit.
     * @example
     * ```ts
     * const scraper = new FandomScraper({ name: 'dragon-ball' });
     * const characters = await scraper.getCharacters({ limit: 100, offset: 0, recursive: true, base64: true, withId: true });
     * ```
     */
    public async getAll(options: IGetCharactersOptions = { offset: 0, limit: 100000, recursive: false, base64: true, withId: true }): Promise<any[]> {
        try {
            if (options.limit < 1) throw new Error('Limit must be greater than 0');
            if (options.offset < 0) throw new Error('Offset must be greater than 0');
            if (options.offset > options.limit) throw new Error('Offset must be less than limit');

            await this.getCharactersPage(this._schema.charactersUrl);
            return await this._getAll(options);

        } catch (err) {
            console.error(err);
        }
        return [];
    };
    

    public async get(options: IGetCharacterOptions = { name: '', base64: false, withId: true }): Promise<any> {
        try {
            const name = formatName(options.name);
            const url = this._schema.url + formatForUrl(name);
            const data: any = {
                name: name,
                url: this._schema.url + formatForUrl(name),
            }
            return this.fetchPage(url).then(async page => {
                const characterData = await this.formatCharacterData(page, options, data);
                if (characterData.data && ( (options.withId && Object.keys(characterData.data).length === 2) || (!options.withId && Object.keys(characterData.data).length === 1) )) {
                    const switchName = formatName(name.split(' ').reverse().join(' '));
                    const url = this._schema.url + formatForUrl(switchName);
                    return this.fetchPage(url).then(async page => {
                        const retryData = await this.formatCharacterData(page, options, data);
                        if (retryData.data && ( (options.withId && Object.keys(retryData.data).length === 2) || (!options.withId && Object.keys(retryData.data).length === 1) )) {
                            throw new Error(`This character does not exists: ${name}`);
                        }
                        data.url = url;
                        return retryData;
                    }).catch(err => {
                        throw new Error(`Error while fetching ${url}: ${err}`);
                    });
                } else {
                    return characterData;
                }
            });
        } catch(err) {
            console.error(err);
        }
    }


    private async _getOne(page: Document, options: IGetCharacterOptions): Promise<IData> {
        const characterData = await this.parseCharacterPage(page, options.base64);
        if (options.withId) {
            const allScripts = page.getElementsByTagName('script');
            const script = Array.from(allScripts).find(script => script.textContent?.includes('pageId'));
            
            const id: number = this.extractPageId(script?.textContent || '');
            characterData.id = id;
        }
        return characterData;
    };

    private async formatCharacterData(page: Document, options: IGetCharacterOptions, data: any): Promise<IData> {
        const character = await this._getOne(page, options);
        if (options.withId) {
            data.id = character.id;
            character.id = undefined;
        }
        data.data = character;
        return data;
    }

    /**
     * Get all the characters of the current wiki, considering the options provided.
     * Works only for the classic characters page format.
     * @param {IGetCharactersOptions} [options] - The options of the getCharacters method.
     * @returns The characters of the wiki.
     */
    private async _getAll(options: IGetCharactersOptions): Promise<any[]> {
        const data: IData[] = [];
        let hasNext = true;
        let offset = 0;
        let count = 0;

        while (hasNext && count < options.limit) {
            const elements = this.getElementAccordingToFormat();
            for (const element of elements) {
                var characterData = {};
                if (offset >= options.offset) {
                    const url = this.getUrlAccordingToFormat(element);
            
                    const name = element.textContent;
                    if (!name) throw new Error('No name found');

                    if (options.recursive || options.withId) {
                        const characterPage = await this.fetchPage(new URL(url, this._schema.url).href);
                        if (options.recursive) {
                            characterData = await this.parseCharacterPage(characterPage, options.base64);
                        }

                        if (options.withId) {
                            const allScripts = characterPage.getElementsByTagName('script');
                            const script = Array.from(allScripts).find(script => script.textContent?.includes('pageId'));
                            
                            const id: number = this.extractPageId(script?.textContent || '');
                            data.push({ id: id, url: url, name: name, data: characterData });
                        } else {
                            data.push({ url: url, name: name, data: characterData });
                        }
                    } else {
                        data.push({ url: url, name: name });
                    }

                    count++;
                    
                    if (!options.recursive) {
                        data[data.length - 1].data = undefined;
                    }

                    if (!options.withId) {
                        data[data.length - 1].id = undefined;
                    }

                    if (count == options.limit) {
                        return data; // Return the data when the limit is reached
                    }
                }
                offset++;
            }
          
            // Change the characters page according to the next button
            const nextElement = this._CharactersPage.getElementsByClassName(allCharactersPage[this._schema.pageFormat].next.value)[0];
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

    /**
     * Count the number of characters of the current wiki and return the number.
     * @returns The number of characters of the wiki.
     * @async
     */
    public async count(): Promise<number> {
        var count = 0;
        try {
            let hasNext = true;
            await this.getCharactersPage(this._schema.charactersUrl);
            while (hasNext) {
                count += this.getElementAccordingToFormat().length;
                const nextElement = this._CharactersPage.getElementsByClassName(allCharactersPage[this._schema.pageFormat].next.value)[0];
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
        } catch(err) {
            console.error(err);
        }
        return count;
    }

    private async parseCharacterPage(page: Document, getBase64: boolean | undefined): Promise<any> {
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
                    const elements = format.images?.get(page);
                    if (!elements) { 
                        continue;
                    }

                    const images: string[] = [];
                    for (const element of elements) {
                        // get src attribute
                        const src = element.getAttribute('src');
                        // if src is a base64 image, continue
                        if (src?.startsWith('data:image')) {
                            continue;
                        }


                        if (!src) { 
                            console.error(`No src found for key ${key}`);
                            continue;
                        }
                        if (getBase64) {
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

    /**
     * Convert the image from the given URL to a base64 string
     * Due to somes issues about CORS, this method is sometimes necessary to print the image in your application
     * @param {string} imageUrl The URL of the image to convert
     * @returns The base64 string of the image
     * @throws An error if the image cannot be fetched or converted
     */
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
    

    /**
     * Remove the elements from the characters list that contains one of the banned substring
     * @param {HTMLCollectionOf<Element>} elements The elements to filter
     * @param {string[]} banList The list of substring to ban
     * @returns The filtered elements
     */
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

    private getElementAccordingToFormat(): Element[] | NodeListOf<Element> {
        if (this._schema.pageFormat === 'classic') {
            const value = allCharactersPage.classic.listCharactersElement.value;
            return this.filterBannedElement(this._CharactersPage.getElementsByClassName(value), allCharactersPage.classic.banList);
        } else if (this._schema.pageFormat === 'table-1') {
            return this._CharactersPage.querySelectorAll('table.wikitable td:nth-child(2) a');
        } else if (this._schema.pageFormat === 'table-2') {
            return this._CharactersPage.querySelectorAll('small > b');
        }

        throw new Error('Invalid page format');
    }

    private getUrlAccordingToFormat(element: Element): string {
        if (this._schema.pageFormat === 'classic') {
            const url = element.getAttribute('href');
            if (!url) throw new Error('No URL found');
            return url;
        } else if (this._schema.pageFormat === 'table-1') {
            const url = element.getAttribute('href');
            if (!url) throw new Error('No URL found');
            return url;
        } else if (this._schema.pageFormat === 'table-2') {
            const aElement = element.querySelector('a');
            if (!aElement) throw new Error('No <a> element found');

            const url = aElement.getAttribute('href');
            if (!url) throw new Error('No URL found');
            return url;
        }

        return '';
    }


}