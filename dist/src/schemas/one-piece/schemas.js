"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnePieceEN = exports.OnePieceFR = void 0;
const data_source_1 = require("./data-source");
const OnePieceFR = {
    url: 'https://onepiece.fandom.com/fr/wiki/',
    pageFormat: 'table-1',
    charactersUrl: 'https://onepiece.fandom.com/fr/wiki/Liste_des_Personnages_Canon',
    oldVersion: false,
    dataSource: data_source_1.OnePieceFRDataSource
};
exports.OnePieceFR = OnePieceFR;
const OnePieceEN = {
    url: 'https://onepiece.fandom.com/wiki/',
    pageFormat: 'table-1',
    charactersUrl: 'https://onepiece.fandom.com/wiki/List_of_Canon_Characters',
    oldVersion: false,
    dataSource: data_source_1.OnePieceENDataSource
};
exports.OnePieceEN = OnePieceEN;
//# sourceMappingURL=schemas.js.map