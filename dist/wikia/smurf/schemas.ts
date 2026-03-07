import { SmurfENDataSource, SmurfFRDataSource } from "./data-source";

const SmurfEN: ISchema = {
    url: 'https://smurfs.fandom.com/wiki/Category:Smurfs_Characters',
    pageFormat: 'classic',
    category: 'Category:Smurfs_Characters',
    dataSource: SmurfENDataSource
};

const SmurfFR: ISchema = {
    url: 'https://schtroumpfs.fandom.com/fr/wiki/Cat%C3%A9gorie:Personnages',
    pageFormat: 'classic',
    category: 'Catégorie:Personnages',
    dataSource: SmurfFRDataSource
}

export { SmurfEN, SmurfFR };