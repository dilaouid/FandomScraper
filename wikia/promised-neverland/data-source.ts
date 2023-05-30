import { IDataSource } from "../../interfaces/datasets";

const PromisedNeverlandFRDataSource: IDataSource = {
    kanji: 'Kanji',
    romaji: 'Rōmaji',
    gender: 'Genre',
    species: 'Espèce',
    images: {
        identifier: '.mw-parser-output table img',
        get: function(page: Document) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'Première apparition',
    status: 'Statut',
    age: 'Âge',
    affiliation: 'Affiliations'
};

const PromisedNeverlandENDataSource: IDataSource = {
    kanji: 'Kanji',
    romaji: 'Rōmaji',
    gender: 'Gender',
    species: 'Species',
    images: {
        identifier: '.pi-image-thumbnail',
        get: function(page: Document) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'Manga',
    status: 'Status',
    age: 'Age',
    affiliation: 'Prev. Affiliation'
};

export { PromisedNeverlandFRDataSource, PromisedNeverlandENDataSource };