import { DragonBallFRDataSource, DragonBallENDataSource } from "./data-source.js";
const DragonBallFR = {
    url: 'https://dragonball.fandom.com/fr/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://dragonball.fandom.com/fr/wiki/Catégorie:Personnages',
    dataSource: DragonBallFRDataSource
};
const DragonBallEN = {
    url: 'https://dragonball.fandom.com/wiki/',
    pageFormat: 'classic',
    charactersUrl: 'https://dragonball.fandom.com/wiki/Characters',
    dataSource: DragonBallENDataSource
};
export { DragonBallFR, DragonBallEN };
//# sourceMappingURL=schemas.js.map