import { type Context } from 'hono'
import type { PersonalScraperOptions, ScraperOptions } from '../types'
import { personalScraper, scraper } from '../services/scraper.service'
import { TAvailableWikis } from 'fandomscraper'

export const handlers = {
    // GET /:wiki/characters
    findAll: async (c: Context) => {
        const wiki = c.req.param('wiki') as TAvailableWikis
        const query = c.req.query()
        
        const options: Partial<ScraperOptions> = {
            base64: query.base64 === 'true',
            limit: Number(query.limit) || 100,
            offset: Number(query.offset) || 0,
            fields: query.fields?.split(','),
            arrayFields: query.arrayFields?.split(','),
            withId: query.withId === 'true',
            recursive: query.recursive === 'true',
            ignore: query.ignore?.split(',')
        }

        const characters = await scraper.findAll(wiki, options)
        return c.json(characters)
    },


    // GET /:wiki/characters/name/:name
    findByName: async (c: Context) => {
        const { wiki, name } = c.req.param() as { wiki: TAvailableWikis, name: string }
        const query = c.req.query()
        
        const options: Partial<ScraperOptions> = {
            base64: query.base64 === 'true',
            fields: query.fields?.split(','),
            arrayFields: query.arrayFields?.split(','),
            withId: query.withId === 'true',
            recursive: query.recursive === 'true'
        }
        
        const character = await scraper.findByName(wiki, name, options)
        return character ? c.json(character) : c.notFound()
    },


    // GET /:wiki/characters/id/:id
    findById: async (c: Context) => {
        const { wiki, id } = c.req.param() as { wiki: TAvailableWikis, id: string }
        const { base64, fields, withId = 'true' } = c.req.query()

        const character = await scraper.findById(wiki, Number(id), {
            fields: fields?.split(','),
            base64: base64 === 'true',
            withId: withId === 'true'
        })

        return character ? c.json(character) : c.notFound()
    },

    // GET /:wiki/metadata
    getMetadata: async (c: Context) => {
        const wiki = c.req.param('wiki') as TAvailableWikis
        const { withCount = 'false' } = c.req.query()

        const metadata = await scraper.getMetadata(wiki, {
            withCount: withCount === 'true'
        })

        return c.json(metadata)
    },

    // GET /:wiki/count
    getCount: async (c: Context) => {
        const wiki = c.req.param('wiki') as TAvailableWikis
        const count = await scraper.getCount(wiki)
        return c.json({ count })
    },

    // GET /available-wikis
    getAvailableWikis: async (c: Context) => {
        const wikis = scraper.getAvailableWikis()
        return c.json({ wikis })
    },

    // POST /personal-wiki/characters
    findAllPersonal: async (c: Context) => {
        const schema = await c.req.json()
        const query = c.req.query()
        
        const options: Partial<PersonalScraperOptions> = {
            base64: query.base64 === 'true',
            limit: Number(query.limit) || 100,
            offset: Number(query.offset) || 0,
            fields: query.fields?.split(','),
            arrayFields: query.arrayFields?.split(','),
            withId: query.withId === 'true',
            recursive: query.recursive === 'true',
            ignore: query.ignore?.split(',')
        }

        const characters = await personalScraper.findAll(schema, options)
        return c.json(characters)
    },

    // POST /personal-wiki/characters/name/:name 
    findByNamePersonal: async (c: Context) => {
        const { name } = c.req.param()
        const schema = await c.req.json()
        const query = c.req.query()
        
        const options: Partial<PersonalScraperOptions> = {
            base64: query.base64 === 'true',
            fields: query.fields?.split(','),
            arrayFields: query.arrayFields?.split(','),
            withId: query.withId === 'true',
            recursive: query.recursive === 'true'
        }

        const character = await personalScraper.findByName(name, schema, options)
        return character ? c.json(character) : c.notFound()
    },

    // POST /personal-wiki/characters/id/:id
    findByIdPersonal: async (c: Context) => {
        const { id } = c.req.param()
        const schema = await c.req.json()
        const query = c.req.query()
        
        const options: Partial<PersonalScraperOptions> = {
            base64: query.base64 === 'true',
            fields: query.fields?.split(','),
            arrayFields: query.arrayFields?.split(','),
            withId: query.withId === 'true',
            recursive: query.recursive === 'true'
        }

        const character = await personalScraper.findById(Number(id), schema, options)
        return character ? c.json(character) : c.notFound()
    }
}