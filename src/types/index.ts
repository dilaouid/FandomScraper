export interface ScraperOptions {
    withId: boolean;
    recursive: boolean;
    base64?: boolean;
    fields?: string[];
    arrayFields?: string[];
    limit?: number;
    offset?: number;
}


export interface IMetadata {
    name: string
    language: 'en' | 'fr'
    attributes: string[]
    count?: number
    availableLanguages: string[]
}