import { availableWikis, FandomScraper } from "fandomscraper";
import type { Context } from "hono";
import type { BlankEnv, BlankInput } from "hono/types";

export const count = async (c: Context<BlankEnv, "/:fandom/count", BlankInput>) => {
  try {
    const fandom = c.req.param('fandom')?.trim()?.toLowerCase();
    if (!availableWikis.includes(fandom))
        return c.json({ error: 'Invalid fandom' }, 400);
    const lang = (c.req.query('lang')?.trim()?.toLowerCase() || 'en') as 'en' | 'fr' | null;
    const fandomScraper = new FandomScraper(fandom, { lang });
    const count = await fandomScraper.count();
    return c.json({ count });
  } catch (e) {
    console.error(e);
    return c.json({ error: e }, 500);
  }
}