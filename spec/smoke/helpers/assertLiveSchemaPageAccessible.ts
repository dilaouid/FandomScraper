import { PageFetcher } from "../../../services/PageFetcher";

const pageAccessProbeCache = new Map<string, Promise<void>>();

function buildProbeErrorMessage(url: string, status: number, bodySample: string): string {
    const compactSample = bodySample.replace(/\s+/g, " ").trim().slice(0, 160);

    return [
        `Live smoke probe failed for ${url}.`,
        `HTTP status: ${status}.`,
        `Response sample: ${compactSample || "<empty response>"}.`
    ].join(" ");
}

async function probeLiveSchemaPage(url: string): Promise<void> {
    try {
        const page = await new PageFetcher().fetchPage(url);
        const hasUsefulContent = page.querySelectorAll("a, .portable-infobox, table, #mw-content-text").length > 0;

        if (!hasUsefulContent) {
            const compactSample = page.body?.textContent?.replace(/\s+/g, " ").trim().slice(0, 160) || "<empty response>";
            throw new Error(`Transport probe returned an empty document for ${url}. Response sample: ${compactSample}.`);
        }
    } catch (error) {
        if (error instanceof Error) {
            const statusMatch = error.message.match(/HTTP (\d{3})/);
            if (statusMatch) {
                throw new Error(buildProbeErrorMessage(url, Number(statusMatch[1]), error.message));
            }
        }

        throw error;
    }
}

export async function assertLiveSchemaPageAccessible(url: string): Promise<void> {
    if (!pageAccessProbeCache.has(url)) {
        pageAccessProbeCache.set(url, probeLiveSchemaPage(url));
    }

    await pageAccessProbeCache.get(url);
}
