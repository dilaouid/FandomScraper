import { FandomScraper } from "fandomscraper";
import { allQuerySchema } from "../../schemas/allQuerySchema.js";
import type { Context } from "hono";
import type { BlankEnv, BlankInput } from "hono/types";

export const allCharacters = async (c: Context<BlankEnv, "/:fandom/all", BlankInput>) => {
    try {
      const fandom = c.req.param('fandom');
      const query = allQuerySchema.parse(c.req.query());
  
      if (query.recursive && query.attr && query.attr.length === 0) {
        return c.json({ error: 'The "attr" parameter is required when recursive is true.' }, 400);
      }
  
      const fandomScraper = new FandomScraper(fandom, { lang: query.lang });
      const allCharacters = await fandomScraper.findAll({
        base64: query.base64,
        withId: query.withId,
        recursive: query.recursive
      }).attr(query.attr as string).offset(query.offset).limit(query.limit).attrToArray(query.attrToArray as string).ignore(query.ignore).exec();
  
      return c.json(allCharacters);
    } catch (e) {
      console.error(e);
      return c.json({ error: e }, 500);
    }
}