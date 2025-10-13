// Ensure TypeScript treats this file as global
declare global {

    // the different formats available of pages
    type TPageFormats = 'classic' | 'table-1' | 'table-2' | 'table-3' | 'table-4' | 'table-5'
    /*
        classic: the classic page with the list of characters names
        table-1: the table with the image on the left
        table-2: the sorted table with the different categories
    */

    type TDataset = string | string[];
    interface IData {
        id?: number; // id of the character from the wikia pageId value
        name: string; // name of the character
        url: string; // url of the character page on the wikia
        data?: IDataset; // data of the character
    }

    interface IImage {
        identifier: string;
        get: Function;
        ignore?: string[];
    }


    interface IQuote {
        identifier: string;
        get: (page: Document) => Element | null;
    }

    interface IKnownDatasetFields {
        name?: TDataset; // name of the character
        kanji?: string; // kanji name of the character
        quote?: string | string[]; // quote of the character
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
    }

    // IDataset extends known fields and allows custom fields
    interface IDataset extends IKnownDatasetFields {
        [key: string]: TDataset | string | string[] | undefined;
    }

    // Known data source fields with their selectors
    interface IKnownDataSourceFields {
        name?: string;
        kanji?: string;
        quote?: string | IQuote;
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

    // Interface of where to scrap the page to get the data of the characters (data-source)
    // Supports custom fields beyond the known ones
    interface IDataSource extends IKnownDataSourceFields {
        [key: string]: string | IImage | IQuote | undefined;
    }

    interface ISchema {
        // the url of the wiki characters list to scrape (ex: 'https://dragonball.fandom.com/wiki/Characters')
        url: string;

        // the format of the characters list page (ex: 'classic')
        pageFormat: TPageFormats;

        // the data-source of the wiki (ex: DragonBallFRDataSource) which will be used to scrape the wiki
        dataSource: IDataSource;
    }
}

export { };