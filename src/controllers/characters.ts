import { type Context } from 'hono'
import { scraper } from '../services/scraper.service'

// Handlers purs pour les routes
export const handlers = {
    // GET /:wiki/characters
    findAll: async (c: Context) => {
        const wiki = c.req.param('wiki')
        const query = c.req.query()

        const options = {
            limit: Number(query.limit) || 100,
            offset: Number(query.offset) || 0,
            fields: query.fields?.split(','),
            withId: query.withId === 'true',
            recursive: query.recursive === 'true'
        }

        const characters = await scraper.findAll(wiki, options)
        return c.json(characters)
    },

    // GET /:wiki/characters/name/:name
    findByName: async (c: Context) => {
        const { wiki, name } = c.req.param()
        const { fields, withId = 'true' } = c.req.query()

        const character = await scraper.findByName(wiki, name, {
            fields: fields?.split(','),
            withId: withId === 'true'
        })

        return character ? c.json(character) : c.notFound()
    },

    // GET /:wiki/characters/id/:id
    findById: async (c: Context) => {
        const { wiki, id } = c.req.param()
        const { fields, withId = 'true' } = c.req.query()

        const character = await scraper.findById(wiki, Number(id), {
            fields: fields?.split(','),
            withId: withId === 'true'
        })

        return character ? c.json(character) : c.notFound()
    },

    // GET /:wiki/metadata
    getMetadata: async (c: Context) => {
        const wiki = c.req.param('wiki')
        const { withCount = 'false' } = c.req.query()

        const metadata = await scraper.getMetadata(wiki, {
            withCount: withCount === 'true'
        })

        return c.json(metadata)
    },

    // GET /:wiki/count
    getCount: async (c: Context) => {
        const wiki = c.req.param('wiki')
        const count = await scraper.getCount(wiki)
        return c.json({ count })
    },

    // GET /available-wikis
    getAvailableWikis: async (c: Context) => {
        const wikis = scraper.getAvailableWikis()
        return c.json({ wikis })
    }
}