import { OnePieceFRDataSource, OnePieceENDataSource } from "./data-source.js";
const OnePieceFR = {
    url: 'https://onepiece.fandom.com/fr/wiki/',
    pageFormat: 'table-1',
    charactersUrl: 'https://onepiece.fandom.com/fr/wiki/Liste_des_Personnages_Canon',
    dataSource: OnePieceFRDataSource
};
const OnePieceEN = {
    url: 'https://onepiece.fandom.com/wiki/',
    pageFormat: 'table-1',
    charactersUrl: 'https://onepiece.fandom.com/wiki/List_of_Canon_Characters',
    dataSource: OnePieceENDataSource
};
export { OnePieceFR, OnePieceEN };
//# sourceMappingURL=schemas.js.map