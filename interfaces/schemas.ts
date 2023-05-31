import { TPageFormats } from "../types";
import { IDataSource } from "./datasets";

// The schema of a wiki (the different properties of a wiki) for the scraper to work
interface ISchema {
    // the url of the wiki to scrape (ex: 'https://dragonball.fandom.com/wiki/')
    url: string;

    // the format of the characters list page (ex: 'classic')
    pageFormat: TPageFormats;

    // the url of the characters list page (ex: 'https://dragonball.fandom.com/wiki/Characters')
    charactersUrl: string;

    // the data-source of the wiki (ex: DragonBallFRDataSource) which will be used to scrape the wiki
    dataSource: IDataSource;
};

export { ISchema };