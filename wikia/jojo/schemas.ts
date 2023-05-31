import { ISchema } from "../../interfaces/schemas";
import { JojoFRDataSource, JojoENDataSource } from "./data-source";

const JojoFR: ISchema = {
    url: 'https://jjba.fandom.com/fr/wiki/Catégorie:Personnages',
    pageFormat: 'classic',
    dataSource: JojoFRDataSource
};

const JojoEN: ISchema = {
    url: 'https://jojo.fandom.com/wiki/Category:Characters',
    pageFormat: 'classic',
    dataSource: JojoENDataSource
};

export { JojoFR, JojoEN };