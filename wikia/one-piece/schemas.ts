import { ISchema } from "../../interfaces/schemas";
import { OnePieceFRDataSource, OnePieceENDataSource } from "./data-source";

const OnePieceFR: ISchema = {
    url: 'https://onepiece.fandom.com/fr/wiki/Liste_des_Personnages_Canon',
    pageFormat: 'table-1',
    dataSource: OnePieceFRDataSource
};

const OnePieceEN: ISchema = {
    url: 'https://onepiece.fandom.com/wiki/List_of_Canon_Characters',
    pageFormat: 'table-3',
    dataSource: OnePieceENDataSource
};

export { OnePieceFR, OnePieceEN };