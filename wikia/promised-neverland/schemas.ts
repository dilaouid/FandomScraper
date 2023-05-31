import { ISchema } from "../../interfaces/schemas";
import { PromisedNeverlandFRDataSource, PromisedNeverlandENDataSource } from "./data-source";

const PromisedNeverlandFR: ISchema = {
    url: 'https://the-promised-neverland.fandom.com/fr/wiki/Catégorie:Personnages',
    pageFormat: 'classic',
    dataSource: PromisedNeverlandFRDataSource
};

const PromisedNeverlandEN: ISchema = {
    url: 'https://yakusokunoneverland.fandom.com/wiki/Category:Manga_characters',
    pageFormat: 'classic',
    dataSource: PromisedNeverlandENDataSource
};

export { PromisedNeverlandFR, PromisedNeverlandEN };