import { ISchema } from "../../interfaces/schemas";
import { FumetsuENDataSource } from "./data-source";

const FumetsuEN: ISchema = {
    url: 'https://fumetsunoanatae.fandom.com/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://fumetsunoanatae.fandom.com/wiki/Category:Characters',
    dataSource: FumetsuENDataSource
};

export { FumetsuEN };