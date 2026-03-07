import { DororoENDataSource } from "./data-source";

const DororoEN: ISchema = {
    url: 'https://dororo.fandom.com/wiki/Category:Characters',
    pageFormat: 'classic',
    category: 'Category:Characters',
    dataSource: DororoENDataSource
};

export { DororoEN };