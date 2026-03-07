import { DeathNoteFRDataSource, DeathNoteENDataSource } from "./data-source";

const DeathNoteFR: ISchema = {
    url: 'https://deathnote.fandom.com/fr/wiki/Cat%C3%A9gorie:Personnages',
    pageFormat: 'classic',
    category: 'Catégorie:Personnages',
    dataSource: DeathNoteFRDataSource
};

const DeathNoteEN: ISchema = {
    url: 'https://deathnote.fandom.com/wiki/Category:Manga_characters',
    pageFormat: 'classic',
    category: 'Category:Manga_characters',
    dataSource: DeathNoteENDataSource
};

export { DeathNoteFR, DeathNoteEN };