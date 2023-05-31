import { DeathNoteFRDataSource, DeathNoteENDataSource } from "./data-source.js";
const DeathNoteFR = {
    url: 'https://deathnote.fandom.com/fr/wiki/Cat%C3%A9gorie:Personnages',
    pageFormat: 'classic',
    dataSource: DeathNoteFRDataSource
};
const DeathNoteEN = {
    url: 'https://deathnote.fandom.com/wiki/Category:Manga_characters',
    pageFormat: 'classic',
    dataSource: DeathNoteENDataSource
};
export { DeathNoteFR, DeathNoteEN };
//# sourceMappingURL=schemas.js.map