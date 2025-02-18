const RickAndMortyFRDataSource: IDataSource = {
    name: 'nom',
    species: 'espèce',
    gender: 'genre',
    status: "statut",
    images: {
        identifier: '.pi-image .pi-image-thumbnail',
        get: function (page: Document) {
            // get the image inside the second tr of the table
            return page.querySelectorAll(this.identifier)
        },
    },
    episode: 'première_apparition',
    age: 'âge',
    occupations: 'occupation',
    voiceActor: 'voix',
    relatives: 'famille',
};

const RickAndMortyENDataSource: IDataSource = {
    species: 'species',
    gender: 'gender',
    age: 'age',
    status: 'status',
    occupations: 'job',
    affiliation: 'affiliation',
    relatives: 'family',

    images: {
        identifier: '.pi-image-thumbnail',
        get: function (page: Document) {
            // get the image inside the second tr of the table
            return page.querySelectorAll(this.identifier)
        },
    },
    episode: 'firt',
    voiceActor: 'voice actor'
};

export { RickAndMortyENDataSource, RickAndMortyFRDataSource };