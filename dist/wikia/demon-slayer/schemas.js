import { DemonSlayerFRDataSource, DemonSlayerENDataSource } from "./data-source.js";
const DemonSlayerFR = {
    url: 'https://kimetsu-no-yaiba.fandom.com/fr/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://kimetsu-no-yaiba.fandom.com/fr/wiki/Catégorie:Personnages',
    dataSource: DemonSlayerFRDataSource
};
const DemonSlayerEN = {
    url: 'https://kimetsu-no-yaiba.fandom.com/wiki/',
    pageFormat: 'table-2',
    charactersUrl: 'https://kimetsu-no-yaiba.fandom.com/wiki/Characters#Manga',
    dataSource: DemonSlayerENDataSource
};
export { DemonSlayerFR, DemonSlayerEN };
//# sourceMappingURL=schemas.js.map