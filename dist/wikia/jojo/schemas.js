import { JojoFRDataSource, JojoENDataSource } from "./data-source.js";
const JojoFR = {
    url: 'https://jjba.fandom.com/fr/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://jjba.fandom.com/fr/wiki/Catégorie:Personnages',
    oldVersion: false,
    dataSource: JojoFRDataSource
};
const JojoEN = {
    url: 'https://jojo.fandom.com/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://jojo.fandom.com/wiki/Category:Characters',
    oldVersion: false,
    dataSource: JojoENDataSource
};
export { JojoFR, JojoEN };
//# sourceMappingURL=schemas.js.map