import { DragonBallFRDataSource, DragonBallENDataSource  } from './data-source.js';
const DragonBallFR = {
    url: 'https://dragonball.fandom.com/fr/wiki/Catégorie:Personnages',
    pageFormat: 'classic',
    dataSource: DragonBallFRDataSource
};
const DragonBallEN = {
    url: 'https://dragonball.fandom.com/wiki/Characters',
    pageFormat: 'classic',
    dataSource: DragonBallENDataSource
};
export { DragonBallFR, DragonBallEN };
//# sourceMappingURL=schemas.js.map