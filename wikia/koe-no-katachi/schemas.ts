import { SilentVoiceENDataSource, SilentVoiceFRDataSource } from "./data-source";

const SilentVoiceFR: ISchema = {
    url: 'https://koenokatachi.fandom.com/fr/wiki/Cat%C3%A9gorie:Personnages',
    pageFormat: 'classic',
    category: 'Catégorie:Personnages',
    dataSource: SilentVoiceFRDataSource
};

const SilentVoiceEN: ISchema = {
    url: 'https://koenokatachi.fandom.com/wiki/Category:Characters',
    pageFormat: 'classic',
    category: 'Category:Characters',
    dataSource: SilentVoiceENDataSource
};

export { SilentVoiceEN, SilentVoiceFR };