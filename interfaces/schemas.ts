import { TAvailableWikis, TPageFormats } from "../types";
import { IDataSource } from "./datasets";

// The schema of a wiki (the different properties of a wiki) for the scraper to work
interface ISchema {
    name: TAvailableWikis;
    url: string;
    pageFormat: TPageFormats;
    charactersUrl: string;
    oldVersion: boolean; // if the character page is the old version (table with no data-source property in the dom)
    dataSource: IDataSource;
};

export { ISchema };