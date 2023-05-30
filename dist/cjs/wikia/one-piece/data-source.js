"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnePieceENDataSource = exports.OnePieceFRDataSource = void 0;
const OnePieceFRDataSource = {
    name: 'nomf',
    kanji: 'nomj',
    romaji: 'nomr',
    status: 'statut',
    age: 'âge',
    images: {
        identifier: '.wds-tab__content img',
        get: function (page) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'première',
    affiliation: 'affiliation'
};
exports.OnePieceFRDataSource = OnePieceFRDataSource;
const OnePieceENDataSource = {
    name: 'ename',
    kanji: 'jname',
    romaji: 'rname',
    status: 'status',
    age: 'age',
    images: {
        identifier: '.wds-tab__content img',
        get: function (page) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'first',
    affiliation: 'affiliation'
};
exports.OnePieceENDataSource = OnePieceENDataSource;
//# sourceMappingURL=data-source.js.map