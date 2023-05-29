var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { JSDOM } from 'jsdom';
import { Schemas } from './schemas';
import { allCharactersPage } from './utils/allCharactersPage';
import { formatForUrl, formatName, removeBrackets } from './func/parsing';
import { availableWikis } from './types';
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
    getCharactersPage(url) {
        return __awaiter(this, void 0, void 0, function* () {
            this._CharactersPage = yield this.fetchPage(url);
        });
    }
    fetchPage(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = yield fetch(url).then((res) => __awaiter(this, void 0, void 0, function* () {
                const text = yield res.text();
                return text;
            })).catch(err => {
                throw new Error(`Error while fetching ${url}: ${err}`);
            });
            return new JSDOM(text, { url: url, contentType: "text/html", referrer: url }).window.document;
        });
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
    getAll(options = { offset: 0, limit: 100000, recursive: false, base64: true, withId: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (options.limit < 1)
                    throw new Error('Limit must be greater than 0');
                if (options.offset < 0)
                    throw new Error('Offset must be greater than 0');
                yield this.getCharactersPage(this._schema.charactersUrl);
                return yield this._getAll(options);
            }
            catch (err) {
                console.error(err);
            }
            return [];
        });
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
    getByName(options = { name: '', base64: false, withId: true }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (((_b = (_a = options.name) === null || _a === void 0 ? void 0 : _a.trim()) === null || _b === void 0 ? void 0 : _b.length) == 0)
                    throw new Error('Name must be provided');
                const name = formatName(options.name);
                const url = this._schema.url + formatForUrl(name);
                const data = {
                    name: name,
                    url: this._schema.url + formatForUrl(name),
                };
                return this.fetchPage(url).then((page) => __awaiter(this, void 0, void 0, function* () {
                    const characterData = yield this.formatCharacterData(page, options, data);
                    if (!this.isValidCharacterPage(options.withId || false, characterData.data || null)) {
                        const switchName = formatName(name.split(' ').reverse().join(' '));
                        const url = this._schema.url + formatForUrl(switchName);
                        return this.fetchPage(url).then((page) => __awaiter(this, void 0, void 0, function* () {
                            const retryData = yield this.formatCharacterData(page, options, data);
                            if (!this.isValidCharacterPage(options.withId || false, retryData.data || null)) {
                                throw new Error(`This character does not exists: ${name}`);
                            }
                            data.url = url;
                            return retryData;
                        })).catch(err => {
                            throw new Error(`Error while fetching ${url}: ${err}`);
                        });
                    }
                    else {
                        return characterData;
                    }
                }));
            }
            catch (err) {
                console.error(err);
            }
        });
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
    getById(id, options = { name: '', base64: false, withId: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (id < 1)
                    throw new Error('Id must be greater than 0');
                const url = this._schema.url + `?curid=${id}`;
                const data = {
                    url: url,
                };
                return this.fetchPage(url).then((page) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    const name = ((_a = page.querySelector('.mw-page-title-main')) === null || _a === void 0 ? void 0 : _a.textContent) || '';
                    data.name = name;
                    const characterData = yield this.formatCharacterData(page, options, data);
                    if (!this.isValidCharacterPage(options.withId || false, characterData.data || null)) {
                        throw new Error(`This character with this id does not exists: ${id}`);
                    }
                    return characterData;
                }));
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    /**
     * Get all the available wikis of the FandomScraper class.
     * @returns The available wikis.
     */
    getAvailableWikis() {
        return availableWikis;
    }
    ;
    _getOne(page, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const characterData = yield this.parseCharacterPage(page, options.base64);
            if (options.withId) {
                const allScripts = page.getElementsByTagName('script');
                const script = Array.from(allScripts).find(script => { var _a; return (_a = script.textContent) === null || _a === void 0 ? void 0 : _a.includes('pageId'); });
                const id = this.extractPageId((script === null || script === void 0 ? void 0 : script.textContent) || '');
                characterData.id = id;
            }
            return characterData;
        });
    }
    ;
    formatCharacterData(page, options, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const character = yield this._getOne(page, options);
            if (options.withId) {
                data.id = character.id;
                character.id = undefined;
            }
            data.data = character;
            return data;
        });
    }
    /**
     * Get all the characters of the current wiki, considering the options provided.
     * Works only for the classic characters page format.
     * @param {IGetCharactersOptions} [options] - The options of the getCharacters method.
     * @returns The characters of the wiki.
     */
    _getAll(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = [];
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
                        if (!name)
                            throw new Error('No name found');
                        if (options.recursive || options.withId) {
                            const characterPage = yield this.fetchPage(new URL(url, this._schema.url).href);
                            if (options.recursive) {
                                characterData = yield this.parseCharacterPage(characterPage, options.base64);
                            }
                            if (options.withId) {
                                const allScripts = characterPage.getElementsByTagName('script');
                                const script = Array.from(allScripts).find(script => { var _a; return (_a = script.textContent) === null || _a === void 0 ? void 0 : _a.includes('pageId'); });
                                const id = this.extractPageId((script === null || script === void 0 ? void 0 : script.textContent) || '');
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
                        yield this.getCharactersPage(nextUrl);
                    }
                }
            }
            return data;
        });
    }
    /**
     * Count the number of characters of the current wiki and return the number.
     * @returns The number of characters of the wiki.
     * @async
     */
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            var count = 0;
            try {
                let hasNext = true;
                yield this.getCharactersPage(this._schema.charactersUrl);
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
                            yield this.getCharactersPage(nextUrl);
                        }
                    }
                }
            }
            catch (err) {
                console.error(err);
            }
            return count;
        });
    }
    parseCharacterPage(page, getBase64) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
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
                        const elements = (_a = format.images) === null || _a === void 0 ? void 0 : _a.get(page);
                        if (!elements) {
                            continue;
                        }
                        const images = [];
                        for (const element of elements) {
                            let src = element.getAttribute('src');
                            // if src is a base64 image, continue
                            if (src === null || src === void 0 ? void 0 : src.startsWith('data:image')) {
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
                                const b64 = yield this.convertImageToBase64(src);
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
        });
    }
    /**
     * Convert the image from the given URL to a base64 string
     * Due to somes issues about CORS, this method is sometimes necessary to print the image in your application
     * @param {string} imageUrl The URL of the image to convert
     * @returns The base64 string of the image
     * @throws An error if the image cannot be fetched or converted
     */
    convertImageToBase64(imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(imageUrl);
                const arrayBuffer = yield response.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const base64Image = buffer.toString('base64');
                return base64Image;
            }
            catch (error) {
                console.error('Error fetching or converting image:', error);
                throw error;
            }
        });
    }
    /**
     * Remove the elements from the characters list that contains one of the banned substring
     * @param {HTMLCollectionOf<Element>} elements The elements to filter
     * @param {string[]} banList The list of substring to ban
     * @returns The filtered elements
     */
    filterBannedElement(elements, banList) {
        const elementsArray = Array.from(elements);
        return elementsArray.filter((element) => {
            var _a, _b;
            const innerText = (_b = (_a = element.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : '';
            return !banList.some((substring) => innerText.includes(substring.toLowerCase()));
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
        if (this._schema.oldVersion === true) {
            const tdElement = Array.from(page.querySelectorAll('.mw-parser-output td')).find((td) => {
                var _a;
                return (_a = td === null || td === void 0 ? void 0 : td.textContent) === null || _a === void 0 ? void 0 : _a.includes(String(key));
            });
            return (tdElement === null || tdElement === void 0 ? void 0 : tdElement.nextElementSibling) || null;
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
    getElementAccordingToFormat() {
        if (this._schema.pageFormat === 'classic') {
            const value = allCharactersPage.classic.listCharactersElement.value;
            return this.filterBannedElement(this._CharactersPage.getElementsByClassName(value), allCharactersPage.classic.banList);
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
            const url = element.getAttribute('href');
            if (!url)
                throw new Error('No URL found');
            return url;
        }
        else if (this._schema.pageFormat === 'table-1') {
            const url = element.getAttribute('href');
            if (!url)
                throw new Error('No URL found');
            return url;
        }
        else if (this._schema.pageFormat === 'table-2') {
            const aElement = element.querySelector('a');
            if (!aElement)
                throw new Error('No <a> element found');
            const url = aElement.getAttribute('href');
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
}
//# sourceMappingURL=index.js.map