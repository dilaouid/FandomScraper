import { FandomScraper } from 'fandomscraper'

import type { ScraperOptions } from '../types/index'

const scraperInstances = new Map<string, FandomScraper>()

const getScraper = (wiki: string): FandomScraper => {
    if (!scraperInstances.has(wiki)) {
        scraperInstances.set(wiki, new FandomScraper(wiki, { lang: 'en' }))
    }
    return scraperInstances.get(wiki)!
}

export const scraper = {
    // Rechercher tous les personnages
    findAll: async (wiki: string, options: Partial<ScraperOptions> = {}) => {
        const instance = getScraper(wiki)
        const query = instance.findAll({
            base64: false,
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
    
        return query.exec()
    },
    

    // Rechercher par nom
    findByName: async (wiki: string, name: string, options: Partial<ScraperOptions> = {}) => {
        const instance = getScraper(wiki)
        const query = instance.findByName(name, {
            base64: false,
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
    findById: async (wiki: string, id: number, options: Partial<ScraperOptions> = {}) => {
        const instance = getScraper(wiki)
        const query = instance.findById(id, {
            base64: false
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
    getMetadata: async (wiki: string, { withCount = false } = {}) => {
        const instance = getScraper(wiki)
        return instance.getMetadata({ withCount })
    },

    // Obtenir le nombre total
    getCount: async (wiki: string) => {
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
