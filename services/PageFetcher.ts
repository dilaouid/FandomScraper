import { JSDOM } from 'jsdom';

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
        const text = await fetch(url).then(async res => {
            const text = await res.text();
            return text;
        }).catch(err => {
            throw new Error(`Error while fetching ${url}: ${err}`);
        }) as unknown as string;

        return new JSDOM(text, { url: url, contentType: "text/html", referrer: url }).window.document;
    }
}

