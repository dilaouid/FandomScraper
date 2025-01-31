import { FandomPersonalScraper, FandomScraper, TAvailableWikis } from 'fandomscraper'

import type { IMetadata, PersonalScraperOptions, ScraperOptions } from '../types/index'

const scraperInstances = new Map<string, FandomScraper>()
const personalScraperInstances = new Map<string, FandomPersonalScraper>()

const getScraper = (wiki: TAvailableWikis): FandomScraper => {
    if (!scraperInstances.has(wiki)) {
        scraperInstances.set(wiki, new FandomScraper(wiki, { lang: 'en' }))
    }
    return scraperInstances.get(wiki)!
}

const getPersonalScraper = (url: string): FandomPersonalScraper => {
    if (!personalScraperInstances.has(url)) {
        personalScraperInstances.set(url, new FandomPersonalScraper({
            url,
            pageFormat: 'classic', // Default format, can be overridden
            dataSource: {} // Will be provided in the request
        }))
    }
    return personalScraperInstances.get(url)!
}

export const scraper = {
    // Rechercher tous les personnages
    findAll: async (wiki: TAvailableWikis, options: Partial<ScraperOptions> = {}) => {
        const instance = getScraper(wiki)
        const query = instance.findAll({
            base64: options.base64 ?? false,
            withId: options.withId ?? false,
            recursive: options.recursive ?? false
        })

        if (options.limit) query.limit(options.limit)
        if (options.offset) query.offset(options.offset)
        if (options.fields?.length) {
            query.attr(options.fields.join(' '))
        }
        if (options.arrayFields?.length) {
            query.attrToArray(options.arrayFields.join(' '))
        }
        if (options.ignore?.length) {
            query.ignore(options.ignore)
        }

        return query.exec()
    },


    // Rechercher par nom
    findByName: async (wiki: TAvailableWikis, name: string, options: Partial<ScraperOptions> = {}) => {
        const instance = getScraper(wiki)
        const query = instance.findByName(name, {
            base64: options.base64 ?? false,
            withId: options.withId ?? false
        })

        if (options.fields?.length) {
            query.attr(options.fields.join(' '))
        }
        if (options.arrayFields?.length) {
            query.attrToArray(options.arrayFields.join(' '))
        }

        return query.exec()
    },


    // Rechercher par ID
    findById: async (wiki: TAvailableWikis, id: number, options: Partial<ScraperOptions> = {}) => {
        const instance = getScraper(wiki)
        const query = instance.findById(id, {
            base64: options.base64 ?? false
        })

        if (options.fields?.length) {
            query.attr(options.fields.join(' '))
        }
        if (options.arrayFields?.length) {
            query.attrToArray(options.arrayFields.join(' '))
        }

        return query.exec()
    },



    // Obtenir les métadonnées
    getMetadata: async (wiki: TAvailableWikis, { withCount = false } = {}) => {
        const instance = getScraper(wiki)
        return instance.getMetadata({ withCount }) as Promise<IMetadata>
    },

    // Obtenir le nombre total
    getCount: async (wiki: TAvailableWikis) => {
        const instance = getScraper(wiki)
        return instance.count()
    },

    // Obtenir les wikis disponibles
    getAvailableWikis: () => {
        // On utilise n'importe quelle instance pour accéder aux wikis disponibles
        const instance = getScraper('naruto')
        return instance.getAvailableWikis()
    }
}

export const personalScraper = {
    findAll: async (schema: PersonalScraperOptions, options: Partial<ScraperOptions> = {}) => {
        const instance = new FandomPersonalScraper({
            url: schema.url,
            pageFormat: schema.pageFormat,
            dataSource: schema.dataSource
        })

        const query = instance.findAll({
            base64: options.base64 ?? false,
            withId: options.withId ?? false,
            recursive: options.recursive ?? false
        })

        if (options.limit) query.limit(options.limit)
        if (options.offset) query.offset(options.offset)
        if (options.fields?.length) {
            query.attr(options.fields.join(' '))
        }
        if (options.arrayFields?.length) {
            query.attrToArray(options.arrayFields.join(' '))
        }
        if (options.ignore?.length) {
            query.ignore(options.ignore)
        }

        return query.exec()
    },

    findByName: async (name: string, schema: PersonalScraperOptions, options: Partial<ScraperOptions> = {}) => {
        const instance = new FandomPersonalScraper({
            url: schema.url,
            pageFormat: schema.pageFormat,
            dataSource: schema.dataSource
        })

        const query = instance.findByName(name, {
            base64: options.base64 ?? false,
            withId: options.withId ?? false,
        })

        if (options.fields?.length) {
            query.attr(options.fields.join(' '))
        }
        if (options.arrayFields?.length) {
            query.attrToArray(options.arrayFields.join(' '))
        }

        return query.exec()
    },

    findById: async (id: number, schema: PersonalScraperOptions, options: Partial<ScraperOptions> = {}) => {
        const instance = new FandomPersonalScraper({
            url: schema.url,
            pageFormat: schema.pageFormat,
            dataSource: schema.dataSource
        })

        const query = instance.findById(id, {
            base64: options.base64 ?? false
        })

        if (options.fields?.length) {
            query.attr(options.fields.join(' '))
        }
        if (options.arrayFields?.length) {
            query.attrToArray(options.arrayFields.join(' '))
        }

        return query.exec()
    },

    getMetadata: async (schema: PersonalScraperOptions, { withCount = false } = {}) => {
        const instance = new FandomPersonalScraper({
            url: schema.url,
            pageFormat: schema.pageFormat,
            dataSource: schema.dataSource
        })
        return instance.getMetadata({ withCount }) as Promise<IMetadata>
    },

    getCount: async (schema: PersonalScraperOptions) => {
        const instance = new FandomPersonalScraper({
            url: schema.url,
            pageFormat: schema.pageFormat,
            dataSource: schema.dataSource
        })
        return instance.count()
    }
}

