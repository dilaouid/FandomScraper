const ShingekiFRDataSource: IDataSource = {
    name: 'Nom',
    gender: 'Genre',
    age: 'Âge',
    kanji: 'Kanji',
    birthday: 'Anniversaire',
    height: 'Taille',
    weight: 'Poids',
    species: 'Espèces',
    images: {
        identifier: '.mw-parser-output aside img',
        get: function(page: Document) {
            return page.querySelectorAll(this.identifier);
        }
    },
    episode: 'Première Animé',
    manga: 'Première Manga',
    seiyu: 'Voix Animé',
    voiceActor: 'Voix Animé fr',
    status: 'Statut',
    affiliation: 'Affiliation',
    relatives: 'Affiliés',
};

const ShingekiENDataSource: IDataSource = {
    gender: 'Gender',
    kanji: 'Kanji',
    birthday: 'Birthday',
    height: 'Height',
    weight: 'Weight',
    relatives: 'Relatives',
    images: {
        identifier: '.mw-parser-output aside img',
        get: function(page: Document) {
            return page.querySelectorAll(this.identifier);
        }
    },
    manga: 'Debut chapter',
    seiyu: 'Voice actor',
    status: 'Status',
    affiliation: 'Affiliation',
};


export { ShingekiFRDataSource, ShingekiENDataSource };