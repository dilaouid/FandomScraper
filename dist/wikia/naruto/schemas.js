import { NarutoFRDataSource, NarutoENDataSource } from "./data-source.js";
const NarutoFR = {
    url: 'https://naruto.fandom.com/fr/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://naruto.fandom.com/fr/wiki/Catégorie:Personnages',
    oldVersion: false,
    dataSource: NarutoFRDataSource
};
// DOM version of the english data-source is bad, so WIP to find a solution
const NarutoEN = {
    url: '',
    pageFormat: 'classic',
    charactersUrl: '',
    oldVersion: true,
    dataSource: NarutoENDataSource
};
export { NarutoFR, NarutoEN };
//# sourceMappingURL=schemas.js.map