"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragonBallEN = exports.DragonBallFR = void 0;
const data_source_1 = require("./data-source");
const DragonBallFR = {
    url: 'https://dragonball.fandom.com/fr/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://dragonball.fandom.com/fr/wiki/Catégorie:Personnages',
    oldVersion: false,
    dataSource: data_source_1.DragonBallFRDataSource
};
exports.DragonBallFR = DragonBallFR;
const DragonBallEN = {
    url: 'https://dragonball.fandom.com/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://dragonball.fandom.com/wiki/Characters',
    oldVersion: false,
    dataSource: data_source_1.DragonBallENDataSource
};
exports.DragonBallEN = DragonBallEN;
//# sourceMappingURL=schemas.js.map