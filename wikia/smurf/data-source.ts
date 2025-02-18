const SmurfFRDataSource: IDataSource = {
    name: 'nom',
    species: 'espèce',
    gender: 'sexe',
    images: {
        identifier: '.pi-image .pi-image-thumbnail',
        get: function (page: Document) {
            // get the image inside the second tr of the table
            return page.querySelectorAll(this.identifier)
        },
    },
    episode: 'premier épisode',
    age: 'âge',
    occupations: 'profession',
    voiceActor: 'acteur',
    relatives: 'amis',
};

const SmurfENDataSource: IDataSource = {
    species: 'race',
    gender: 'gender',
    images: {
        identifier: '.pi-image-thumbnail',
        get: function (page: Document) {
            // get the image inside the second tr of the table
            return page.querySelectorAll(this.identifier)
        },
    },
    episode: 'firt',
    voiceActor: 'voice actor',
    occupations: 'occupation'
};

export { SmurfENDataSource, SmurfFRDataSource };