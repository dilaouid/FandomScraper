import { availableWikis } from '../types/index.cjs';
const importSchema = async (wiki) => {
    // change wiki into a single word with each first letter capitalized
    // ex: demon-slayer -> DemonSlayer
    const formatted = wiki.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join('');
    // import the schema module according to the wiki name
    const schemaModule = await import(`./${wiki}/index.js`);
    return schemaModule[formatted];
};
export const Schemas = {};
(async () => {
    for (const wiki of availableWikis) {
        Schemas[wiki] = await importSchema(wiki);
    }
})();
//# sourceMappingURL=index.js.map