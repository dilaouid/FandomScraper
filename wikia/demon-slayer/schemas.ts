import { ISchema } from "../../interfaces/schemas";
import { DemonSlayerFRDataSource, DemonSlayerENDataSource } from "./data-source";

const DemonSlayerFR: ISchema = {
    url: 'https://kimetsu-no-yaiba.fandom.com/fr/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://kimetsu-no-yaiba.fandom.com/fr/wiki/Catégorie:Personnages',
    dataSource: DemonSlayerFRDataSource
};

const DemonSlayerEN: ISchema = {
    url: 'https://kimetsu-no-yaiba.fandom.com/wiki/',
    pageFormat: 'table-2',
    charactersUrl: 'https://kimetsu-no-yaiba.fandom.com/wiki/Characters#Manga',
    dataSource: DemonSlayerENDataSource
};

export { DemonSlayerFR, DemonSlayerEN };