import { JSDOM } from 'jsdom';

import {
    buildCategoryContinuationUrl,
    buildWikiPageUrl,
    getCategoryContinuationToken,
    getWikiApiUrl,
    getWikiTitleFromUrl,
    isFandomPageUrl
} from '../utils/urlUtils';

type IMediaWikiParseResponse = {
    parse?: {
        title?: string;
        pageid?: number;
        text?: {
            '*': string;
        };
    };
    error?: {
        code?: string;
        info?: string;
    };
};

type IMediaWikiCategoryMembersResponse = {
    continue?: {
        cmcontinue?: string;
    };
    query?: {
        categorymembers?: Array<{
            pageid: number;
            title: string;
        }>;
    };
    error?: {
        code?: string;
        info?: string;
    };
};

/**
 * Service responsible for fetching and managing web pages
 */
export class PageFetcher {
    /**
     * Fetch a page from a URL and return its document
     * @param url - The URL to fetch
     * @returns The document of the fetched page
     */
    async fetchPage(url: string): Promise<Document> {
        if (isFandomPageUrl(url)) {
            try {
                return await this.fetchFandomPage(url);
            } catch {
                return this.fetchHtmlPage(url);
            }
        }

        return this.fetchHtmlPage(url);
    }

    private async fetchFandomPage(url: string): Promise<Document> {
        const title = getWikiTitleFromUrl(url);
        if (title && this.isCategoryTitle(title)) {
            return this.fetchCategoryPage(url, title);
        }

        return this.fetchParsedWikiPage(url);
    }

    private async fetchParsedWikiPage(url: string): Promise<Document> {
        const apiUrl = this.buildParseApiUrl(url);
        const response = await this.fetchJson<IMediaWikiParseResponse>(apiUrl);
        const parsedHtml = response.parse?.text?.['*'];
        const title = response.parse?.title;

        if (!parsedHtml || !title) {
            const errorMessage = response.error?.info || `Unexpected parse API response for ${url}`;
            throw new Error(errorMessage);
        }

        const redirectUrl = this.extractRedirectUrl(parsedHtml, url);
        if (redirectUrl && redirectUrl !== url) {
            return this.fetchFandomPage(redirectUrl);
        }

        const canonicalUrl = buildWikiPageUrl(url, title);
        return this.createDocument(parsedHtml, {
            requestUrl: url,
            canonicalUrl,
            title,
            pageId: response.parse?.pageid ?? 0
        });
    }

    private async fetchCategoryPage(url: string, title: string): Promise<Document> {
        const apiUrl = new URL(getWikiApiUrl(url));
        apiUrl.searchParams.set('action', 'query');
        apiUrl.searchParams.set('list', 'categorymembers');
        apiUrl.searchParams.set('cmtitle', title);
        apiUrl.searchParams.set('cmnamespace', '0');
        apiUrl.searchParams.set('cmlimit', '500');
        apiUrl.searchParams.set('format', 'json');

        const continuationToken = getCategoryContinuationToken(url);
        if (continuationToken) {
            apiUrl.searchParams.set('cmcontinue', continuationToken);
        }

        const response = await this.fetchJson<IMediaWikiCategoryMembersResponse>(apiUrl.href);
        const members = response.query?.categorymembers ?? [];
        const nextToken = response.continue?.cmcontinue;

        if (!response.query && response.error) {
            throw new Error(response.error.info || `Unexpected categorymembers API response for ${url}`);
        }

        const categoryHtml = this.buildCategoryMembersHtml(url, members, nextToken);
        return this.createDocument(categoryHtml, {
            requestUrl: url,
            canonicalUrl: buildWikiPageUrl(url, title),
            title
        });
    }

    private async fetchHtmlPage(url: string): Promise<Document> {
        const response = await fetch(url).catch((err) => {
            throw new Error(`Error while fetching ${url}: ${err}`);
        });
        const text = await response.text();

        if (!response.ok) {
            throw new Error(`Error while fetching ${url}: HTTP ${response.status}`);
        }

        if (this.isCloudflareChallenge(text)) {
            throw new Error(`Cloudflare blocked the request for ${url}`);
        }

        return this.createDocument(text, {
            requestUrl: url,
            canonicalUrl: url
        });
    }

