import { ISchema } from "../../interfaces/schemas";
import { BerserkENDataSource } from "./data-source";

// Berserk (FR) schema not available yet on Fandom

const BerserkEN: ISchema = {
    url: 'https://berserk.fandom.com/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://berserk.fandom.com/wiki/Category:Fantasia_Arc_Characters',
    oldVersion: false,
    dataSource: BerserkENDataSource
};

export { BerserkEN };