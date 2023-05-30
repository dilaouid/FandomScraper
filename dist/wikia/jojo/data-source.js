const JojoFRDataSource = {
    kanji: 'Kanji',
    romaji: 'Romaji',
    species: 'Espèce',
    gender: 'Genre',
    images: {
        identifier: '.pi-image-thumbnail',
        get: function (page) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'Début anime',
    age: 'Âge',
    affiliation: 'Profession'
};
const JojoENDataSource = {
    kanji: 'ja_kanji',
    romaji: 'ja_romaji',
    status: 'status',
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
export { JojoFRDataSource, JojoENDataSource };
//# sourceMappingURL=data-source.js.map