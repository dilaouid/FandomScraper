import { IDataSource } from "../../interfaces";

const DemonSlayerFRDataSource: IDataSource = {
    kanji: 'kanji',
    romaji: 'rômaji',
    status: 'statut',
    species: 'race',
    gender: 'genre',
    images: 'pi-image-thumbnail',
    episode: 'anime',
    age: 'âge',
    affiliation: 'affiliation'
};

const DemonSlayerENDataSource: IDataSource = {
    kanji: 'kanji',
    romaji: 'rōmaji',
    status: 'status',
    species: 'race',
    gender: 'gender',
    images: 'pi-image-thumbnail',
    episode: 'anime_debut',
    age: 'age',
    affiliation: 'affiliation'
};

export { DemonSlayerFRDataSource, DemonSlayerENDataSource };