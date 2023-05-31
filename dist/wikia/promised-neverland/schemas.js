import { PromisedNeverlandFRDataSource, PromisedNeverlandENDataSource } from "./data-source.js";
const PromisedNeverlandFR = {
    url: 'https://the-promised-neverland.fandom.com/fr/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://the-promised-neverland.fandom.com/fr/wiki/Cat%C3%A9gorie:Personnages',
    dataSource: PromisedNeverlandFRDataSource
};
const PromisedNeverlandEN = {
    url: 'https://yakusokunoneverland.fandom.com//wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://yakusokunoneverland.fandom.com/wiki/Category:Manga_characters',
    dataSource: PromisedNeverlandENDataSource
};
export { PromisedNeverlandFR, PromisedNeverlandEN };
//# sourceMappingURL=schemas.js.map