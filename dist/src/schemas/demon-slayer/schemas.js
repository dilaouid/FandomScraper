"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemonSlayerEN = exports.DemonSlayerFR = void 0;
const data_source_1 = require("./data-source");
const DemonSlayerFR = {
    url: 'https://kimetsu-no-yaiba.fandom.com/fr/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://kimetsu-no-yaiba.fandom.com/fr/wiki/Catégorie:Personnages',
    oldVersion: false,
    dataSource: data_source_1.DemonSlayerFRDataSource
};
exports.DemonSlayerFR = DemonSlayerFR;
const DemonSlayerEN = {
    url: 'https://kimetsu-no-yaiba.fandom.com/wiki/',
    pageFormat: 'table-2',
    charactersUrl: 'https://kimetsu-no-yaiba.fandom.com/wiki/Characters#Manga',
    oldVersion: false,
    dataSource: data_source_1.DemonSlayerENDataSource
};
exports.DemonSlayerEN = DemonSlayerEN;
//# sourceMappingURL=schemas.js.map