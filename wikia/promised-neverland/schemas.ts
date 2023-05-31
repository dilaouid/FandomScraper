import { ISchema } from "../../interfaces/schemas";
import { PromisedNeverlandFRDataSource, PromisedNeverlandENDataSource } from "./data-source";

const PromisedNeverlandFR: ISchema = {
    url: 'https://the-promised-neverland.fandom.com/fr/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://the-promised-neverland.fandom.com/fr/wiki/Cat%C3%A9gorie:Personnages',
    dataSource: PromisedNeverlandFRDataSource
};

const PromisedNeverlandEN: ISchema = {
    url: 'https://yakusokunoneverland.fandom.com//wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://yakusokunoneverland.fandom.com/wiki/Category:Manga_characters',
    dataSource: PromisedNeverlandENDataSource
};

export { PromisedNeverlandFR, PromisedNeverlandEN };