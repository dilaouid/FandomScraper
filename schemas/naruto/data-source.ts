import { IDataSource } from "../../interfaces/datasets";

const NarutoFRDataSource: IDataSource = {
    name: 'Nom',
    status: 'Statut',
    gender: 'Genre',
    images: {
        identifier: '.pi-image-thumbnail',
        get: function(page: Document) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'Début anime',
    age: 'Âge',
    affiliation: 'Affiliation'
};

// DOM version of the english data-source is bad, so WIP to find a solution
const NarutoENDataSource: IDataSource = { };

export { NarutoFRDataSource, NarutoENDataSource };