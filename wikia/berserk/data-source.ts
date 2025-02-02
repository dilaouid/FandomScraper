const BerserkENDataSource: IDataSource = {
    gender: 'Gender',
    species: 'Kind',
    images: {
        identifier: '.mw-parser-output aside img',
        get: function(page: Document) {
            return page.querySelectorAll(this.identifier);
        }
    },
    episode: 'First appearance',
    status: 'Status',
    affiliation: 'Affiliations',
    occupations: 'Occupation(s)',
    relatives: 'Relatives',
    hairColor: 'Hair color',
    eyeColor: 'Eye color'
};

export { BerserkENDataSource };