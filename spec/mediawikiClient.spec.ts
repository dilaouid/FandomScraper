import { expect } from 'chai';
import { fetchCharacterList, fetchAllCharacters } from '../services/MediaWikiClient';
import { installMockFetch } from './helpers/mockFetch';

jest.setTimeout(10000);

function makeApiUrl(base: string, params: Record<string, string>): string {
    const url = new URL(base);
    for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
    }
    return url.href;
}

const BASE_API = 'https://test.fandom.com/api.php';

function buildGeneratorUrl(categoryTitle: string, continuationToken?: string): string {
    return makeApiUrl(BASE_API, {
        action: 'query',
        generator: 'categorymembers',
        gcmtitle: categoryTitle,
        gcmnamespace: '0',
        gcmlimit: '500',
        prop: 'pageimages',
        piprop: 'original',
        format: 'json',
        ...(continuationToken ? { gcmcontinue: continuationToken } : {}),
    });
}

describe('MediaWikiClient', () => {
    let restoreFetch: (() => void) | undefined;

    afterEach(() => restoreFetch?.());

    describe('fetchCharacterList', () => {
        it('returns members with pageid, title and profileImage', async () => {
            const apiResponse = {
                query: {
                    pages: {
                        '100': { pageid: 100, title: 'Alice', original: { source: 'https://img.test/alice.jpg', width: 200, height: 300 } },
                        '101': { pageid: 101, title: 'Bob' },
                    },
                },
            };

            restoreFetch = installMockFetch({
                [buildGeneratorUrl('Category:Characters')]: {
                    body: JSON.stringify(apiResponse),
                    contentType: 'application/json',
                },
            });

            const result = await fetchCharacterList(BASE_API, 'Category:Characters');

            expect(result.members).to.have.length(2);
            const alice = result.members.find((m) => m.title === 'Alice')!;
            expect(alice.pageid).to.equal(100);
            expect(alice.profileImage).to.equal('https://img.test/alice.jpg');

            const bob = result.members.find((m) => m.title === 'Bob')!;
            expect(bob.pageid).to.equal(101);
            expect(bob.profileImage).to.be.null;

            expect(result.nextToken).to.be.undefined;
        });

        it('returns a continuation token when the API signals more pages', async () => {
            const apiResponse = {
                continue: { gcmcontinue: 'next-page-token', continue: 'gcmcontinue||' },
                query: {
                    pages: {
                        '200': { pageid: 200, title: 'Charlie' },
                    },
                },
            };

            restoreFetch = installMockFetch({
                [buildGeneratorUrl('Category:Heroes')]: {
                    body: JSON.stringify(apiResponse),
                    contentType: 'application/json',
                },
            });

            const result = await fetchCharacterList(BASE_API, 'Category:Heroes');

            expect(result.members).to.have.length(1);
            expect(result.nextToken).to.equal('next-page-token');
        });

        it('passes the continuation token as gcmcontinue', async () => {
            const secondPage = {
                query: {
                    pages: {
                        '300': { pageid: 300, title: 'Dave' },
                    },
                },
            };

            restoreFetch = installMockFetch({
                [buildGeneratorUrl('Category:Characters', 'my-token')]: {
                    body: JSON.stringify(secondPage),
                    contentType: 'application/json',
                },
            });

            const result = await fetchCharacterList(BASE_API, 'Category:Characters', 'my-token');

            expect(result.members).to.have.length(1);
            expect(result.members[0].title).to.equal('Dave');
            expect(result.nextToken).to.be.undefined;
        });

        it('returns an empty array when the category has no members', async () => {
            const emptyResponse = { query: { pages: {} } };

            restoreFetch = installMockFetch({
                [buildGeneratorUrl('Category:Empty')]: {
                    body: JSON.stringify(emptyResponse),
                    contentType: 'application/json',
                },
            });

            const result = await fetchCharacterList(BASE_API, 'Category:Empty');

            expect(result.members).to.be.an('array').that.is.empty;
            expect(result.nextToken).to.be.undefined;
        });

        it('filters out pages with non-positive pageids', async () => {
            const responseWithInvalid = {
                query: {
                    pages: {
                        '-1': { pageid: -1, title: 'Missing page' },
                        '500': { pageid: 500, title: 'Valid page', original: { source: 'https://img.test/valid.jpg' } },
                    },
                },
            };

            restoreFetch = installMockFetch({
                [buildGeneratorUrl('Category:Mixed')]: {
                    body: JSON.stringify(responseWithInvalid),
                    contentType: 'application/json',
                },
            });

            const result = await fetchCharacterList(BASE_API, 'Category:Mixed');

            expect(result.members).to.have.length(1);
            expect(result.members[0].title).to.equal('Valid page');
        });

        it('throws on an API error response', async () => {
            const errorResponse = { error: { code: 'invalidcategory', info: 'Invalid category title' } };

            restoreFetch = installMockFetch({
                [buildGeneratorUrl('Category:Bad')]: {
                    body: JSON.stringify(errorResponse),
                    contentType: 'application/json',
                },
            });

            let caughtError: Error | undefined;
            try {
                await fetchCharacterList(BASE_API, 'Category:Bad');
            } catch (e) {
                caughtError = e as Error;
            }
            expect(caughtError).to.exist;
            expect(caughtError!.message).to.include('Invalid category title');
        });

        it('throws on a non-200 HTTP response', async () => {
            restoreFetch = installMockFetch({
                [buildGeneratorUrl('Category:Down')]: {
                    body: 'Internal Server Error',
                    status: 500,
                    contentType: 'text/plain',
                },
            });

            let caughtError: Error | undefined;
            try {
                await fetchCharacterList(BASE_API, 'Category:Down');
            } catch (e) {
                caughtError = e as Error;
            }
            expect(caughtError).to.exist;
            expect(caughtError!.message).to.include('HTTP 500');
        });
    });

    describe('fetchAllCharacters', () => {
        it('aggregates members across multiple API pages', async () => {
            const page1 = {
                continue: { gcmcontinue: 'token-2' },
                query: {
                    pages: {
                        '1': { pageid: 1, title: 'Alpha' },
                        '2': { pageid: 2, title: 'Beta' },
                    },
                },
            };
            const page2 = {
                query: {
                    pages: {
                        '3': { pageid: 3, title: 'Gamma' },
                    },
                },
            };

            restoreFetch = installMockFetch({
                [buildGeneratorUrl('Category:All')]: {
                    body: JSON.stringify(page1),
                    contentType: 'application/json',
                },
                [buildGeneratorUrl('Category:All', 'token-2')]: {
                    body: JSON.stringify(page2),
                    contentType: 'application/json',
                },
            });

            const members = await fetchAllCharacters(BASE_API, 'Category:All');

            expect(members).to.have.length(3);
            expect(members.map((m) => m.title)).to.include.members(['Alpha', 'Beta', 'Gamma']);
        });

        it('stops early when maxEntries is reached', async () => {
            const page1 = {
                continue: { gcmcontinue: 'more' },
                query: {
                    pages: {
                        '10': { pageid: 10, title: 'One' },
                        '11': { pageid: 11, title: 'Two' },
                        '12': { pageid: 12, title: 'Three' },
                    },
                },
            };

            restoreFetch = installMockFetch({
                [buildGeneratorUrl('Category:Paginated')]: {
                    body: JSON.stringify(page1),
                    contentType: 'application/json',
                },
            });

            const members = await fetchAllCharacters(BASE_API, 'Category:Paginated', 2);

            // Stops after the first batch (3 entries ≥ maxEntries=2), no second fetch attempted
            expect(members.length).to.be.at.least(2);
        });
    });
});
