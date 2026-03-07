import { JojoFRDataSource, JojoENDataSource } from "./data-source";

const JojoFR: ISchema = {
    url: 'https://jjba.fandom.com/fr/wiki/Catégorie:Personnages',
    pageFormat: 'classic',
    category: 'Catégorie:Personnages',
    dataSource: JojoFRDataSource
};

const JojoEN: ISchema = {
    url: 'https://jojo.fandom.com/wiki/Category:Characters',
    pageFormat: 'classic',
    category: 'Category:Characters',
    dataSource: JojoENDataSource
};

export { JojoFR, JojoEN };