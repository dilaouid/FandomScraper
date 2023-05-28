"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FumetsuENDataSource = void 0;
// French data source not available yet
const FumetsuENDataSource = {
    kanji: 'Kanji',
    status: 'Status',
    species: 'Race',
    gender: 'Sex',
    images: {
        identifier: '.mw-parser-output table img',
        get: function (page) {
            // get the image inside the second tr of the table
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'Anime',
    age: 'Age',
    affiliation: 'Affiliation'
};
exports.FumetsuENDataSource = FumetsuENDataSource;
//# sourceMappingURL=data-source.js.map