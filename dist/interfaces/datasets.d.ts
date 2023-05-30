interface IData {
    id?: number;
    name: string;
    url: string;
    data?: IDataset;
}
interface IDataset {
    name?: string;
    kanji?: string;
    romaji?: string;
    status?: string;
    species?: string;
    gender?: string;
    images?: string[];
    episode?: string[];
    age?: string;
    affiliation?: string;
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
    age?: string;
    affiliation?: string;
}
export { IDataset, IDataSource, IData, IImage };
