import { IDataSource } from "../../interfaces/datasets";

const OnePieceFRDataSource: IDataSource = {
    name: 'nomf',
    kanji: 'nomj',
    romaji: 'nomr',
    status: 'statut',
    age: 'âge',
    images: {
        identifier: '.wds-tab__content img',
        get: function(page: Document) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'première',
    affiliation: 'affiliation'
};

const OnePieceENDataSource: IDataSource = {
    name: 'ename',
    kanji: 'jname',
    romaji: 'rname',
    status: 'status',
    age: 'age',
    images: {
        identifier: '.wds-tab__content img',
        get: function(page: Document) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'first',
    affiliation: 'affiliation'
};

export { OnePieceFRDataSource, OnePieceENDataSource };