import { DragonBallFRDataSource, DragonBallENDataSource } from "./data-source";

const DragonBallFR: ISchema = {
    url: 'https://dragonball.fandom.com/fr/wiki/Catégorie:Personnages',
    pageFormat: 'classic',
    dataSource: DragonBallFRDataSource
};

const DragonBallEN: ISchema = {
    url: 'https://dragonball.fandom.com/wiki/Characters',
    pageFormat: 'classic',
    dataSource: DragonBallENDataSource
};

export { DragonBallFR, DragonBallEN };