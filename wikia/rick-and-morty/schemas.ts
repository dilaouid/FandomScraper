import { RickAndMortyENDataSource, RickAndMortyFRDataSource } from "./data-source";

const RickAndMortyEN: ISchema = {
    url: 'https://rickandmorty.fandom.com/wiki/Category:Characters',
    pageFormat: 'classic',
    category: 'Category:Characters',
    dataSource: RickAndMortyENDataSource
};

const RickAndMortyFR: ISchema = {
    url: 'https://rick-et-morty.fandom.com/fr/wiki/Cat%C3%A9gorie:Personnages',
    pageFormat: 'classic',
    category: 'Catégorie:Personnages',
    dataSource: RickAndMortyFRDataSource
}

export { RickAndMortyEN, RickAndMortyFR };