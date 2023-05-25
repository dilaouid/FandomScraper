import { IDataSource } from "../../interfaces";

const NarutoFRDataSource: IDataSource = {
    name: 'Nom',
    status: 'Statut',
    gender: 'Genre',
    images: 'pi-image-thumbnail',
    episode: 'Début anime',
    age: 'Âge',
    affiliation: 'Affiliation'
};

// DOM version of the english data-source is bad, so WIP to find a solution
const NarutoENDataSource: IDataSource = { };

export { NarutoFRDataSource, NarutoENDataSource };