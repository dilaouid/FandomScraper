const BerserkENDataSource = {
    gender: 'Gender',
    species: 'Kind',
    images: {
        identifier: '.mw-parser-output table img',
        get: function (page) {
            return page.querySelectorAll(this.identifier);
        }
    },
    episode: 'First appearance',
    status: 'Status',
    affiliation: 'Affiliations'
};
export { BerserkENDataSource };
//# sourceMappingURL=data-source.js.map