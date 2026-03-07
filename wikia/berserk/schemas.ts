import { BerserkENDataSource } from "./data-source";

// Berserk (FR) schema not available yet on Fandom

const BerserkEN: ISchema = {
    url: 'https://berserk.fandom.com/wiki/Category:Fantasia_Arc_Characters',
    pageFormat: 'classic',
    dataSource: BerserkENDataSource,
    characterList: {
        strategy: 'mediawiki',
        wikiName: 'berserk',
        lang: 'en',
        categoryName: 'Fantasia_Arc_Characters',
        baseUrl: 'https://berserk.fandom.com/wiki/'
    }
};

export { BerserkEN };