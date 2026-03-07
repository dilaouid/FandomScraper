import { expect } from 'chai';

import { FandomPersonalScraper } from '../index';
import { fetchCharacterList } from '../services/CharacterListFetcher';

describe('MediaWiki character discovery', () => {
    const originalFetch = global.fetch;

    const mediaWikiSchema: ISchema = {
        url: 'https://berserk.fandom.com/wiki/Category:Fantasia_Arc_Characters',
        pageFormat: 'classic',
        dataSource: {},
        characterList: {
            strategy: 'mediawiki',
            wikiName: 'berserk',
            lang: 'en',
            categoryName: 'Fantasia_Arc_Characters',
            baseUrl: 'https://berserk.fandom.com/wiki/'
        }
    };

    afterEach(() => {
        global.fetch = originalFetch;
        jest.restoreAllMocks();
    });

    it('should map MediaWiki pages to the current character shape', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                query: {
                    pages: {
                        '1': {
                            pageid: 10,
                            title: 'Guts',
                            original: {
                                source: 'https://images.example/guts.png'
                            }
                        },
                        '2': {
                            pageid: 11,
                            title: 'Casca'
                        }
                    }
                }
            })
        }) as typeof fetch;

        const result = await fetchCharacterList(mediaWikiSchema);
        const [requestedUrl, requestInit] = (global.fetch as jest.Mock).mock.calls[0];

        expect(String(requestedUrl)).to.contain('action=query');
        expect(String(requestedUrl)).to.contain('generator=categorymembers');
        expect(String(requestedUrl)).to.contain('gcmtitle=Category%3AFantasia_Arc_Characters');
        expect(requestInit.headers['User-Agent']).to.equal('FandomScraper/1.0');
        expect(result.characters).to.have.length(2);
        expect(result.characters[0]).to.deep.include({
            id: 10,
            name: 'Guts',
            url: 'https://berserk.fandom.com/wiki/Guts',
            imageUrl: 'https://images.example/guts.png'
        });
        expect(result.characters[1].id).to.equal(11);
        expect(result.characters[1].name).to.equal('Casca');
        expect(result.characters[1].url).to.equal('https://berserk.fandom.com/wiki/Casca');
        expect(result.characters[1].imageUrl).to.equal(undefined);
    });

    it('should paginate MediaWiki discovery when counting characters', async () => {
        global.fetch = jest.fn()
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    query: {
                        pages: {
                            '1': {
                                pageid: 10,
                                title: 'Guts'
                            }
                        }
                    },
                    continue: {
                        continue: 'gcmcontinue||',
                        gcmcontinue: 'page|123'
                    }
                })
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    query: {
                        pages: {
                            '2': {
                                pageid: 11,
                                title: 'Casca'
                            }
                        }
                    }
                })
            }) as typeof fetch;

        const scraper = new FandomPersonalScraper(mediaWikiSchema);
        const count = await scraper.count();
        const secondCallUrl = String((global.fetch as jest.Mock).mock.calls[1][0]);

        expect(count).to.equal(2);
        expect((global.fetch as jest.Mock).mock.calls).to.have.length(2);
        expect(secondCallUrl).to.contain('gcmcontinue=page%7C123');
    });

    it('should use the legacy flow and emit a warning when strategy is explicitly legacy', async () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

        global.fetch = jest.fn().mockResolvedValue({
            text: async () => `
                <html>
                    <body>
                        <a class="category-page__member-link" href="/wiki/Guts">Guts</a>
                        <a class="category-page__member-link" href="/wiki/Casca">Casca</a>
                    </body>
                </html>
            `
        }) as typeof fetch;

        const scraper = new FandomPersonalScraper({
            ...mediaWikiSchema,
            characterList: {
                strategy: 'legacy'
            }
        });

        const characters = await scraper
            .findAll({ base64: false, recursive: false, withId: false })
            .limit(2)
            .exec();

        expect(characters).to.have.length(2);
        expect(characters[0].name).to.equal('Guts');
        expect(warnSpy.mock.calls).to.have.length(1);
    });

    it('should use the legacy flow and emit a warning when no characterList is configured', async () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

        global.fetch = jest.fn().mockResolvedValue({
            text: async () => `
                <html>
                    <body>
                        <a class="category-page__member-link" href="/wiki/Guts">Guts</a>
                    </body>
                </html>
            `
        }) as typeof fetch;

        const schemaWithoutCharacterList: ISchema = {
            url: 'https://berserk.fandom.com/wiki/Category:Fantasia_Arc_Characters',
            pageFormat: 'classic',
            dataSource: {}
        };

        const scraper = new FandomPersonalScraper(schemaWithoutCharacterList);
        const characters = await scraper
            .findAll({ base64: false, recursive: false, withId: false })
            .limit(1)
            .exec();

        expect(characters).to.have.length(1);
        expect(characters[0].name).to.equal('Guts');
        // No characterList config → legacy + warning emitted
        expect(warnSpy.mock.calls).to.have.length(1);
        // Verify the API was NOT called (fetch was called once: the HTML page)
        expect((global.fetch as jest.Mock).mock.calls).to.have.length(1);
    });
});
