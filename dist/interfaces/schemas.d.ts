import { TPageFormats } from "../types";
import { IDataSource } from "./datasets";
interface ISchema {
    url: string;
    pageFormat: TPageFormats;
    charactersUrl: string;
    dataSource: IDataSource;
}
export { ISchema };
