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
    affiliation: 'affiliation',
    occupations: 'occupation',
    height: 'taille',
    bloodType: 'groupe sanguin',
    seiyu: 'voj',
    voiceActor: 'vof'
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
    affiliation: 'affiliation',
    occupations: 'occupation',
    bloodType: 'blood type',
    height: 'height',
    seiyu: 'jva',
    voiceActor: 'Odex eva'
};
export { OnePieceFRDataSource, OnePieceENDataSource };
//# sourceMappingURL=data-source.js.map