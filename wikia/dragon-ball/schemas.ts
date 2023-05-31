import { ISchema } from "../../interfaces/schemas";
import { DragonBallFRDataSource, DragonBallENDataSource } from "./data-source";

const DragonBallFR: ISchema = {
    url: 'https://dragonball.fandom.com/fr/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://dragonball.fandom.com/fr/wiki/Catégorie:Personnages',
    dataSource: DragonBallFRDataSource
};

const DragonBallEN: ISchema = {
    url: 'https://dragonball.fandom.com/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://dragonball.fandom.com/wiki/Characters',
    dataSource: DragonBallENDataSource
};

export { DragonBallFR, DragonBallEN };