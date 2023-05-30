import { IDataSource } from "../../interfaces/datasets";

const JojoFRDataSource: IDataSource = {
    kanji: 'Kanji',
    romaji: 'Romaji',
    species: 'Espèce',
    gender: 'Genre',
    images: {
        identifier: '.pi-image-thumbnail',
        get: function(page: Document) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'Début anime',
    age: 'Âge',
    affiliation: 'Profession'
};

const JojoENDataSource: IDataSource = {
    kanji: 'ja_kanji',
    romaji: 'ja_romaji',
    status: 'status',
    gender: 'gender',
    images: {
        identifier: '.wds-tab__content img',
        get: function(page: Document) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'anime_debut',
    age: 'age',
    affiliation: 'affiliation'
};

export { JojoFRDataSource, JojoENDataSource };