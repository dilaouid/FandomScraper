var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { availableWikis } from '../types';
const importSchema = (wiki) => __awaiter(void 0, void 0, void 0, function* () {
    // change wiki into a single word with the each first letter capitalized
    // ex: demon-slayer -> DemonSlayer
    const formatted = wiki.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join('');
    // import the schema module according to the wiki name
    const schemaModule = yield import(`./${wiki}`);
    return schemaModule[formatted];
});
export const Schemas = {};
(() => __awaiter(void 0, void 0, void 0, function* () {
    for (const wiki of availableWikis) {
        Schemas[wiki] = yield importSchema(wiki);
    }
}))();
//# sourceMappingURL=index.js.map