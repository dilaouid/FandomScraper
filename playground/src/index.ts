import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { FandomScraper } from '../../index.js';

const app = new Hono();

app.get('/', (c) => {
  return c.json({
    message: 'FandomScraper Playground API',
    endpoints: {
      '/wikis': 'Get all available wikis',
      '/metadata/:wiki': 'Get metadata for a specific wiki',
      '/characters/:wiki': 'Get all characters from a wiki (query params: limit, offset, recursive, withId, attrToArray)',
      '/character/:wiki/:name': 'Get a specific character by name (query params: base64, withId, attrToArray)',
      '/character/:wiki/id/:id': 'Get a specific character by ID (query params: base64, attrToArray)'
    }
  });
});

app.get('/wikis', (c) => {
  const scraper = new FandomScraper('one-piece');
  const wikis = scraper.getAvailableWikis();
  return c.json({ wikis });
});

app.get('/metadata/:wiki', async (c) => {
  try {
    const wiki = c.req.param('wiki') as any;
    const scraper = new FandomScraper(wiki);
    const metadata = await scraper.getMetadata({ withCount: false });
    return c.json({ metadata });
  } catch (error) {
    const err = error as Error;
    return c.json({ error: err.message }, 400);
  }
});

app.get('/characters/:wiki', async (c) => {
  try {
    const wiki = c.req.param('wiki') as any;
    const limit = parseInt(c.req.query('limit') || '10');
    const offset = parseInt(c.req.query('offset') || '0');
    const recursive = c.req.query('recursive') === 'true';
    const withId = c.req.query('withId') !== 'false';
    const attrToArray = c.req.query('attrToArray');
    
    const scraper = new FandomScraper(wiki);
    let chain = scraper
      .findAll({ base64: false, recursive, withId })
      .limit(limit)
      .offset(offset);
    if (attrToArray) {
      chain = chain.attrToArray(attrToArray.replace(/,/g, ' ').trim());
    }
    const characters = await chain.exec();
    
    return c.json({ characters, count: characters.length });
  } catch (error) {
    const err = error as Error;
    return c.json({ error: err.message }, 400);
  }
});

app.get('/character/:wiki/:name', async (c) => {
  try {
    const wiki = c.req.param('wiki') as any;
    const name = c.req.param('name');
    const base64 = c.req.query('base64') === 'true';
    const withId = c.req.query('withId') !== 'false';
    const attrToArray = c.req.query('attrToArray');
    
    const scraper = new FandomScraper(wiki);
    let chain = scraper.findByName(name, { base64, withId });
    if (attrToArray) {
      chain = chain.attrToArray(attrToArray.replace(/,/g, ' ').trim());
    }
    const character = await chain.exec();
    
    return c.json({ character });
  } catch (error) {
    const err = error as Error;
    return c.json({ error: err.message }, 400);
  }
});

app.get('/character/:wiki/id/:id', async (c) => {
  try {
    const wiki = c.req.param('wiki') as any;
    const id = parseInt(c.req.param('id'));
    const base64 = c.req.query('base64') === 'true';
    const attrToArray = c.req.query('attrToArray');
    
    const scraper = new FandomScraper(wiki);
    let chain = scraper.findById(id, { base64 });
    if (attrToArray) {
      chain = chain.attrToArray(attrToArray.replace(/,/g, ' ').trim());
    }
    const character = await chain.exec();
    
    return c.json({ character });
  } catch (error) {
    const err = error as Error;
    return c.json({ error: err.message }, 400);
  }
});

const port = 3000;
console.log(`🚀 Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});

