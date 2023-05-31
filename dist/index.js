import { JSDOM } from 'jsdom';
import { Schemas } from './wikia/index.js';
import { allCharactersPage } from './utils/allCharactersPage.js';
import { formatForUrl, formatName, removeBrackets } from './func/parsing.js';
import { availableWikis } from './types/index.cjs';
;
;
;
/**
 * FandomScraper is a class that allows you to scrape a Fandom wiki, and get all the characters of a fiction.
 * The list of available wikis can be found in the TAvailableWikis type.
 */
export class FandomScraper {
    /**
     * Constructs a FandomScraper instance.
     * @param {IConstructor} constructor - The constructor options.
     * @throws Error if an invalid wiki name is provided.
     * @example
     * ```ts
     * const scraper = new FandomScraper({ name: 'dragon-ball', language: 'fr' });
     * ```
     */
    constructor(constructor) {
        if (!Object.keys(Schemas).includes(constructor.name))
            throw new Error(`Invalid wiki name provided: ${constructor.name}`);
        this._schema = Schemas[constructor.name][constructor.language || 'en'];
    }
    /**
     * Get the schema of the current wiki.
     * @returns The schema of the wiki.
     */
    getSchema() {
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
     * await scraper.getCharactersPage('https://kimetsu-no-yaiba.fandom.com/fr/wiki/Catégorie:Personnages');
     * ```
     */
    async getCharactersPage(url) {
        this._CharactersPage = await this.fetchPage(url);
    }
    async fetchPage(url) {
        const text = await fetch(url).then(async (res) => {
            const text = await res.text();
            return text;
        }).catch(err => {
            throw new Error(`Error while fetching ${url}: ${err}`);
        });
        return new JSDOM(text, { url: url, contentType: "text/html", referrer: url }).window.document;
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
     */
    async getAll(options = { offset: 0, limit: 100000, recursive: false, base64: true, withId: true, ignore: [] }) {
        try {
            if (options.limit < 1)
                throw new Error('Limit must be greater than 0');
            if (options.offset < 0)
                throw new Error('Offset must be greater than 0');
            await this.getCharactersPage(this._schema.url);
            return await this._getAll(options);
        }
        catch (err) {
            console.error(err);
        }
        return [];
    }
    ;
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
    async getByName(options = { name: '', base64: false, withId: true }) {
        try {
            if (options.name?.trim()?.length == 0)
                throw new Error('Name must be provided');
            const name = formatName(options.name);
            const url = this.getWikiUrl() + formatForUrl(name);
            const data = {
                name: name,
                url: this.getWikiUrl() + formatForUrl(name),
            };
            return this.fetchPage(url).then(async (page) => {
                const characterData = await this.formatCharacterData(page, options, data);
                if (!this.isValidCharacterPage(options.withId || false, characterData.data || null)) {
                    const switchName = formatName(name.split(' ').reverse().join(' '));
                    const url = this.getWikiUrl() + formatForUrl(switchName);
                    return this.fetchPage(url).then(async (page) => {
                        const retryData = await this.formatCharacterData(page, options, data);
                        if (!this.isValidCharacterPage(options.withId || false, retryData.data || null)) {
                            throw new Error(`This character does not exists: ${name}`);
                        }
                        data.url = url;
                        return retryData;
                    }).catch(err => {
                        throw new Error(`Error while fetching ${url}: ${err}`);
                    });
                }
                else {
                    return characterData;
                }
            });
        }
        catch (err) {
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
     */
    async getById(id, options = { name: '', base64: false, withId: true }) {
        try {
            if (id < 1)
                throw new Error('Id must be greater than 0');
            const url = this.getWikiUrl() + `?curid=${id}`;
            const data = {
                url: url,
            };
            return this.fetchPage(url).then(async (page) => {
                const name = page.querySelector('.mw-page-title-main')?.textContent || '';
                data.name = name;
                const characterData = await this.formatCharacterData(page, options, data);
                if (!this.isValidCharacterPage(options.withId || false, characterData.data || null)) {
                    throw new Error(`This character with this id does not exists: ${id}`);
                }
                return characterData;
            });
        }
        catch (err) {
            console.error(err);
        }
    }
    /**
     * Get all the available wikis of the FandomScraper class.
     * @returns The available wikis.
     */
    getAvailableWikis() {
        return availableWikis;
    }
    ;
    async _getOne(page, options) {
        const characterData = await this.parseCharacterPage(page, options.base64);
        if (options.withId) {
            const allScripts = page.getElementsByTagName('script');
            const script = Array.from(allScripts).find(script => script.textContent?.includes('pageId'));
            const id = this.extractPageId(script?.textContent || '');
            characterData.id = id;
        }
        return characterData;
    }
    ;
    async formatCharacterData(page, options, data) {
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
    async _getAll(options) {
        const data = [];
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
                    if (!name)
                        throw new Error('No name found');
                    if (options.recursive || options.withId) {
                        const characterPage = await this.fetchPage(new URL(url, this.getWikiUrl()).href);
                        if (options.recursive) {
                            characterData = await this.parseCharacterPage(characterPage, options.base64);
                        }
                        if (options.withId) {
                            const allScripts = characterPage.getElementsByTagName('script');
                            const script = Array.from(allScripts).find(script => script.textContent?.includes('pageId'));
                            const id = this.extractPageId(script?.textContent || '');
                            data.push({ id: id, url: url, name: name, data: characterData });
                        }
                        else {
                            data.push({ url: url, name: name, data: characterData });
                        }
                    }
                    else {
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
            }
            else {
                const nextUrl = nextElement.getAttribute('href');
                if (!nextUrl) {
                    hasNext = false;
                }
                else {
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
    async count() {
        var count = 0;
        try {
            let hasNext = true;
            await this.getCharactersPage(this._schema.url);
            while (hasNext) {
                count += this.getElementAccordingToFormat().length;
                const nextElement = this._CharactersPage.getElementsByClassName(allCharactersPage[this._schema.pageFormat].next.value)[0];
                if (!nextElement) {
                    hasNext = false;
                }
                else {
                    const nextUrl = nextElement.getAttribute('href');
                    if (!nextUrl) {
                        hasNext = false;
                    }
                    else {
                        await this.getCharactersPage(nextUrl);
                    }
                }
            }
        }
        catch (err) {
            console.error(err);
        }
        return count;
    }
    async parseCharacterPage(page, getBase64) {
        const format = this._schema.dataSource;
        const data = {};
        // for each key in format, get the value from the page according to the attribute data-source=key and get the value
        for (const key in format) {
            if (Object.prototype.hasOwnProperty.call(format, key)) {
                const sourceKey = format[key];
                if (!sourceKey) {
                    continue;
                }
                if (key === "images") {
                    const elements = format.images?.get(page);
                    if (!elements) {
                        continue;
                    }
                    const images = [];
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
                        }
                        else {
                            images.push(src);
                        }
                    }
                    data[key] = images;
                }
                else {
                    const element = this.getDataAccordingToVersion(page, sourceKey);
                    if (!element) {
                        continue;
                    }
                    // get the value from the value element
                    const value = element.textContent;
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
    async convertImageToBase64(imageUrl) {
        try {
            const response = await fetch(imageUrl);
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const base64Image = buffer.toString('base64');
            return base64Image;
        }
        catch (error) {
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
    filterBannedElement(elements, ignore) {
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
    getDataAccordingToVersion(page, key) {
        if (this.isOldVersion(page)) {
            const tdElement = Array.from(page.querySelectorAll('.mw-parser-output td')).find((td) => {
                return td?.textContent?.includes(String(key));
            });
            return tdElement?.nextElementSibling || null;
        }
        else {
            return page.querySelector(`[data-source="${key}"] .pi-data-value`);
        }
    }
    extractPageId(scriptContent) {
        const regex = /"pageId":(\d+)/;
        const match = scriptContent.match(regex);
        if (match && match.length > 1)
            return parseInt(match[1], 10);
        return 0;
    }
    getElementAccordingToFormat(ignore) {
        // merge ignore and allCharactersPage.classic.ignore arrays
        const ignoreList = ignore ? [...ignore, ...allCharactersPage.classic.ignore] : allCharactersPage.classic.ignore;
        if (this._schema.pageFormat === 'classic') {
            const value = allCharactersPage.classic.listCharactersElement.value;
            return this.filterBannedElement(this._CharactersPage.getElementsByClassName(value), ignoreList);
        }
        else if (this._schema.pageFormat === 'table-1') {
            return this._CharactersPage.querySelectorAll('table.wikitable td:nth-child(2) a');
        }
        else if (this._schema.pageFormat === 'table-2') {
            return this._CharactersPage.querySelectorAll('small > b');
        }
        throw new Error('Invalid page format');
    }
    getUrlAccordingToFormat(element) {
        if (this._schema.pageFormat === 'classic') {
            const url = this.getDataUrl(element.getAttribute('href'));
            if (!url)
                throw new Error('No URL found');
            return url;
        }
        else if (this._schema.pageFormat === 'table-1') {
            const url = this.getDataUrl(element.getAttribute('href'));
            if (!url)
                throw new Error('No URL found');
            return url;
        }
        else if (this._schema.pageFormat === 'table-2') {
            const aElement = element.querySelector('a');
            if (!aElement)
                throw new Error('No <a> element found');
            const url = this.getDataUrl(aElement.getAttribute('href'));
            if (!url)
                throw new Error('No URL found');
            return url;
        }
        return '';
    }
    isValidCharacterPage(withId, data) {
        if (!data) {
            return false;
        }
        return data && (!(withId && Object.keys(data).length === 2) || !(!withId && Object.keys(data).length === 1));
    }
    isOldVersion(page) {
        return page.querySelector('.pi-data-value') === null;
    }
    getWikiUrl() {
        const parts = this._schema.url.split('/');
        const baseParts = parts.slice(0, 3);
        return baseParts.join('/');
    }
    ;
    getDataUrl(href) {
        return this.getWikiUrl() + href;
    }
    ;
}
//# sourceMappingURL=index.js.map