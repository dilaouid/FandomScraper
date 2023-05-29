"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NarutoENDataSource = exports.NarutoFRDataSource = void 0;
const NarutoFRDataSource = {
    name: 'Nom',
    status: 'Statut',
    gender: 'Genre',
    images: {
        identifier: '.pi-image-thumbnail',
        get: function (page) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'Début anime',
    age: 'Âge',
    affiliation: 'Affiliation'
};
exports.NarutoFRDataSource = NarutoFRDataSource;
// DOM version of the english data-source is bad, so WIP to find a solution
const NarutoENDataSource = {};
exports.NarutoENDataSource = NarutoENDataSource;
//# sourceMappingURL=data-source.js.map