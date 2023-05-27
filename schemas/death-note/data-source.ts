import { IDataSource } from "@interfaces/datasets"

const DeathNoteFRDataSource: IDataSource = {
    gender: 'Sexe',
    images: {
        identifier: '.mw-parser-output table img',
        get: function(page: Document) {
            const elements = page.querySelectorAll(this.identifier);
            const filteredElements = Array.from(elements).filter((element) => {
                return element.getAttribute('alt') !== 'Tete' && element.getAttribute('alt') !== 'Pomme';
            });
            return filteredElements;
        },
    },
    episode: 'anime',
    age: 'âge',
    affiliation: 'affiliation'
};

const DeathNoteENDataSource: IDataSource = {
    kanji: 'name',
    species: 'species',
    gender: 'gender',
    images: {
        identifier: '.pi-image-thumbnail',
        get: function(page: Document) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'anime',
    age: 'age',
    affiliation: 'organization'
};

export { DeathNoteFRDataSource, DeathNoteENDataSource };