import { IDataSource } from "../../interfaces";

const DragonBallFRDataSource: IDataSource = {
    name: 'Nom',
    kanji: 'Nom Original',
    status: 'Statut',
    species: 'Race',
    images: 'Image',
    episode: 'Première apparition Anime'
};

const DragonBallENDataSource: IDataSource = {
    name: 'RefName',
    kanji: 'JapName',
    romaji: 'RomName',
    gender: 'Gender',
    species: 'Race',
    images: 'image',
    episode: 'anime debut',
    affiliation: 'Allegiance'
};

export { DragonBallFRDataSource, DragonBallENDataSource };