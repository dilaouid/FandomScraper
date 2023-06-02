import { JSDOM } from 'jsdom';

import { IData, IDataSource, IDataset, IImage } from "./interfaces/datasets";
import { ISchema } from './interfaces/schemas';

import { Schemas } from './wikia';

import { allCharactersPage } from './utils/allCharactersPage';
import { formatForUrl, formatName, removeBrackets } from './func/parsing';
import { TAvailableWikis, availableWikis } from './types';

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

    /**
     * The substrings to ignore in the characters names (optional). Default: []
     */
    ignore?: string[];

    /**
     * The substrings to ignore in the characters names (optional). Default: []
     */
    attributes?: string[];
};

interface IGetCharacterOptions {
    /**
     * The name of the character you want to get.
     */
    name?: string;

    /**
     * If the scraper should get the images in base64 (optional). Default: false
     */
    base64?: boolean;
    
    /**
     * If the scraper should get the id of the character (optional). The id is the pageId of the wikia. Default: true
     */
    withId?: boolean;

    /**
     * The attributes to get in the character (optional). Default are the attributes of the schema.
     */
    attributes?: string[];
};

/**
 * FandomScraper is a class that allows you to scrape a Fandom wiki, and get all the characters of a fiction.
 * The list of available wikis can be found in the TAvailableWikis type.
 */
export class FandomScraper {

    protected _schema: ISchema;
    private _CharactersPage!: Document;
    private properties: string[] = [];
    private options: IGetCharactersOptions = {
        base64: false,
        recursive: false,
        withId: true,
        limit: 50,
        offset: 0,
        ignore: [],
        attributes: []
    };
    private method: 'find' | 'findByName' | 'findById' | undefined;
    private name: string = '';
    private id: number = 0;

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
        this._schema = Schemas[constructor.name][constructor.language || 'en'];
            
