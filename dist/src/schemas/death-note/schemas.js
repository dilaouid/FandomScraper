"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeathNoteEN = exports.DeathNoteFR = void 0;
const data_source_1 = require("./data-source");
const DeathNoteFR = {
    url: 'https://deathnote.fandom.com/fr/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://deathnote.fandom.com/fr/wiki/Cat%C3%A9gorie:Personnages',
    oldVersion: true,
    dataSource: data_source_1.DeathNoteFRDataSource
};
exports.DeathNoteFR = DeathNoteFR;
const DeathNoteEN = {
    url: 'https://deathnote.fandom.com/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://deathnote.fandom.com/wiki/Category:Manga_characters',
    oldVersion: false,
    dataSource: data_source_1.DeathNoteENDataSource
};
exports.DeathNoteEN = DeathNoteEN;
//# sourceMappingURL=schemas.js.map