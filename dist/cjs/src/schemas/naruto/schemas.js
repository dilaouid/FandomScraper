"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NarutoEN = exports.NarutoFR = void 0;
const data_source_1 = require("./data-source");
const NarutoFR = {
    url: 'https://naruto.fandom.com/fr/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://naruto.fandom.com/fr/wiki/Catégorie:Personnages',
    oldVersion: false,
    dataSource: data_source_1.NarutoFRDataSource
};
exports.NarutoFR = NarutoFR;
// DOM version of the english data-source is bad, so WIP to find a solution
const NarutoEN = {
    url: '',
    pageFormat: 'classic',
    charactersUrl: '',
    oldVersion: true,
    dataSource: data_source_1.NarutoENDataSource
};
exports.NarutoEN = NarutoEN;
//# sourceMappingURL=schemas.js.map