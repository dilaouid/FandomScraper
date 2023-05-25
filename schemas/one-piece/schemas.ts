import { ISchema } from "../../interfaces";
import { OnePieceFRDataSource, OnePieceENDataSource } from "./data-source";

const OnePieceFR: ISchema = {
    name: 'one-piece',
    url: 'https://onepiece.fandom.com/fr/wiki/',
    pageFormat: 'table-1',
    charactersUrl: 'https://onepiece.fandom.com/fr/wiki/Liste_des_Personnages_Canon',
    oldVersion: false,
    dataSource: OnePieceFRDataSource
};

const OnePieceEN: ISchema = {
    name: 'one-piece',
    url: 'https://onepiece.fandom.com/wiki/',
    pageFormat: 'table-1',
    charactersUrl: 'https://onepiece.fandom.com/wiki/List_of_Canon_Characters',
    oldVersion: false,
    dataSource: OnePieceENDataSource
};

export { OnePieceFR, OnePieceEN };