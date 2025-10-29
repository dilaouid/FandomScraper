import type { TAvailableWikis } from './dynamic.types';

export interface IMetaData {
    // the name of the wiki
    name: string;

    // the language of the wiki
    language: 'en' | 'fr';

    // the available attributes of the wiki
    attributes: string[];

    // the number of characters in the wiki
    count?: number;

    // the available languages of the wiki
    availableLanguages: string[];

    // The url of the wiki
    url: string;
}

export interface WikiaParameters {
    name: TAvailableWikis;
    lang: 'en' | 'fr';
}

