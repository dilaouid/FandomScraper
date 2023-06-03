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
    episode: 'Première apparition Anime',
    manga: 'Première apparition Manga',
    birthday: 'Naissance',
    height: 'Taille',
    weight: 'Poids',
    seiyu: 'Voix Japonaise',
    voiceActor: 'Voix Française',
    relatives: 'Famille'
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
    affiliation: 'Allegiance',
    manga: 'manga debut',
    height: 'Height',
    weight: 'Weight',
    occupations: 'Occupation',
    relatives: 'FamConnect',
    birthday: 'Date of birth',
};
export { DragonBallFRDataSource, DragonBallENDataSource };
//# sourceMappingURL=data-source.js.map