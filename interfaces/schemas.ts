import { TAvailableWikis, TPageFormats } from "../types";
import { IDataSource } from "./datasets";

// The schema of a wiki (the different properties of a wiki) for the scraper to work
interface ISchema {
    // name of the wiki to scrape (ex: 'dragon-ball')
    name: TAvailableWikis;

    // the url of the wiki (ex: 'https://dragonball.fandom.com/wiki/')
    url: string;

    // the format of the characters list page (ex: 'classic')
    pageFormat: TPageFormats;

    // the url of the characters list page (ex: 'https://dragonball.fandom.com/wiki/Characters')
    charactersUrl: string;

    // if the character page is the old version (table with no data-source property in the dom)
    oldVersion: boolean; 

    // the data-source of the wiki (ex: DragonBallFRDataSource) which will be used to scrape the wiki
    dataSource: IDataSource;
};

export { ISchema };