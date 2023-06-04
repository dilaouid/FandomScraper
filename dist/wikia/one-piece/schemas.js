import { OnePieceFRDataSource, OnePieceENDataSource  } from './data-source.js';
const OnePieceFR = {
    url: 'https://onepiece.fandom.com/fr/wiki/Liste_des_Personnages_Canon',
    pageFormat: 'table-1',
    dataSource: OnePieceFRDataSource
};
const OnePieceEN = {
    url: 'https://onepiece.fandom.com/wiki/List_of_Canon_Characters',
    pageFormat: 'table-1',
    dataSource: OnePieceENDataSource
};
export { OnePieceFR, OnePieceEN };
//# sourceMappingURL=schemas.js.map