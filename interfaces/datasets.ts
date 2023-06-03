interface IData {
    id?: number; // id of the character from the wikia pageId value
    name: string; // name of the character
    url: string; // url of the character page on the wikia
    data?: IDataset; // data of the character
}

type TDataset = string | string[];;

interface IDataset {
    name?: TDataset; // name of the character
    kanji?: string; // kanji name of the character
    romaji?: string; // romaji name of the character
    status?: string; // status of the character (dead, alive, etc.)
    species?: TDataset; // race
    gender?: string; // gender of the character
    images?: string[]; // array of image urls
    episode?: TDataset; // array of episode names where the character first appeared
    manga?: string; // manga chapter where the character first appeared
    age?: TDataset; // age of the character
    birthday?: string; // birthday of the character
    bloodType?: string; // blood type of the character
    zodiac?: string; // zodiac sign of the character
    hairColor?: string; // hair color of the character
    eyeColor?: string; // eye color of the character
    height?: TDataset; // height of the character
    weight?: TDataset; // weight of the character
    relatives?: TDataset; // array of relatives of the character
    affiliation?: string; // affiliation of the character
    occupations?: TDataset; // array of occupations of the character
    nationality?: string; // nationality of the character
    seiyu?: TDataset; // seiyu of the character
    voiceActor?: TDataset; // voice actor of the character
};

interface IImage {
    identifier: string;
    get: Function;
};

// Interface of where to scrap the page to get the data of the characters (data-source)
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
};

export { IDataset, IDataSource, IData, IImage };