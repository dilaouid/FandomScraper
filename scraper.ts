import jsdom from "jsdom";

import { IData, ISchema } from './interfaces';
import { Schemas } from './schemas';
import { TAvailableWikis } from './types';

import { allCharactersPage } from './utils/';

interface IConstructor {
    name: TAvailableWikis;
    language?: 'en' | 'fr' | null;
};

interface IGetCharactersOptions {
    limit: number;
    offset: number;
    recursive: boolean;
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

    public async getAll(options: IGetCharactersOptions = { offset: 0, limit: 100000, recursive: false }): Promise<any[]> {
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
                if (offset >= options.offset) {
                    const url = element.getAttribute('href');
                    if (!url) throw new Error('No URL found');
            
                    const name = element.textContent;
                    if (!name) throw new Error('No name found');
            
                    data.push({ url: url, name: name });
                    count++;
                    
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

    private filterBannedElement(elements: HTMLCollectionOf<Element>, banList: string[]): Element[] {
        const elementsArray = Array.from(elements);
        return elementsArray.filter((element) => {
            const innerText = element.textContent?.toLowerCase() ?? '';
            return !banList.some((substring) => innerText.includes(substring.toLowerCase()));
        });
    }

}