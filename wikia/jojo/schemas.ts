import { ISchema } from "../../interfaces/schemas";
import { JojoFRDataSource, JojoENDataSource } from "./data-source";

const JojoFR: ISchema = {
    url: 'https://jjba.fandom.com/fr/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://jjba.fandom.com/fr/wiki/Catégorie:Personnages',
    dataSource: JojoFRDataSource
};

const JojoEN: ISchema = {
    url: 'https://jojo.fandom.com/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://jojo.fandom.com/wiki/Category:Characters',
    dataSource: JojoENDataSource
};

export { JojoFR, JojoEN };