import { ISchema } from "../../interfaces";
import { NarutoFRDataSource, NarutoENDataSource } from "./data-source";

const NarutoFR: ISchema = {
    name: 'naruto',
    url: 'https://naruto.fandom.com/fr/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://naruto.fandom.com/fr/wiki/Catégorie:Personnages',
    oldVersion: false,
    dataSource: NarutoFRDataSource
};


// DOM version of the english data-source is bad, so WIP to find a solution
const NarutoEN: ISchema = {
    name: 'naruto',
    url: '',
    pageFormat: 'classic',
    charactersUrl: '',
    oldVersion: true,
    dataSource: NarutoENDataSource
};

export { NarutoFR, NarutoEN };