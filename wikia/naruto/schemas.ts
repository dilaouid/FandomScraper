import { ISchema } from "../../interfaces/schemas";
import { NarutoFRDataSource, NarutoENDataSource } from "./data-source";

const NarutoFR: ISchema = {
    url: 'https://naruto.fandom.com/fr/wiki/Catégorie:Personnages',
    pageFormat: 'classic',
    dataSource: NarutoFRDataSource
};


// DOM version of the english data-source is bad, so WIP to find a solution
const NarutoEN: ISchema = {
    url: 'https://naruto.fandom.com/wiki/Category:Characters',
    pageFormat: 'classic',
    dataSource: NarutoENDataSource
};

export { NarutoFR, NarutoEN };