import { availableWikis, FandomScraper } from "fandomscraper";
import type { Context } from "hono";
import type { BlankEnv, BlankInput } from "hono/types";
import { allQuerySchema } from "../../schemas/allQuerySchema.js";

export const meta = async (c: Context<BlankEnv, "/:fandom/count", BlankInput>) => {
  try {
    const fandom = c.req.param('fandom')?.trim()?.toLowerCase();
    if (!availableWikis.includes(fandom))
        return c.json({ error: 'Invalid fandom' }, 400);
    const query = allQuerySchema.parse(c.req.query());

    const lang = (query.lang?.trim()?.toLowerCase() || 'en') as 'en' | 'fr' | null;
    const fandomScraper = new FandomScraper(fandom, { lang });
    const metas = await fandomScraper.getMetadata({ withCount: query.withCount })
    return c.json({ metas });
  } catch (e) {
    console.error(e);
    return c.json({ error: e }, 500);
  }
}