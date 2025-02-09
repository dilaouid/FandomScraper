import { ShingekiFRDataSource, ShingekiENDataSource } from "./data-source";

const ShingekiFR: ISchema = {
    url: 'https://attaque-des-titans.fandom.com/fr/wiki/Cat%C3%A9gorie:Personnages',
    pageFormat: 'classic',
    dataSource: ShingekiFRDataSource
};

const ShingekiEN: ISchema = {
    url: 'https://attackontitan.fandom.com/wiki/List_of_characters/Anime',
    pageFormat: 'table-4',
    dataSource: ShingekiENDataSource
};

export { ShingekiFR, ShingekiEN };