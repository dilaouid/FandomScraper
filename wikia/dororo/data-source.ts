const DororoENDataSource: IDataSource = {
    kanji: 'japanese name',
    age: 'age',
    gender: 'gender',
    species: "species",
    status: 'status',
    height: 'height',
    weight: 'weight',
    eyeColor: 'eyes',
    hairColor: 'hair',
    images: {
        identifier: '.pi-image img',
        get: function(page: Document) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'debut',
    relatives: 'relatives',
    voiceActor: 'voice eng',
    seiyu: 'voice'
};

export { DororoENDataSource };