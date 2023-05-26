import { ISchema } from "../../interfaces";
import { DemonSlayerFRDataSource, DemonSlayerENDataSource } from "./data-source";

const DemonSlayerFR: ISchema = {
    name: 'demon-slayer',
    url: 'https://kimetsu-no-yaiba.fandom.com/fr/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://kimetsu-no-yaiba.fandom.com/fr/wiki/Catégorie:Personnages',
    oldVersion: false,
    dataSource: DemonSlayerFRDataSource
};

const DemonSlayerEN: ISchema = {
    name: 'demon-slayer',
    url: 'https://kimetsu-no-yaiba.fandom.com/wiki/',
    pageFormat: 'table-2',
    charactersUrl: 'https://kimetsu-no-yaiba.fandom.com/wiki/Characters#Manga',
    oldVersion: false,
    dataSource: DemonSlayerENDataSource
};

export { DemonSlayerFR, DemonSlayerEN };