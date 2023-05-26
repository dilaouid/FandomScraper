interface IData {
    id?: number; // id of the character from the wikia pageId value
    name: string; // name of the character
    url: string; // url of the character page on the wikia
    data?: IDataset; // data of the character
}


interface IDataset {
    name?: string; // name of the character
    kanji?: string; // kanji name of the character
    romaji?: string; // romaji name of the character
    status?: string; // status of the character (dead, alive, etc.)
    species?: string; // race
    gender?: string; // gender of the character
    images?: string[]; // array of image urls
    episode?: string[]; // array of episode names where the character first appeared
    age?: string; // age of the character
    affiliation?: string; // affiliation of the character
};


// Interface of where to scrap the page to get the data of the characters (data-source)
interface IDataSource {
    name?: string;
    kanji?: string;
    romaji?: string;
    status?: string;
    species?: string;
    gender?: string;
    images?: string;
    episode?: string;
    age?: string;
    affiliation?: string;
};

export { IDataset, IDataSource, IData };