import { ISchema } from "../../interfaces/schemas";
import { FumetsuENDataSource } from "./data-source";

const FumetsuEN: ISchema = {
    url: 'https://fumetsunoanatae.fandom.com/wiki/Category:Characters',
    pageFormat: 'classic',
    dataSource: FumetsuENDataSource
};

export { FumetsuEN };