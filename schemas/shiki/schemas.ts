import { ISchema } from "@interfaces/schemas"
import { ShikiENDataSource } from "./data-source";

const ShikiEN: ISchema = {
    url: 'https://shiki.fandom.com/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://shiki.fandom.com/wiki/Category:Characters',
    oldVersion: true,
    dataSource: ShikiENDataSource
};

export { ShikiEN };