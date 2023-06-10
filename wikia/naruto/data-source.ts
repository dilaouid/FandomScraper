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
    manga: 'Début manga',
    age: 'Âge',
    affiliation: 'Affiliation',
    birthday: 'Naissance',
    height: 'Taille',
    weight: 'Poids',
    relatives: 'Famille',
    bloodType: 'Groupe Sanguin',
    seiyu: 'Seiyû',
    voiceActor: 'Doubleur Français'
};

// DOM version of the english data-source is bad, so WIP to find a solution
const NarutoENDataSource: IDataSource = {
    status: 'Status',
    gender: 'Sex',
    images: {
        identifier: '.mw-parser-output table img',
        get: function(page: Document) {
            const elements = page.querySelectorAll(this.identifier);
            // remove every image that contains .svg
            return Array.from(elements).filter((element) => {
                return element.getAttribute('src')?.includes('.svg') === false;
            });
        },
    },
    episode: 'Anime',
    manga: 'Manga',
    age: 'Age',
    affiliation: 'Affiliation',
    occupations: 'Occupation',
    birthday: 'Birthdate',
    height: 'Height',
    weight: 'Weight',
    relatives: 'Famille',
    bloodType: 'Blood type',
    seiyu: 'Japanese',
    voiceActor: 'English'
};

export { NarutoFRDataSource, NarutoENDataSource };