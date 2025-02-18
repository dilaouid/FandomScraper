import { SmurfENDataSource, SmurfFRDataSource } from "./data-source";

const SmurfEN: ISchema = {
    url: 'https://smurfs.fandom.com/wiki/Category:Smurfs_Characters',
    pageFormat: 'classic',
    dataSource: SmurfENDataSource
};

const SmurfFR: ISchema = {
    url: 'https://schtroumpfs.fandom.com/fr/wiki/Cat%C3%A9gorie:Personnages',
    pageFormat: 'classic',
    dataSource: SmurfFRDataSource
}

export { SmurfEN, SmurfFR };