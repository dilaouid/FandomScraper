import { Schemas } from '../wikia/index';
import { allCharactersPage } from '../utils/allCharactersPage';
import { formatForUrl, formatName } from '../func/parsing';
import { availableWikis } from '../types/dynamic.types';
import type { TAvailableWikis } from '../types/dynamic.types';
import type { IGetCharactersOptions, IGetCharacterOptions } from '../types/options.types';
import type { IMetaData, WikiaParameters } from '../types/metadata.types';

import { PageFetcher } from '../services/PageFetcher';
import { CharacterParser } from '../services/CharacterParser';
import { DataExtractor } from '../services/DataExtractor';
import { QueryBuilder } from '../services/QueryBuilder';

import { getWikiUrl, getDataUrl } from '../utils/urlUtils';
import { isValidCharacterPage, setPageVersion } from '../utils/validationUtils';
import { getElementAccordingToFormat, getUrlAccordingToFormat, getNextButtonConfig } from '../utils/elementUtils';

/**
 * FandomScraper is a class that allows you to scrape a Fandom wiki, and get all the characters of a fiction.
 * The list of available wikis can be found in the TAvailableWikis type.
 */
export class FandomScraper {
    protected _schema: ISchema;
    private _CharactersPage!: Document;
    private method: 'find' | 'findByName' | 'findById' | undefined;
    private name: string = '';
    private wikiaParameters: WikiaParameters;
    private id: number = 0;
    private isOldVersion: boolean = false;

    // Services
    private pageFetcher: PageFetcher;
    private characterParser: CharacterParser;
    private dataExtractor: DataExtractor;
    private queryBuilder: QueryBuilder;

    /**
     * Constructs a FandomScraper instance.
     * @param { name: TAvailableWikis, options?: { lang: 'en' | 'fr' | null } } options - The options of the constructor.
     * @throws Error if an invalid wiki name is provided.
     * @example
     * ```ts
     * const scraper = new FandomScraper({ name: 'dragon-ball', language: 'fr' });
     * ```
     */
    constructor(name: TAvailableWikis, options?: { lang: 'en' | 'fr' | null }) {
        if (!Object.keys(Schemas).includes(name)) throw new Error(`Invalid wiki name provided: ${name}`);
        this._schema = Schemas[name][options?.lang || 'en'];
        this.wikiaParameters = {
            name: name,
            lang: options?.lang || 'en'
        };

        // Initialize services
        this.pageFetcher = new PageFetcher();
        this.characterParser = new CharacterParser();
        this.dataExtractor = new DataExtractor();
        this.queryBuilder = new QueryBuilder();
    }

    /**
     * Get the schema of the current wiki.
     * @returns The schema of the wiki.
     */
    public getSchema(): ISchema {
        return this._schema;
    }

    /**
     * Get metadata about the current wiki. (availables attributes, language, etc...)
     * @returns The metadata of the wiki.
     */
    public async getMetadata(options: { withCount: boolean } = { withCount: true }): Promise<IMetaData> {
        const schema = Schemas[this.wikiaParameters.name];
        const count = options.withCount ? await this.count() : 0;
        const data: IMetaData = {
            name: this.wikiaParameters.name,
            count: count,
            attributes: Object.keys(this._schema.dataSource),
            language: this.wikiaParameters.lang,
            availableLanguages: Object.keys(schema),
            url: this._schema.url
        };

        if (!options.withCount)
            delete data.count;

        return data;
    }

