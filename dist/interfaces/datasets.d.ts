interface IData {
    id?: number;
    name: string;
    url: string;
    data?: IDataset;
}
type TDataset = string | string[];
interface IDataset {
    name?: TDataset;
    kanji?: string;
    romaji?: string;
    status?: string;
    species?: TDataset;
    gender?: string;
    images?: string[];
    episode?: TDataset;
    manga?: string;
    age?: TDataset;
    birthday?: string;
    bloodType?: string;
    zodiac?: string;
    hairColor?: string;
    eyeColor?: string;
    height?: TDataset;
    weight?: TDataset;
    relatives?: TDataset;
    affiliation?: string;
    occupations?: TDataset;
    nationality?: string;
    seiyu?: TDataset;
    voiceActor?: TDataset;
}
interface IImage {
    identifier: string;
    get: Function;
}
interface IDataSource {
    name?: string;
    kanji?: string;
    romaji?: string;
    status?: string;
    species?: string;
    gender?: string;
    images?: IImage;
    episode?: string;
    manga?: string;
    age?: string;
    affiliation?: string;
    hairColor?: string;
    eyeColor?: string;
    occupations?: string;
    seiyu?: string;
    voiceActor?: string;
    relatives?: string;
    birthday?: string;
    zodiac?: string;
    height?: string;
    weight?: string;
    nationality?: string;
    bloodType?: string;
}
export { IDataset, IDataSource, IData, IImage };
