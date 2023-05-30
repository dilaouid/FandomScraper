import { TAvailableWikis, availableWikis } from '../types';


const importSchema = async (wiki: TAvailableWikis) => {

    // change wiki into a single word with each first letter capitalized
    // ex: demon-slayer -> DemonSlayer
    const formatted = wiki.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join('');

    // get the index file of the wiki folder
    const schemaModule = await import(`./${wiki}`);

    return schemaModule[formatted];
};

export const Schemas: Record<TAvailableWikis, any> = {} as Record<TAvailableWikis, any>;

(async () => {
    for (const wiki of availableWikis) {
        Schemas[wiki] = await importSchema(wiki);
    }
})();