    private async fetchJson<T>(url: string): Promise<T> {
        const response = await fetch(url).catch((err) => {
            throw new Error(`Error while fetching ${url}: ${err}`);
        });
        const body = await response.text();

        if (!response.ok) {
            throw new Error(`Error while fetching ${url}: HTTP ${response.status}`);
        }

        try {
            return JSON.parse(body) as T;
        } catch (error) {
            throw new Error(`Error while parsing JSON from ${url}: ${error}`);
        }
    }

    private buildParseApiUrl(url: string): string {
        const apiUrl = new URL(getWikiApiUrl(url));
        const parsedUrl = new URL(url);
        const pageId = parsedUrl.searchParams.get('curid');

        apiUrl.searchParams.set('action', 'parse');
        apiUrl.searchParams.set('prop', 'text');
        apiUrl.searchParams.set('format', 'json');

        if (pageId) {
            apiUrl.searchParams.set('pageid', pageId);
            return apiUrl.href;
        }

        const title = getWikiTitleFromUrl(url);
        if (!title) {
            throw new Error(`Cannot extract a wiki title from ${url}`);
        }

        apiUrl.searchParams.set('page', title);
        return apiUrl.href;
    }

    private buildCategoryMembersHtml(
        url: string,
        members: Array<{ pageid: number; title: string }>,
        nextToken?: string
    ): string {
        const items = members
            .map(({ title: pageTitle }) => {
                const href = buildWikiPageUrl(url, pageTitle);
                return `<a class="category-page__member-link" href="${href}">${pageTitle}</a>`;
            })
            .join('');

        const nextLink = nextToken
            ? `<a class="category-page__pagination-next" href="${buildCategoryContinuationUrl(url, nextToken)}">Next</a>`
            : '';

        return `<!doctype html><html><head></head><body><div id="mw-content-text">${items}${nextLink}</div></body></html>`;
    }

    private createDocument(
        html: string,
        options: { requestUrl: string; canonicalUrl: string; title?: string; pageId?: number }
    ): Document {
        const document = new JSDOM(html, {
            url: options.canonicalUrl,
            contentType: 'text/html',
            referrer: options.requestUrl
        }).window.document;

        if (!document.querySelector('link[rel="canonical"]')) {
            const canonicalElement = document.createElement('link');
            canonicalElement.setAttribute('rel', 'canonical');
            canonicalElement.setAttribute('href', options.canonicalUrl);
            document.head.appendChild(canonicalElement);
        }

        if (options.pageId && !document.querySelector('script[data-fandomscraper-pageid="true"]')) {
            const pageIdScript = document.createElement('script');
            pageIdScript.type = 'application/json';
            pageIdScript.dataset.fandomscraperPageid = 'true';
            pageIdScript.textContent = `{"pageId":${options.pageId}}`;
            document.head.appendChild(pageIdScript);
        }

        if (options.title && !document.querySelector('.mw-page-title-main')) {
            const titleElement = document.createElement('h1');
            titleElement.className = 'mw-page-title-main';
            titleElement.textContent = options.title;
            document.body.prepend(titleElement);
        }

        return document;
    }

    private isCategoryTitle(title: string): boolean {
        return /^(Category|Catégorie):/i.test(title);
    }

    private isCloudflareChallenge(html: string): boolean {
        return /Just a moment/i.test(html) || /challenge-platform/i.test(html) || /cf-browser-verification/i.test(html);
    }

    private extractRedirectUrl(html: string, fallbackUrl: string): string | null {
        const document = new JSDOM(`<!doctype html><html><body>${html}</body></html>`).window.document;
        const redirectHref = document.querySelector('.redirectText a[href]')?.getAttribute('href');

        if (!redirectHref) {
            return null;
        }

        return new URL(redirectHref, fallbackUrl).href;
    }
}

