import { FandomScraper } from './FandomScraper';

/**
 * This class allows you to define your own schema for a fandom wiki scraper
 * @class
 */
export class FandomPersonalScraper extends FandomScraper {
    constructor(schema: ISchema) {
        super('one-piece', { lang: 'en' });

        // check if the schema is valid
        if (!schema.url || !schema.pageFormat || !schema.dataSource) {
            throw new Error('The schema you provided is not valid');
        }

        if (schema.dataSource.images) {
            // if schema.dataSource.images doesnt have the get function or the identifier property then throw an error
            if (!schema.dataSource.images.get || !schema.dataSource.images.identifier) {
                throw new Error('The schema you provided is not valid');
            }
        }

        this._schema = schema;
    }
}

