import { IDataSource } from "../../interfaces";

const DragonBallFRDataSource: IDataSource = {
    kanji: 'Nom Original',
    status: 'Statut',
    species: 'Race',
    images: 'pi-image-thumbnail',
    episode: 'Première apparition Anime'
};

const DragonBallENDataSource: IDataSource = {
    kanji: 'JapName',
    romaji: 'RomName',
    gender: 'Gender',
    species: 'Race',
    images: 'pi-image-thumbnail',
    episode: 'anime debut',
    affiliation: 'Allegiance'
};

export { DragonBallFRDataSource, DragonBallENDataSource };