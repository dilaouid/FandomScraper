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
export { DragonBallFRDataSource, DragonBallENDataSource };
//# sourceMappingURL=data-source.js.map