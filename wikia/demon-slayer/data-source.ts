const DemonSlayerFRDataSource: IDataSource = {
    kanji: 'kanji',
    romaji: 'rômaji',
    status: 'statut',
    species: 'race',
    gender: 'genre',
    images: {
        identifier: '.pi-image-thumbnail',
        get: function(page: Document) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'anime',
    manga: 'manga',
    age: 'âge',
    affiliation: 'affiliation',
    height: 'taille',
    weight: 'poids',
    birthday: 'anniversaire',
    occupations: 'occupation',
    relatives: 'relation',
    seiyu: 'japonais'
};

const DemonSlayerENDataSource: IDataSource = {
    kanji: 'kanji',
    romaji: 'rōmaji',
    status: 'status',
    species: 'race',
    gender: 'gender',
    images: {
        identifier: '.pi-image-thumbnail',
        get: function(page: Document) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'anime_debut',
    manga: 'manga_debut',
    age: 'age',
    affiliation: 'affiliation',
    occupations: 'occupation',
    relatives: 'relative(s)',
    birthday: 'birthday',
    height: 'height',
    weight: 'weight',
    seiyu: 'japanese_va',
    voiceActor: 'english_va',
};

export { DemonSlayerFRDataSource, DemonSlayerENDataSource };