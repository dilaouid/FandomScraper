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
        identifier: '.pi-item .pi-image-thumbnail',
        get: function (page: Document) {
            return page.querySelectorAll(this.identifier);
        }
    },
    quote: {
        identifier: '.cquote tr i',
        get: function (page: Document) {
            return page.querySelector('.cquote tr i');
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
        identifier: '.pi-item .pi-image-thumbnail',
        get: function (page: Document) {
            return page.querySelectorAll(this.identifier);
        },
        ignore: [
            "https://static.wikia.nocookie.net/shingekinokyojin/images/a/a7/Survey_Corps_Logo.png",
            "https://static.wikia.nocookie.net/shingekinokyojin/images/5/55/Garrison_Logo.png",
            "https://static.wikia.nocookie.net/shingekinokyojin/images/a/a9/104th_Trainees_Squad_Logo.png",
            "https://static.wikia.nocookie.net/shingekinokyojin/images/4/4c/Brigade_Logo.png"
        ]
    },
    manga: 'Debut chapter',
    seiyu: 'Voice actor',
    status: 'Status',
    affiliation: 'Affiliation',
};


export { ShingekiFRDataSource, ShingekiENDataSource };