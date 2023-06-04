import { TPageFormats } from "../types";
import { IDataSource } from "./datasets";
interface ISchema {
    url: string;
    pageFormat: TPageFormats;
    dataSource: IDataSource;
}
export { ISchema };
