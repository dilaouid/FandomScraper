import { ShikiENDataSource } from "./data-source";

const ShikiEN: ISchema = {
    url: 'https://shiki.fandom.com/wiki/Category:Characters',
    pageFormat: 'classic',
    dataSource: ShikiENDataSource
};

export { ShikiEN };