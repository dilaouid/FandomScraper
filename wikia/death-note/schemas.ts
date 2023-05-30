import { ISchema } from "../../interfaces/schemas";
import { DeathNoteFRDataSource, DeathNoteENDataSource } from "./data-source";

const DeathNoteFR: ISchema = {
    url: 'https://deathnote.fandom.com/fr/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://deathnote.fandom.com/fr/wiki/Cat%C3%A9gorie:Personnages',
    oldVersion: true,
    dataSource: DeathNoteFRDataSource
};

const DeathNoteEN: ISchema = {
    url: 'https://deathnote.fandom.com/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://deathnote.fandom.com/wiki/Category:Manga_characters',
    oldVersion: false,
    dataSource: DeathNoteENDataSource
};

export { DeathNoteFR, DeathNoteEN };