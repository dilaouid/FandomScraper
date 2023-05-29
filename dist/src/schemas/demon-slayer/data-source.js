const DemonSlayerFRDataSource = {
    kanji: 'kanji',
    romaji: 'rômaji',
    status: 'statut',
    species: 'race',
    gender: 'genre',
    images: {
        identifier: '.pi-image-thumbnail',
        get: function (page) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'anime',
    age: 'âge',
    affiliation: 'affiliation'
};
const DemonSlayerENDataSource = {
    kanji: 'kanji',
    romaji: 'rōmaji',
    status: 'status',
    species: 'race',
    gender: 'gender',
    images: {
        identifier: '.pi-image-thumbnail',
        get: function (page) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'anime_debut',
    age: 'age',
    affiliation: 'affiliation'
};
export { DemonSlayerFRDataSource, DemonSlayerENDataSource };
//# sourceMappingURL=data-source.js.map