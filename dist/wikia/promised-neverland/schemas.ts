import { PromisedNeverlandFRDataSource, PromisedNeverlandENDataSource } from "./data-source";

const PromisedNeverlandFR: ISchema = {
    url: 'https://the-promised-neverland.fandom.com/fr/wiki/Catégorie:Personnages',
    pageFormat: 'classic',
    category: 'Catégorie:Personnages',
    dataSource: PromisedNeverlandFRDataSource
};

const PromisedNeverlandEN: ISchema = {
    url: 'https://yakusokunoneverland.fandom.com/wiki/Category:Manga_characters',
    pageFormat: 'classic',
    category: 'Category:Manga_characters',
    dataSource: PromisedNeverlandENDataSource
};

export { PromisedNeverlandFR, PromisedNeverlandEN };