import { TPageFormats } from "../types";
import { IDataSource } from "./datasets";
interface ISchema {
    url: string;
    pageFormat: TPageFormats;
    charactersUrl: string;
    oldVersion: boolean;
    dataSource: IDataSource;
}
export { ISchema };
