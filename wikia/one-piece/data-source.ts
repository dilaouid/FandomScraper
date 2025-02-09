const OnePieceFRDataSource: IDataSource = {
    name: 'nomf',
    kanji: 'nomj',
    romaji: 'nomr',
    status: 'statut',
    age: 'âge',
    images: {
        identifier: '.wds-tab__content img',
        get: function (page: Document) {
            return page.querySelectorAll(this.identifier);
        },
    },
    quote: {
        identifier: 'table.noprint tbody tr:first-child td:nth-child(2)',
        get: function (page: Document): Element | null {
            return page.querySelector('table.noprint tbody tr:first-child td:nth-child(2)');
        }
    },
    episode: 'première',
    affiliation: 'affiliation',
    occupations: 'occupation',
    height: 'taille',
    bloodType: 'groupe sanguin',
    seiyu: 'voj',
    voiceActor: 'vof'
};

const OnePieceENDataSource: IDataSource = {
    name: 'ename',
    kanji: 'jname',
    romaji: 'rname',
    status: 'status',
    age: 'age',
    images: {
        identifier: '.wds-tab__content img',
        get: function (page: Document) {
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