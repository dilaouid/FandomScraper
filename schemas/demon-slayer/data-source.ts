import { IDataSource } from "../../interfaces";

const DemonSlayerFRDataSource: IDataSource = {
    name: 'titre',
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
    name: 'title',
    kanji: 'kanji',
    romaji: 'rōmaji',
    status: 'status',
    species: 'race',
    gender: 'gender',
    images: 'image',
    episode: 'anime_debut',
    age: 'age',
    affiliation: 'affiliation'
};

export { DemonSlayerFRDataSource, DemonSlayerENDataSource };