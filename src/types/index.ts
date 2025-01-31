export interface ScraperOptions {
    base64?: boolean;
    withId?: boolean;
    recursive?: boolean;
    limit?: number;
    offset?: number;
    fields?: string[];
    arrayFields?: string[];
    ignore?: string[];
}


export interface IMetadata {
    name: string
    language: 'en' | 'fr'
    attributes: string[]
    count?: number
    availableLanguages: string[]
}

export interface PersonalScraperOptions extends ScraperOptions {
    url: string;
    pageFormat: 'classic' | 'table-1' | 'table-2' | 'table-3';
    dataSource: {
        name?: string;
        kanji?: string;
        romaji?: string;
        status?: string;
        species?: string;
        gender?: string;
        images?: {
            identifier: string;
            get: (page: Document) => NodeListOf<Element>;
        };
        episode?: string;
        manga?: string;
        age?: string;
        affiliation?: string;
        hairColor?: string;
        eyeColor?: string;
        occupations?: string;
        seiyu?: string;
        voiceActor?: string;
        relatives?: string;
        birthday?: string;
        zodiac?: string;
        height?: string;
        weight?: string;
        nationality?: string;
        bloodType?: string;
    };
}