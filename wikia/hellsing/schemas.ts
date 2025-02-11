import { HellsingENDataSource } from "./data-source";

const HellsingEN: ISchema = {
    url: 'https://hellsing.fandom.com/wiki/Category:Characters',
    pageFormat: 'classic',
    dataSource: HellsingENDataSource
};

export { HellsingEN };