        this.properties = Object.keys(this._schema.dataSource);
    }


    /**
     * Get the schema of the current wiki.
     * @returns The schema of the wiki.
     */
    public getSchema(): ISchema {
        return this._schema;
    }

    /**
     * Set the limit of characters to get. Default: 50
     * @param {number} limit - The limit of characters to get.
     * @throws Error if the limit is less than 1.
     * @example
     * ```ts
     * await scraper.findAll({ base64: true, recursive: true, withId: true }).limit(100).exec();
     * ```
     */
    public limit(limit: number): this {
        if (this.method === 'findById' || this.method === 'findByName')
            throw new Error('Limit cannot be used with findById or findByName');
        if (limit < 1)
            throw new Error('Limit must be greater than 0');
        this.options.limit = limit;
        return this;
    };

    /**
     * Set the offset of characters to get. Default: 0
     * @param {number} offset - The offset of characters to get.
     * @throws Error if the offset is less than 0.
     * @example
     * ```ts
     * await scraper.findAll({ base64: true, recursive: true, withId: true }).offset(100).exec();
     * ```
     */
    public offset(offset: number): this {
        if (this.method === 'findById' || this.method === 'findByName')
            throw new Error('Offset cannot be used with findById or findByName');
        if (offset < 0)
            throw new Error('Offset must be greater than 0');
        this.options.offset = offset;
        return this;
    };

    /**
     * Set the ignored substrings in the characters names. Default: []
     * @param {string[]} ignore - The substrings to ignore in the characters names.
     * @throws Error if the ignore parameter is not an array.
     * @example
     * ```ts
     * await scraper.findAll({ base64: true, recursive: true, withId: true }).ignore(['(Dragon Ball Heroes)']).exec();
     * ```
     */
    public ignore(ignore: string[]): this {
        if (this.method === 'findById' || this.method === 'findByName')
            throw new Error('Ignore cannot be used with findById or findByName');

        if (!Array.isArray(ignore))
            throw new Error('Ignore parameter must be an array');
        this.options.ignore = ignore;
        return this;
    };

    /**
     * Set the attributes to get in the characters. Default are the attributes of the schema.
     * @param {string} attributes - The attributes to get in the characters.
     * @throws Error if the attributes parameter is not a string.
     * @example
     * ```ts
     * await scraper.findAll({ base64: true, recursive: true, withId: true }).attr('name images age kanji').exec();
     * ```
     */
    public attr(attributes: string): this {

        if (typeof attributes !== 'string')
            throw new Error('Attributes parameter must be a string');

        // remove double spaces
        attributes = attributes.replace(/\s\s+/g, ' ')?.trim();

        // split the string into an array
        this.options.attributes = attributes.split(' ');
        return this;
    };


    private reset(): void {
        this.options = {
            base64: false,
            recursive: false,
            withId: true,
            limit: 50,
            offset: 0,
            ignore: [],
            attributes: []
        };
    };



    /**
     * Get the characters page of the current wiki.
     *  
     * @param {string} url - The url of the characters page.
     * @returns The characters page of the wiki.
     * @throws Error if the characters page is not set.
     * @example
     * ```ts
     * await scraper.getCharactersPage('https://kimetsu-no-yaiba.fandom.com/fr/wiki/Catégorie:Personnages');
     * ```
     */
    private async getCharactersPage(url: string): Promise<void> {
        this._CharactersPage = await this.fetchPage(url);
    }

    private async fetchPage(url: string): Promise<Document> {
        const text = await fetch(url).then(async res => {
            const text = await res.text();
            return text;
        }).catch(err => {
            throw new Error(`Error while fetching ${url}: ${err}`);
        }) as unknown as string;

        return new JSDOM(text , { url: url, contentType: "text/html", referrer: url }).window.document;
    }


    /**
     * Get all the characters of the current wiki, considering the options provided.
     * @param {IGetCharactersOptions} [options] - The options of the getCharacters method.
     * @returns The characters of the wiki.
     * @throws Error if the limit is less than 1.
     * @throws Error if the offset is less than 0.
     * @example
     * ```ts
     * const characters = await scraper.getCharacters({ limit: 100, offset: 0, recursive: true, base64: true, withId: true });
     * ```
     * @deprecated Use the findAll method instead.
     */
    public async getAll(options: IGetCharactersOptions = { offset: 0, limit: 100000, recursive: false, base64: true, withId: true, ignore: [] }): Promise<any[]> {
        try {
            if (options.limit < 1) throw new Error('Limit must be greater than 0');
            if (options.offset < 0) throw new Error('Offset must be greater than 0');

            await this.getCharactersPage(this._schema.url);
            return await this._getAll(options);

        } catch (err) {
            console.error(err);
        }
        return [];
    };

    /**
     * Get all the characters of the current wiki, considering the options provided.
     * Must be called before the exec method and any other method.
     * @param { { base64: boolean, recursive: boolean, withId: boolean } } [options] - The options of the getCharacters method.
     * @returns The characters of the wiki.
     * @example
     * ```ts
     * const characters = await scraper.findAll({ base64: true, recursive: true, withId: true }).exec();
     * ```
     */
    public findAll(options: { base64: boolean, recursive: boolean, withId: boolean }): this {
        this.method = 'find';
        this.reset();

        this.options.base64 = options.base64;
        this.options.recursive = options.recursive;
        this.options.withId = options.withId;

        return this;
    };

    /**
     * Get a character of the current wiki according to its name, considering the options provided.
     * Must be called before the exec method and any other method.
     * @param {string} name - The name of the character to get.
     * @param { { base64: boolean, withId: boolean } } [options] - The options of the getCharacters method.
     * @returns The character of the wiki.
     * @throws Error if the name is not provided.
     * @example
     * ```ts
     * const character = await scraper.findByName('Tanjiro Kamado', { base64: true, withId: true }).exec();
     * ```
     */
    public findByName(name: string, options: { base64: boolean, withId: boolean }): this {
        if (name.trim().length == 0) throw new Error('Name must be provided');
        this.name = formatName(name);
        this.method = 'findByName';

        this.reset();
        return this;
    };

    /**
     * Get a character of the current wiki according to its id, considering the options provided.
     * Must be called before the exec method and any other method.
     * @param {number} id - The id of the character to get.
     * @param { { base64: boolean } } [options] - The options of the getCharacters method.
     * @returns The character of the wiki.
     * @throws Error if the id is less than 1.
     * @example
     * ```ts
     * const character = await scraper.findById(1, { base64: true }).exec();
     * ```
     */
    public findById(id: number, options: { base64: boolean }): this {
        if (id < 1) throw new Error('Id must be greater than 0');
        this.id = id;
        this.method = 'findById';

        this.reset();
        return this;
    };

    /**
     * Execute the method previously called. Must be called after all the methods to get the result.
     * @returns The result of the method previously called.
     * @throws Error if the method is not valid.
     * @example
     * ```ts
     * const characters = await scraper.findAll({ base64: true, recursive: true, withId: true }).limit(100).attributes('name images').exec();
     * ```
     */
    public async exec(): Promise<any> {
        try {
            switch (this.method) {
                case 'find':
                    await this.getCharactersPage(this._schema.url);
                    return await this._getAll(this.options);
                case 'findByName':
                    return await this._getByName(this.name, { base64: this.options.base64 || false, withId: this.options.withId || true, attributes: this.options.attributes || [] });
                case 'findById':
                    return await this._getById(this.id, { base64: this.options.base64 || false, attributes: this.options.attributes || [] });
                default:
                    throw new Error('Invalid method');
            }
        } catch (err) {
            console.error(err);
        }
        return [];
    };
    

    /**
     * Get a character of the current wiki according to its name, considering the options provided.
     * @param {IGetCharacterOptions} [options] - The options of the getCharacter method.
     * @returns The character of the wiki.
     * @throws Error if the name is not provided.
     * @throws Error if the character is not found.
     * @example
     * ```ts
     * const character = await scraper.getByName({ name: 'Goku', base64: true, withId: true });
     * ```
     * @deprecated Use the findByName method instead.
     */
    public async getByName(options: IGetCharacterOptions = { name: '', base64: false, withId: true }): Promise<IData | undefined> {
        try {
            if (options.name?.trim()?.length === 0) throw new Error('Name must be provided');

            const name = formatName(options.name || '');
            const url = this.getWikiUrl() + formatForUrl(name);
            const data: any = {
                name: name,
                url: this.getWikiUrl() + formatForUrl(name),
            }
            return this.fetchPage(url).then(async page => {
                const characterData = await this.formatCharacterData(page, options, data);
                if (!this.isValidCharacterPage(options.withId || false, characterData.data || null)) {
                    const switchName = formatName(name.split(' ').reverse().join(' '));
                    const url = this.getWikiUrl() + formatForUrl(switchName);
                    return this.fetchPage(url).then(async page => {
                        const retryData = await this.formatCharacterData(page, options, data);
                        if (!this.isValidCharacterPage(options.withId || false, retryData.data || null)) {
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

    public async _getByName(name: string, options: { base64: boolean, withId: boolean, attributes?: string[] }): Promise<IData | undefined> {
        try {
            const url = this.getWikiUrl() + formatForUrl(name);
            const data: any = {
                name: name,
                url: this.getWikiUrl() + formatForUrl(name),
            }
            return this.fetchPage(url).then(async page => {
                const characterData = await this.formatCharacterData(page, options, data);
                if (!this.isValidCharacterPage(options.withId || false, characterData.data || null)) {
                    const switchName = formatName(name.split(' ').reverse().join(' '));
                    const url = this.getWikiUrl() + formatForUrl(switchName);
                    return this.fetchPage(url).then(async page => {
                        const retryData = await this.formatCharacterData(page, options, data);
                        if (!this.isValidCharacterPage(options.withId || false, retryData.data || null)) {
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
    };

    /**
     * Get a character of the current wiki by its id, considering the options provided.
     * @param {number} id - The id of the character.
     * @param {IGetCharacterOptions} [options] - The options of the getCharacter method.
     * @returns The character of the wiki.
     * @throws Error if the id is less than 1.
     * @throws Error if the character does not exists.
     * @example
     * ```ts
     * const scraper = new FandomScraper({ name: 'dragon-ball' });
     * const character = await scraper.getById(1, { base64: true, withId: true });
     * ```
     * @deprecated Use the findById method instead.
     */
    public async getById(id: number, options: IGetCharacterOptions = { name: '', base64: false, withId: true }): Promise<any> {
        try {
            if (id < 1) throw new Error('Id must be greater than 0');
            
            return this._getById(id, options);
        } catch(err) {
            console.error(err);
        }
    }

    public async _getById(id: number, options: { base64?: boolean, withId?: boolean, attributes?: string[] }): Promise<any> {

        const url = this.getWikiUrl() + `?curid=${id}`;
        const data: any = {
            url: url,
        };

        return this.fetchPage(url).then(async page => {
            const name = page.querySelector('.mw-page-title-main')?.textContent || '';
            data.name = name;
            const characterData = await this.formatCharacterData(page, options, data);
            
            if (!this.isValidCharacterPage(options.withId || false, characterData.data || null)) {
                throw new Error(`This character with this id does not exists: ${id}`);
            }
            return characterData;
        });
    };



    /**
     * Get all the available wikis of the FandomScraper class.
     * @returns The available wikis.
     */
    public getAvailableWikis(): string[] {
        return availableWikis;
    };



    private async _getOne(page: Document, options: IGetCharacterOptions): Promise<IData> {
        const characterData = await this.parseCharacterPage(page, options.base64, options.attributes);
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
     * @param {IGetCharactersOptionsDeprecated} [options] - The options of the getCharacters method.
     * @returns The characters of the wiki.
     */
    private async _getAll(options: IGetCharactersOptions): Promise<any[]> {
        const data: IData[] = [];
        let hasNext = true;
        let offset = 0;
        let count = 0;

        while (hasNext && count < options.limit) {
            const elements = this.getElementAccordingToFormat(options.ignore);
            for (const element of elements) {
                var characterData = {};
                if (offset >= options.offset) {
                    const url = this.getUrlAccordingToFormat(element);
            
                    const name = element.textContent;
                    if (!name) throw new Error('No name found');

                    if (options.recursive || options.withId) {
                        const characterPage = await this.fetchPage(new URL(url, this.getWikiUrl()).href);
                        if (options.recursive) {
                            characterData = await this.parseCharacterPage(characterPage, options.base64, options.attributes);
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
            await this.getCharactersPage(this._schema.url);
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

    private async parseCharacterPage(page: Document, getBase64: boolean | undefined, attributes?: string[]): Promise<any> {
        const format: IDataSource = this._schema.dataSource;
        const data: any = {};

        // remove attributes elements that are not in the format
        if (attributes) {
            attributes = attributes.filter(attribute => Object.keys(format).includes(attribute));
        }

        // if attributes is length 0, set it to the default attributes of the format
        if (!attributes || attributes.length === 0) {
            attributes = Object.keys(format);
        }

        // for each key in format, get the value from the page according to the attribute data-source=key and get the value
        for (const key in format) {
            if (attributes.includes(key)) {
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
                } else {
                    const element = this.getDataAccordingToVersion(page, sourceKey);
                    if (!element) {
                        continue;
                    }
    
                    // get the value from the value element
                    const value: string | null = element.textContent;
                    if (!value) {
                        continue;
                    }
                    
                    data[key] = removeBrackets(value);
                }
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
    private filterBannedElement(elements: HTMLCollectionOf<Element>, ignore: string[]): Element[] {
        const elementsArray = Array.from(elements);
        return elementsArray.filter((element) => {
            const innerText = element.textContent?.toLowerCase() ?? '';
            return !ignore.some((substring) => innerText.includes(substring.toLowerCase()));
        });
    }

    /**
     * 
     * Get the data from the infobox according to if the wiki is in the old version or not
     * @param page
     * @param key
     * @returns The data from the page according to the old version of the wiki
     * 
     */
    private getDataAccordingToVersion(page: Document, key: string | IImage): Element | null {
        if (this.isOldVersion(page)) {
            const tdElement = Array.from(page.querySelectorAll('.mw-parser-output td')).find((td) => {
                return td?.textContent?.includes(String(key));
            });
            return tdElement?.nextElementSibling || null;
        } else {
            return page.querySelector(`[data-source="${key}"] .pi-data-value`);
        }
    }

    private extractPageId(scriptContent: string): number {
        const regex = /"pageId":(\d+)/;
        const match = scriptContent.match(regex);
        if (match && match.length > 1)
            return parseInt(match[1], 10);
        return 0;
    }

    private getElementAccordingToFormat(ignore?: string[]): Element[] | NodeListOf<Element> {

        // merge ignore and allCharactersPage.classic.ignore arrays
        const ignoreList = ignore ? [...ignore, ...allCharactersPage.classic.ignore] : allCharactersPage.classic.ignore;

        if (this._schema.pageFormat === 'classic') {
            const value = allCharactersPage.classic.listCharactersElement.value;
            return this.filterBannedElement(this._CharactersPage.getElementsByClassName(value), ignoreList);
        } else if (this._schema.pageFormat === 'table-1') {
            return this._CharactersPage.querySelectorAll('table.wikitable td:nth-child(2) a');
        } else if (this._schema.pageFormat === 'table-2') {
            return this._CharactersPage.querySelectorAll('small > b');
        }

        throw new Error('Invalid page format');
    }

    private getUrlAccordingToFormat(element: Element): string {
        if (this._schema.pageFormat === 'classic') {
            const url = this.getDataUrl(element.getAttribute('href'));
            if (!url) throw new Error('No URL found');
            return url;
        } else if (this._schema.pageFormat === 'table-1') {
            const url = this.getDataUrl(element.getAttribute('href'));
            if (!url) throw new Error('No URL found');
            return url;
        } else if (this._schema.pageFormat === 'table-2') {
            const aElement = element.querySelector('a');
            if (!aElement) throw new Error('No <a> element found');

            const url = this.getDataUrl(aElement.getAttribute('href'));
            if (!url) throw new Error('No URL found');
            return url;
        }

        return '';
    }

    private isValidCharacterPage(withId: boolean, data: IDataset | null): boolean {
        if (!data) {
            return false;
        } 
        return data && ( !(withId && Object.keys(data).length === 2) || !(!withId && Object.keys(data).length === 1) );
    }

    private isOldVersion(page: Document): boolean {
        return page.querySelector('.pi-data-value') === null;
    }

    private getWikiUrl(): string {
        const parts = this._schema.url.split('/');
        const baseParts = parts.slice(0, 3);
        return baseParts.join('/') + '/';
    };

    private getDataUrl(href: string | null): string {
        return this.getWikiUrl() + href;
    };

}


/**
 * This class allows you to define your own schema for a fandom wiki scraper
 * @class
 */
export class FandomPersonalScraper extends FandomScraper {
    constructor(schema: ISchema) {
        super({ name: 'one-piece', language: 'en' });

        // check if the schema is valid
        if (!schema.url || !schema.pageFormat || !schema.dataSource) {
            throw new Error('The schema you provided is not valid');
        }

        if (schema.dataSource.images) {
            // if schema.dataSource.images doesnt have the get function or the identifier property then throw an error
            if (!schema.dataSource.images.get || !schema.dataSource.images.identifier) {
                throw new Error('The schema you provided is not valid');
            }
        }

        this._schema = schema;
    }
}