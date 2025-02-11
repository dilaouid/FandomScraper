declare const availableWikis: readonly ["berserk", "death-note", "dororo", "dragon-ball", "fumetsu-no-anata-e", "hellsing", "jojo", "kimetsu-no-yaiba", "koe-no-katachi", "naruto", "one-piece", "shiki", "shingeki-no-kyojin", "promised-neverland"];
type TAvailableWikis = typeof availableWikis[number];

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
}
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
}
interface IMetaData {
    name: string;
    language: 'en' | 'fr';
    attributes: string[];
    count?: number;
    availableLanguages: string[];
    url: string;
}
interface WikiaParameters {
    name: TAvailableWikis;
    lang: 'en' | 'fr';
}
/**
 * FandomScraper is a class that allows you to scrape a Fandom wiki, and get all the characters of a fiction.
 * The list of available wikis can be found in the TAvailableWikis type.
 */
declare class FandomScraper {
    protected _schema: ISchema;
    private _CharactersPage;
    private options;
    private method;
    private name;
    private wikiaParameters;
    private id;
    private keysAttrToArray;
    private isOldVersion;
    /**
     * Constructs a FandomScraper instance.
     * @param { name: TAvailableWikis, options?: { lang: 'en' | 'fr' | null } } options - The options of the constructor.
     * @throws Error if an invalid wiki name is provided.
     * @example
     * ```ts
     * const scraper = new FandomScraper({ name: 'dragon-ball', language: 'fr' });
     * ```
     */
    constructor(name: TAvailableWikis, options?: {
        lang: 'en' | 'fr' | null;
    });
    /**
     * Get the schema of the current wiki.
     * @returns The schema of the wiki.
     */
    getSchema(): ISchema;
    /**
     * Get metadata about the current wiki. (availables attributes, language, etc...)
     * @returns The metadata of the wiki.
     */
    getMetadata(options?: {
        withCount: boolean;
    }): Promise<IMetaData>;
    /**
     * Set the url of the characters page of the wiki in the schema.
     * @param {string} url - The url of the characters page.
     * @returns The FandomScraper instance.
     */
    setCharactersPage(url: string): this;
    /**
     * Set the limit of characters to get. Default: 50
     * @param {number} limit - The limit of characters to get.
     * @throws Error if the limit is less than 1.
     * @example
     * ```ts
     * await scraper.findAll({ base64: true, recursive: true, withId: true }).limit(100).exec();
     * ```
     */
    limit(limit: number): this;
    /**
     * Set the offset of characters to get. Default: 0
     * @param {number} offset - The offset of characters to get.
     * @throws Error if the offset is less than 0.
     * @example
     * ```ts
     * await scraper.findAll({ base64: true, recursive: true, withId: true }).offset(100).exec();
     * ```
     */
    offset(offset: number): this;
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
    setLanguage(lang: 'en' | 'fr'): this;
    /**
     * Set the ignored substrings in the characters names. Default: []
     * @param {string[]} ignore - The substrings to ignore in the characters names.
     * @throws Error if the ignore parameter is not an array.
     * @example
     * ```ts
     * await scraper.findAll({ base64: true, recursive: true, withId: true }).ignore(['(Dragon Ball Heroes)']).exec();
     * ```
     */
    ignore(ignore: string[]): this;
    /**
     * Set the attributes to get in the characters. Default are the attributes of the schema.
     * @param {string} attributes - The attributes to get in the characters.
     * @throws Error if the attributes parameter is not a string.
     * @example
     * ```ts
     * await scraper.findAll({ base64: true, recursive: true, withId: true }).attr('name images age kanji').exec();
     * ```
     */
    attr(attributes: string): this;
    /**
     * Set the keys of the attributes that should be converted to an array instead of a string. Default: []
     * @param {string} attributes - The keys of the attributes that should be converted to an array instead of a string.
     * @throws Error if the attributes parameter is not a string.
     * @example
     * ```ts
     * await scraper.findAll({ base64: true, recursive: true, withId: true }).attrToArray('age height voiceActor').exec();
     * ```
     */
    attrToArray(attributes: string): this;
    private reset;
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
    private getCharactersPage;
    private fetchPage;
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
    getAll(options?: IGetCharactersOptions): Promise<any[]>;
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
    findAll(options: {
        base64: boolean;
        recursive: boolean;
        withId: boolean;
    }): this;
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
    findByName(name: string, options: {
        base64: boolean;
        withId: boolean;
    }): this;
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
    findById(id: number, options: {
        base64: boolean;
    }): this;
    /**
     * Execute the method previously called. Must be called after all the methods to get the result.
     * @returns The result of the method previously called.
     * @throws Error if the method is not valid.
     * @example
     * ```ts
     * const characters = await scraper.findAll({ base64: true, recursive: true, withId: true }).limit(100).attributes('name images').exec();
     * ```
     */
    exec(): Promise<any>;
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
    getByName(options?: IGetCharacterOptions): Promise<IData | undefined>;
    private _getByName;
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
    getById(id: number, options?: IGetCharacterOptions): Promise<any>;
    private _getById;
    /**
     * Get all the available wikis of the FandomScraper class.
     * @returns The available wikis.
     */
    getAvailableWikis(): WikiaParameters[];
    private _getOne;
    private formatCharacterData;
    /**
     * Get all the characters of the current wiki, considering the options provided.
     * Works only for the classic characters page format.
     * @param {IGetCharactersOptionsDeprecated} [options] - The options of the getCharacters method.
     * @returns The characters of the wiki.
     */
    private _getAll;
    /**
     * Count the number of characters of the current wiki and return the number.
     * @returns The number of characters of the wiki.
     * @async
     */
    count(): Promise<number>;
    private parseCharacterPage;
    private setValue;
    /**
     * Convert the image from the given URL to a base64 string
     * Due to somes issues about CORS, this method is sometimes necessary to print the image in your application
     * @param {string} imageUrl The URL of the image to convert
     * @returns The base64 string of the image
     * @throws An error if the image cannot be fetched or converted
     */
    private convertImageToBase64;
    /**
     * Remove the elements from the characters list that contains one of the banned substring
     * @param {HTMLCollectionOf<Element>} elements The elements to filter
     * @param {string[]} banList The list of substring to ban
     * @returns The filtered elements
     */
    private filterBannedElement;
    /**
     *
     * Get the data from the infobox according to if the wiki is in the old version or not
     * @param page
     * @param key
     * @returns The data from the page according to the old version of the wiki
     *
     */
    private getDataAccordingToVersion;
    private extractPageId;
    private getElementAccordingToFormat;
    private getUrlAccordingToFormat;
    private isValidCharacterPage;
    private setPageVersion;
    private getWikiUrl;
    private getDataUrl;
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
    getQuotes(url: string): Promise<string[]>;
    /**
     * Extracts the quote text from a given DOM element.
     *
     * This function supports both individual elements and lists:
     * - For a <ul> element, the function recursively extracts quotes from each <li> child,
     *   accumulating them into an array.
     * - For non-list elements, it attempts to remove any <cite> or <sup> content from a cloned version
     *   of the element before retrieving its trimmed text content.
     *
     * @param element - The DOM element from which to extract the quote.
     * @returns The extracted quote as a string, or an array of quotes if the element is a list.
     *
     * @example
     * // Extracting from a paragraph element:
     * const quote = extractQuoteFromElement(paragraphElement);
     *
     * @example
     * // Extracting quotes from an unordered list:
     * const quotes = extractQuoteFromElement(listElement);
     */
    private extractQuoteFromElement;
}
/**
 * This class allows you to define your own schema for a fandom wiki scraper
 * @class
 */
declare class FandomPersonalScraper extends FandomScraper {
    constructor(schema: ISchema);
}

export { FandomPersonalScraper, FandomScraper, type TAvailableWikis, availableWikis };
