import { availableWikis } from "fandomscraper";
import type { Context } from "hono";
import type { BlankEnv, BlankInput } from "hono/types";

export const wikis = (c: Context<BlankEnv, "/wikis", BlankInput>) => {
  return c.json(availableWikis);
}