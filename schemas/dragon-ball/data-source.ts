import { IDataSource } from "../../interfaces";

const DragonBallFRDataSource: IDataSource = {
    kanji: 'Nom Original',
    status: 'Statut',
    species: 'Race',
    images: {
        identifier: '.pi-image-thumbnail',
        get: function(page: Document) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'Première apparition Anime'
};

const DragonBallENDataSource: IDataSource = {
    kanji: 'JapName',
    romaji: 'RomName',
    gender: 'Gender',
    species: 'Race',
    images: {
        identifier: '.pi-image-thumbnail',
        get: function(page: Document) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'anime debut',
    affiliation: 'Allegiance'
};

export { DragonBallFRDataSource, DragonBallENDataSource };