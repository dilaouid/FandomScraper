import { ISchema } from "../../interfaces";
import { ShikiENDataSource } from "./data-source";

const ShikiEN: ISchema = {
    name: 'shiki',
    url: 'https://shiki.fandom.com/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://shiki.fandom.com/wiki/Category:Characters',
    oldVersion: true,
    dataSource: ShikiENDataSource
};

export { ShikiEN };