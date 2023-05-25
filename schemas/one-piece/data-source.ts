import { IDataSource } from "../../interfaces";

const OnePieceFRDataSource: IDataSource = {
    name: 'nomf',
    kanji: 'nomj',
    romaji: 'nomr',
    status: 'statut',
    age: 'âge',
    images: 'image',
    episode: 'première',
    affiliation: 'affiliation'
};

const OnePieceENDataSource: IDataSource = {
    name: 'ename',
    kanji: 'jname',
    romaji: 'rname',
    status: 'status',
    age: 'age',
    images: 'image',
    episode: 'first',
    affiliation: 'affiliation'
};

export { OnePieceFRDataSource, OnePieceENDataSource };