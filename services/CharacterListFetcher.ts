import { formatForUrl } from '../func/parsing';
import { getWikiUrl } from '../utils/urlUtils';

const DEFAULT_MEDIAWIKI_LIMIT = 500;
const DEFAULT_USER_AGENT = 'FandomScraper/1.0';
const CATEGORY_PREFIX_REGEX = /^(Category|Catégorie):/i;

interface IMediaWikiPageImage {
    source?: string;
}

interface IMediaWikiPage {
    pageid?: number;
    title?: string;
    original?: IMediaWikiPageImage;
}

interface IMediaWikiQuery {
    pages?: Record<string, IMediaWikiPage>;
}

interface IMediaWikiResponse {
    query?: IMediaWikiQuery;
    continue?: Record<string, string | number>;
}

interface IResolvedCharacterListSource {
    wikiName: string;
    lang: string;
    categoryName: string;
    baseUrl: string;
    apiLimit: number;
    userAgent: string;
}

export interface IFetchedCharacterListItem extends IData {
    imageUrl?: string;
}

export interface IFetchedCharacterListResult {
    characters: IFetchedCharacterListItem[];
    continueToken?: Record<string, string | number>;
}

function normalizeBaseUrl(baseUrl: string): string {
    return baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
}

function normalizeCategoryName(categoryName: string): string {
    return categoryName.replace(CATEGORY_PREFIX_REGEX, '');
}

function getApiLanguagePath(lang: string): string {
    return lang && lang !== 'en' ? `/${lang}` : '';
}

function buildCharacterUrl(baseUrl: string, title: string): string {
    return new URL(formatForUrl(title), normalizeBaseUrl(baseUrl)).href;
}

function inferSourceFromSchemaUrl(schemaUrl: string): Partial<IResolvedCharacterListSource> | null {
    try {
        const url = new URL(schemaUrl);
        const segments = url.pathname.split('/').filter(Boolean);
        const wikiIndex = segments.indexOf('wiki');
        const categorySegment = segments[segments.length - 1];

        if (wikiIndex === -1 || !categorySegment || !CATEGORY_PREFIX_REGEX.test(decodeURIComponent(categorySegment))) {
            return null;
        }

        const lang = wikiIndex > 0 ? segments[wikiIndex - 1] : 'en';
        const categoryName = decodeURIComponent(categorySegment).replace(CATEGORY_PREFIX_REGEX, '');
        const wikiName = url.hostname.split('.')[0];
        const baseUrl = getWikiUrl(schemaUrl);

        return {
            wikiName,
            lang,
            categoryName,
            baseUrl
        };
    } catch {
        return null;
    }
}

export function resolveCharacterListSource(schema: ISchema): IResolvedCharacterListSource | null {
    const config = schema.characterList;

    // No explicit config or explicit legacy → always use the legacy HTML path
    if (!config || config.strategy === 'legacy') {
        return null;
    }

    // At this point, characterList is explicitly provided (strategy is 'mediawiki' or omitted with explicit object)
    const inferredSource = inferSourceFromSchemaUrl(schema.url);

    const wikiName = config.wikiName ?? inferredSource?.wikiName;
    const categoryName = config.categoryName ?? inferredSource?.categoryName;

    if (!wikiName || !categoryName) {
        return null;
    }

    const lang = config.lang ?? inferredSource?.lang ?? 'en';
    const baseUrl = normalizeBaseUrl(config.baseUrl ?? inferredSource?.baseUrl ?? getWikiUrl(schema.url));
    const apiLimit = Math.min(config.apiLimit ?? DEFAULT_MEDIAWIKI_LIMIT, DEFAULT_MEDIAWIKI_LIMIT);
    const userAgent = config.userAgent ?? DEFAULT_USER_AGENT;

    return {
        wikiName,
        lang,
        categoryName: normalizeCategoryName(categoryName),
        baseUrl,
        apiLimit,
        userAgent
    };
}

export async function fetchCharacterList(
    schema: ISchema,
    continueToken?: Record<string, string | number>
): Promise<IFetchedCharacterListResult> {
    const source = resolveCharacterListSource(schema);

    if (!source) {
        throw new Error('MediaWiki character list source is not configured for this schema');
    }

    const apiUrl = new URL(`https://${source.wikiName}.fandom.com${getApiLanguagePath(source.lang)}/api.php`);
    apiUrl.searchParams.set('action', 'query');
    apiUrl.searchParams.set('generator', 'categorymembers');
    apiUrl.searchParams.set('gcmtitle', `Category:${source.categoryName}`);
    apiUrl.searchParams.set('gcmlimit', String(source.apiLimit));
    apiUrl.searchParams.set('prop', 'pageimages');
    apiUrl.searchParams.set('piprop', 'original');
    apiUrl.searchParams.set('format', 'json');

    if (continueToken) {
        for (const [key, value] of Object.entries(continueToken)) {
            apiUrl.searchParams.set(key, String(value));
        }
    }

    const response = await fetch(apiUrl, {
        headers: {
            'User-Agent': source.userAgent,
            'Accept': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Error while fetching ${apiUrl.href}: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as IMediaWikiResponse;
    const pages = data.query?.pages ?? {};
    const characters = Object.values(pages)
        .filter((page): page is Required<Pick<IMediaWikiPage, 'pageid' | 'title'>> & IMediaWikiPage => {
            return typeof page.pageid === 'number' && typeof page.title === 'string' && page.title.trim().length > 0;
        })
        .map((page) => ({
            id: page.pageid,
            name: page.title,
            url: buildCharacterUrl(source.baseUrl, page.title),
            imageUrl: page.original?.source
        }));

    return {
        characters,
        continueToken: data.continue
    };
}
