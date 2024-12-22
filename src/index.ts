import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { allCharacters } from './controllers/all.js'
import { wikis } from './controllers/available-wikis.js';
import { count } from './controllers/count.js';
import { characterByID } from './controllers/character-by-id.js';
import { characterByName } from './controllers/character-by-name.js';
import { meta } from './controllers/meta.js';

const app = new Hono()

app.get('/wikis', wikis);
app.get('/:fandom/all', allCharacters);
app.get('/:fandom/character/name/:name', characterByName);
app.get('/:fandom/character/id/:id', characterByID);
app.get('/:fandom/meta', meta);
app.get('/:fandom/count', count);

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
