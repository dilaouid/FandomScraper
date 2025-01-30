import { JojoFRDataSource, JojoENDataSource } from "./data-source";
const JojoFR = {
    url: 'https://jjba.fandom.com/fr/wiki/Catégorie:Personnages',
    pageFormat: 'classic',
    dataSource: JojoFRDataSource
};
const JojoEN = {
    url: 'https://jojo.fandom.com/wiki/Category:Characters',
    pageFormat: 'classic',
    dataSource: JojoENDataSource
};
export { JojoFR, JojoEN };
//# sourceMappingURL=schemas.js.map