import { DemonSlayerFRDataSource, DemonSlayerENDataSource } from "./data-source";
const DemonSlayerFR = {
    url: 'https://kimetsu-no-yaiba.fandom.com/fr/wiki/Catégorie:Personnages',
    pageFormat: 'classic',
    dataSource: DemonSlayerFRDataSource
};
const DemonSlayerEN = {
    url: 'https://kimetsu-no-yaiba.fandom.com/wiki/Characters#Manga',
    pageFormat: 'table-2',
    dataSource: DemonSlayerENDataSource
};
export { DemonSlayerFR, DemonSlayerEN };
//# sourceMappingURL=schemas.js.map