"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShikiENDataSource = void 0;
// French data source not available yet
const ShikiENDataSource = {
    kanji: 'Name Kanji',
    status: 'Status',
    species: 'Race',
    gender: 'Gender',
    images: {
        identifier: '.mw-parser-output table img',
        get: function (page) {
            // get the image inside the second tr of the table
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'Anime Debut',
    age: 'Age',
    affiliation: 'Occupation'
};
exports.ShikiENDataSource = ShikiENDataSource;
//# sourceMappingURL=data-source.js.map