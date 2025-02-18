import { DeathParadeENDataSource } from "./data-source";

const DeathParadeEN: ISchema = {
    url: 'https://death-parade.fandom.com/wiki/Category:Characters',
    pageFormat: 'classic',
    dataSource: DeathParadeENDataSource
};

export { DeathParadeEN };