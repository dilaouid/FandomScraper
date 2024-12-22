import { availableWikis, FandomScraper } from "fandomscraper";
import type { Context } from "hono";
import type { BlankEnv, BlankInput } from "hono/types";
import { allQuerySchema } from "../../schemas/allQuerySchema.js";

export const characterByID = async (c: Context<BlankEnv, "/:fandom/character/id/:id", BlankInput>) => {
    try {
        const fandom = c.req.param('fandom')?.trim()?.toLowerCase();
        const id = c.req.param('id')?.trim()?.toLowerCase();

        if (!availableWikis.includes(fandom))
            return c.json({ error: 'Invalid fandom' }, 400);
        
        const query = allQuerySchema.parse(c.req.query());
        const lang = (c.req.query('lang')?.trim()?.toLowerCase() || 'en') as 'en' | 'fr' | null;
        const fandomScraper = new FandomScraper(fandom, { lang });
        const character = await fandomScraper.findById(Number(id), {
            base64: query.base64
        }).attr(query.attr as string).attrToArray(query.attrToArray as string).exec();
        return c.json(character);
    } catch (e) {
        console.error(e);
        return c.json({ error: e }, 500);
    }
}