import { IData } from "./interfaces/datasets";
import { ISchema } from './interfaces/schemas';
import { TAvailableWikis } from './types';
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
}
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
}
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
}
/**
 * FandomScraper is a class that allows you to scrape a Fandom wiki, and get all the characters of a fiction.
 * The list of available wikis can be found in the TAvailableWikis type.
 */
export declare class FandomScraper {
    protected _schema: ISchema;
    private _CharactersPage;
    /**
     * Constructs a FandomScraper instance.
     * @param {IConstructor} constructor - The constructor options.
     * @throws Error if an invalid wiki name is provided.
     * @example
     * ```ts
     * const scraper = new FandomScraper({ name: 'dragon-ball', language: 'fr' });
     * ```
     */
    constructor(constructor: IConstructor);
    /**
     * Get the schema of the current wiki.
     * @returns The schema of the wiki.
     */
    getSchema(): ISchema;
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
     */
    getAll(options?: IGetCharactersOptions): Promise<any[]>;
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
     */
    getByName(options?: IGetCharacterOptions): Promise<IData | undefined>;
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
     */
    getById(id: number, options?: IGetCharacterOptions): Promise<any>;
    /**
     * Get all the available wikis of the FandomScraper class.
     * @returns The available wikis.
     */
    getAvailableWikis(): string[];
    private _getOne;
    private formatCharacterData;
    /**
     * Get all the characters of the current wiki, considering the options provided.
     * Works only for the classic characters page format.
     * @param {IGetCharactersOptions} [options] - The options of the getCharacters method.
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
    private isOldVersion;
    private getWikiUrl;
    private getDataUrl;
}
/**
 * This class allows you to define your own schema for a fandom wiki scraper
 * @class
 */
export declare class FandomPersonalScraper extends FandomScraper {
    constructor(schema: ISchema);
}
export {};
