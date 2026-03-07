import { FumetsuENDataSource } from "./data-source";

const FumetsuEN: ISchema = {
    url: 'https://fumetsunoanatae.fandom.com/wiki/Category:Characters',
    pageFormat: 'classic',
    category: 'Category:Characters',
    dataSource: FumetsuENDataSource
};

export { FumetsuEN };