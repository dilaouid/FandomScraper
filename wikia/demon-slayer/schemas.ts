import { DemonSlayerFRDataSource, DemonSlayerENDataSource } from "./data-source";

const DemonSlayerFR: ISchema = {
    url: 'https://kimetsu-no-yaiba.fandom.com/fr/wiki/Catégorie:Personnages',
    pageFormat: 'classic',
    dataSource: DemonSlayerFRDataSource
};

const DemonSlayerEN: ISchema = {
    url: 'https://kimetsu-no-yaiba.fandom.com/wiki/Characters#Manga',
    pageFormat: 'table-2',
    dataSource: DemonSlayerENDataSource
};

export { DemonSlayerFR, DemonSlayerEN };