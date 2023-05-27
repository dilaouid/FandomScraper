import { ISchema } from "../../interfaces";
import { DeathNoteFRDataSource, DeathNoteENDataSource } from "./data-source";

const DeathNoteFR: ISchema = {
    name: 'death-note',
    url: 'https://deathnote.fandom.com/fr/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://deathnote.fandom.com/fr/wiki/Cat%C3%A9gorie:Personnages',
    oldVersion: true,
    dataSource: DeathNoteFRDataSource
};

const DeathNoteEN: ISchema = {
    name: 'death-note',
    url: 'https://deathnote.fandom.com/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://deathnote.fandom.com/wiki/Category:Manga_characters',
    oldVersion: false,
    dataSource: DeathNoteENDataSource
};

export { DeathNoteFR, DeathNoteEN };