    /**
     * Set the url of the characters page of the wiki in the schema.
     * @param {string} url - The url of the characters page.
     * @returns The FandomScraper instance.
     */
    public setCharactersPage(url: string): this {
        this._schema.url = url;
        return this;
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
        this.queryBuilder.setLimit(limit);
        return this;
    }

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
        this.queryBuilder.setOffset(offset);
        return this;
    }

    /**
     * Set the language of the current wiki instance.
     * @param {'en' | 'fr'} lang - The language to set
     * @returns The FandomScraper instance
     * @throws Error if the language is not available for this wiki
     * @example
     * ```ts
     * await scraper.setLanguage('fr');
     * ```
    */
    public setLanguage(lang: 'en' | 'fr'): this {
        const schema = Schemas[this.wikiaParameters.name];
        if (!Object.keys(schema).includes(lang)) {
            throw new Error(`Language ${lang} is not available for this wiki`);
        }
        this._schema = schema[lang];
        this.wikiaParameters.lang = lang;
        return this;
    }

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
        this.queryBuilder.setIgnore(ignore);
        return this;
    }

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
        this.queryBuilder.setAttributes(attributes);
        return this;
    }

    /**
     * Set the keys of the attributes that should be converted to an array instead of a string. Default: []
     * @param {string} attributes - The keys of the attributes that should be converted to an array instead of a string.
     * @throws Error if the attributes parameter is not a string.
     * @example
     * ```ts
     * await scraper.findAll({ base64: true, recursive: true, withId: true }).attrToArray('age height voiceActor').exec();
     * ```
     */
    public attrToArray(attributes: string): this {
        this.queryBuilder.setAttrToArray(attributes);
        return this;
    }

    /**
     * Get the characters page of the current wiki.
     * @param {string} url - The url of the characters page.
     * @returns The characters page of the wiki.
     * @example
     * ```ts
     * await scraper.getCharactersPage('https://kimetsu-no-yaiba.fandom.com/fr/wiki/Catégorie:Personnages');
     * ```
     */
    private async getCharactersPage(url: string): Promise<void> {
        this._CharactersPage = await this.pageFetcher.fetchPage(url);
        this.isOldVersion = setPageVersion(this._CharactersPage);
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
    }

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
        this.queryBuilder.reset();
        this.queryBuilder.setBase64(options.base64);
        this.queryBuilder.setRecursive(options.recursive);
        this.queryBuilder.setWithId(options.withId);
        return this;
    }

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
        this.queryBuilder.reset();

        if (name.trim().length == 0) throw new Error('Name must be provided');
        this.name = formatName(name);
        this.method = 'findByName';

        this.queryBuilder.setBase64(options.base64);
        this.queryBuilder.setWithId(options.withId);

        return this;
    }

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
    public findById(id: number, options?: { base64: boolean }): this {
        if (id < 1) throw new Error('Id must be greater than 0');
        this.id = id;
        this.method = 'findById';

        this.queryBuilder.reset();
        this.queryBuilder.setBase64(options?.base64 || false);
        return this;
    }

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
            const options = this.queryBuilder.getOptions();
            switch (this.method) {
                case 'find':
                    await this.getCharactersPage(this._schema.url);
                    return await this._getAll(options);
                case 'findByName':
                    return await this._getByName(this.name, { base64: options.base64 ?? false, withId: options.withId ?? true, attributes: options.attributes ?? [] });
                case 'findById':
                    return await this._getById(this.id, { base64: options.base64 || false, attributes: options.attributes || [] });
                default:
                    throw new Error('Invalid method');
            }
        } catch (err) {
            console.error(err);
        }
        return [];
    }

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
            return await this._getByName(name, { 
                base64: options.base64 ?? false, 
                withId: options.withId ?? true, 
                attributes: options.attributes 
            });
        } catch (err) {
            console.error(err);
        }
    }

    private async _getByName(name: string, options: { base64: boolean, withId: boolean, attributes?: string[] }): Promise<IData | undefined> {
        try {
            const url = this.getWikiUrlInternal() + formatForUrl(name);
            const data: any = {
                name: name,
                url: url,
            }
            return this.pageFetcher.fetchPage(url).then(async page => {
                const isValid: boolean = this.isValidCharacterPageInternal(page);
                if (!isValid) {
                    const switchName = formatName(name.split(' ').reverse().join(' '));
                    const url = this.getWikiUrlInternal() + formatForUrl(switchName);
                    return this.pageFetcher.fetchPage(url).then(async page => {
                        const isValid: boolean = this.isValidCharacterPageInternal(page);
                        if (!isValid) {
                            throw new Error(`This character does not exists: ${name}`);
                        } else {
                            data.url = url;
                            return await this.formatCharacterData(page, options, data);
                        }
                    }).catch(err => {
                        throw new Error(`Error while fetching ${url}: ${err}`);
                    });
                } else {
                    return await this.formatCharacterData(page, options, data);
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

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
    public async getById(id: number, options: IGetCharacterOptions = { name: '', base64: false }): Promise<any> {
        try {
            if (id < 1) throw new Error('Id must be greater than 0');
            return this._getById(id, options);
        } catch (err) {
            console.error(err);
        }
    }

    private async _getById(id: number, options?: { base64?: boolean, attributes?: string[] }): Promise<any> {
        const url = this.getWikiUrlInternal() + `?curid=${id}`;
        const data: any = {
            url: url,
        };

        return this.pageFetcher.fetchPage(url).then(async page => {
            const name = page.querySelector('.mw-page-title-main')?.textContent || '';
            data.name = name;
            const characterData = await this.formatCharacterData(page, options || { base64: false }, data);

            if (!this.isValidCharacterPageInternal(page)) {
                throw new Error(`This character with this id does not exists: ${id}`);
            }
            return characterData;
        });
    }

    /**
     * Get all the available wikis of the FandomScraper class.
     * @returns The available wikis.
     */
    public getAvailableWikis(): WikiaParameters[] {
        return availableWikis.map(wiki => ({
            name: wiki,
            lang: 'en'
        }));
    }

    private async _getOne(page: Document, options: IGetCharacterOptions): Promise<IData> {
        const characterData = await this.characterParser.parseCharacterPage(
            page, 
            this._schema.dataSource, 
            options.base64, 
            this.queryBuilder.getKeysAttrToArray(),
            options.attributes
        );
        if (options.withId) {
            const id: number = this.dataExtractor.extractPageId(page);
            characterData.id = id;
        }
        return characterData;
    }

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
            const elements = getElementAccordingToFormat(this._CharactersPage, this._schema.pageFormat, options.ignore);
            for (const element of elements) {
                var characterData = {};
                if (offset >= options.offset) {
                    const url = getUrlAccordingToFormat(
                        element, 
                        this._schema.pageFormat,
                        (href) => getDataUrl(new URL(this._schema.url).origin, href)
                    );

                    const name = element.textContent;
                    if (!name) throw new Error('No name found');

                    if (options.recursive || options.withId) {
                        const characterPage = await this.pageFetcher.fetchPage(new URL(url, this.getWikiUrlInternal()).href);
                        if (options.recursive) {
                            characterData = await this.characterParser.parseCharacterPage(
                                characterPage,
                                this._schema.dataSource,
                                options.base64,
                                this.queryBuilder.getKeysAttrToArray(),
                                options.attributes
                            );
                        }

                        if (options.withId) {
                            const id: number = this.dataExtractor.extractPageId(characterPage);
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
                        return data;
                    }
                }
                offset++;
            }

            // Change the characters page according to the next button
            const nextConfig = getNextButtonConfig(this._schema.pageFormat);
            if (!nextConfig || !nextConfig.value) {
                hasNext = false;
            } else {
                const nextElement = this._CharactersPage.getElementsByClassName(nextConfig.value)[0];
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
                count += getElementAccordingToFormat(this._CharactersPage, this._schema.pageFormat).length;
                const nextConfig = getNextButtonConfig(this._schema.pageFormat);
                if (!nextConfig || !nextConfig.value) {
                    hasNext = false;
                } else {
                    const nextElement = this._CharactersPage.getElementsByClassName(nextConfig.value)[0];
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
            }
        } catch (err) {
            console.error(err);
        }
        return count;
    }

    /**
     * Fetches a webpage from the specified URL and extracts quotes from it.
     *
     * The method retrieves the page content using the provided URL and extracts quote data
     * by using either a schema-defined selector or by querying for <blockquote> elements.
     * It then processes the found elements using an extraction method, handling both string
     * and array formats of the quote content, and returns a list of quotes as strings.
     *
     * @param url - The URL of the webpage from which to extract quotes.
     * @returns A promise that resolves to an array of quote strings.
     *
     * @throws Will throw an error if fetching the page or processing the quote extraction fails.
     */
    public async getQuotes(url: string): Promise<string[]> {
        try {
            const page = await this.pageFetcher.fetchPage(url);
            const quotes: string[] = [];
            const dataSource = this._schema.dataSource.quote;
            if (dataSource) {
                let quoteElements: Element[] = [];
                if (typeof dataSource === "object" && dataSource.get) {
                    const element = dataSource.get(page);
                    if (element) quoteElements.push(element);
                } else if (typeof dataSource === "string") {
                    const elements = page.querySelectorAll(dataSource);
                    quoteElements = Array.from(elements);
                }
                for (const element of quoteElements) {
                    const quote = this.dataExtractor.extractQuoteFromElement(element);
                    const finalQuote = typeof quote === 'string' ? quote : quote.join(' ');
                    quotes.push(finalQuote);
                }
            } else {
                const blockquotes = page.querySelectorAll('blockquote');
                blockquotes.forEach((blockquote) => {
                    const quote = this.dataExtractor.extractQuoteFromElement(blockquote);
                    const finalQuote = typeof quote === 'string' ? quote : quote.join(' ');
                    quotes.push(finalQuote);
                });
            }
            return quotes;
        } catch (err) {
            console.error('Erreur dans getQuotes:', err);
            throw err;
        }
    }

    private isValidCharacterPageInternal(page: Document): boolean {
        return isValidCharacterPage(page, this._schema.url, (p) => this.dataExtractor.extractPageId(p));
    }

    private getWikiUrlInternal(): string {
        return getWikiUrl(this._schema.url);
    }
}

