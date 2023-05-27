import { ISchema } from "@interfaces/schemas"
import { NarutoFRDataSource, NarutoENDataSource } from "./data-source";

const NarutoFR: ISchema = {
    url: 'https://naruto.fandom.com/fr/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://naruto.fandom.com/fr/wiki/Catégorie:Personnages',
    oldVersion: false,
    dataSource: NarutoFRDataSource
};


// DOM version of the english data-source is bad, so WIP to find a solution
const NarutoEN: ISchema = {
    url: '',
    pageFormat: 'classic',
    charactersUrl: '',
    oldVersion: true,
    dataSource: NarutoENDataSource
};

export { NarutoFR, NarutoEN };