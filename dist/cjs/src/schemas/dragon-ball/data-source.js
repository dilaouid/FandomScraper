"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragonBallENDataSource = exports.DragonBallFRDataSource = void 0;
const DragonBallFRDataSource = {
    kanji: 'Nom Original',
    status: 'Statut',
    species: 'Race',
    images: {
        identifier: '.pi-image-thumbnail',
        get: function (page) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'Première apparition Anime'
};
exports.DragonBallFRDataSource = DragonBallFRDataSource;
const DragonBallENDataSource = {
    kanji: 'JapName',
    romaji: 'RomName',
    gender: 'Gender',
    species: 'Race',
    images: {
        identifier: '.pi-image-thumbnail',
        get: function (page) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'anime debut',
    affiliation: 'Allegiance'
};
exports.DragonBallENDataSource = DragonBallENDataSource;
//# sourceMappingURL=data-source.js.map