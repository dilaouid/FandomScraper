import { IDataSource } from "../../interfaces/datasets";

const DemonSlayerFRDataSource: IDataSource = {
    kanji: 'kanji',
    romaji: 'rômaji',
    status: 'statut',
    species: 'race',
    gender: 'genre',
    images: {
        identifier: '.pi-image-thumbnail',
        get: function(page: Document) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'anime',
    age: 'âge',
    affiliation: 'affiliation'
};

const DemonSlayerENDataSource: IDataSource = {
    kanji: 'kanji',
    romaji: 'rōmaji',
    status: 'status',
    species: 'race',
    gender: 'gender',
    images: {
        identifier: '.pi-image-thumbnail',
        get: function(page: Document) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'anime_debut',
    age: 'age',
    affiliation: 'affiliation'
};

export { DemonSlayerFRDataSource, DemonSlayerENDataSource };