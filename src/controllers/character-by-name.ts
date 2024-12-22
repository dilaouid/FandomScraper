import { availableWikis, FandomScraper } from "fandomscraper";
import type { Context } from "hono";
import type { BlankEnv, BlankInput } from "hono/types";
import { allQuerySchema } from "../../schemas/allQuerySchema.js";

export const characterByName = async (c: Context<BlankEnv, "/:fandom/character/name/:name", BlankInput>) => {
    try {
        const fandom = c.req.param('fandom')?.trim()?.toLowerCase();
        const name = c.req.param('name')?.trim()?.toLowerCase();

        if (!availableWikis.includes(fandom))
            return c.json({ error: 'Invalid fandom' }, 400);
        
        const query = allQuerySchema.parse(c.req.query());
        const lang = (c.req.query('lang')?.trim()?.toLowerCase() || 'en') as 'en' | 'fr' | null;
        const fandomScraper = new FandomScraper(fandom, { lang });
        const character = await fandomScraper.findByName(name, {
            base64: query.base64,
            withId: query.withId
        }).attr(query.attr as string).attrToArray(query.attrToArray as string).exec();
        return c.json(character);
    } catch (e) {
        console.error(e);
        return c.json({ error: e }, 500);
    }
}