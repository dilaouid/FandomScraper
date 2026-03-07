import { DragonBallFRDataSource, DragonBallENDataSource } from "./data-source";

const DragonBallFR: ISchema = {
    url: 'https://dragonball.fandom.com/fr/wiki/Catégorie:Personnages',
    pageFormat: 'classic',
    category: 'Catégorie:Personnages',
    dataSource: DragonBallFRDataSource
};

const DragonBallEN: ISchema = {
    url: 'https://dragonball.fandom.com/wiki/Characters',
    pageFormat: 'classic',
    category: 'Category:Characters',
    dataSource: DragonBallENDataSource
};

export { DragonBallFR, DragonBallEN };