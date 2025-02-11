const HellsingENDataSource: IDataSource = {
    age: 'age',
    gender: 'gender',
    height: 'height',
    species: 'species',
    status: 'status',
    affiliation: 'affiliation',
    relatives: 'family',
    manga: 'firstmanga',
    episode: 'firstova',
    seiyu: 'japanactor',
    voiceActor: 'voiceactor',
    images: {
        identifier: '.pi-item .pi-image-thumbnail',
        get: function (page: Document) {
            return page.querySelectorAll(this.identifier);
        }
    }
};

export { HellsingENDataSource };