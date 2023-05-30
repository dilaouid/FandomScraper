const OnePieceFRDataSource = {
    name: 'nomf',
    kanji: 'nomj',
    romaji: 'nomr',
    status: 'statut',
    age: 'âge',
    images: {
        identifier: '.wds-tab__content img',
        get: function (page) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'première',
    affiliation: 'affiliation'
};
const OnePieceENDataSource = {
    name: 'ename',
    kanji: 'jname',
    romaji: 'rname',
    status: 'status',
    age: 'age',
    images: {
        identifier: '.wds-tab__content img',
        get: function (page) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'first',
    affiliation: 'affiliation'
};
export { OnePieceFRDataSource, OnePieceENDataSource };
//# sourceMappingURL=data-source.js.map