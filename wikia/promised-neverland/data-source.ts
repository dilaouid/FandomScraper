import { IDataSource } from "../../interfaces/datasets";

const PromisedNeverlandFRDataSource: IDataSource = {
    kanji: 'kanji',
    romaji: 'rōmaji',
    gender: 'genre',
    species: 'espèce',
    images: {
        identifier: '.mw-parser-output table img',
        get: function(page: Document) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'première_apparition',
    status: 'statut',
    age: 'âge',
    birthday: 'anniversaire',
    eyeColor: 'yeux',
    hairColor: 'cheveux',
    height: 'taille',
    affiliation: 'Affiliations',
    relatives: 'famille',
    seiyu: 'doubleur'
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
    manga: 'Manga',
    episode: 'Episode',
    status: 'Status',
    bloodType: 'Blood Type',
    age: 'Age',
    birthday: 'Birthday',
    eyeColor: 'Eye Color',
    hairColor: 'Hair Color',
    height: 'Height',
    affiliation: 'Previous Affiliation',
    voiceActor: 'English VA',
    seiyu: 'Japanese VA',
};

export { PromisedNeverlandFRDataSource, PromisedNeverlandENDataSource };