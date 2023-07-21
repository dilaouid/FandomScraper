import { FandomScraper } from "fandomscraper";

type TLanguages = 'fr' | 'en';

export async function get({ params }: { params: { anime: string, method: string, lang: TLanguages } }) {
    try {
        const anime = params.anime;
        const lang: TLanguages = params.lang;
        const fandomscraper = new FandomScraper(anime, {lang: lang}) ?? null;
        const metadatas = await fandomscraper.getMetadata();

        return new Response(JSON.stringify(metadatas), {
          status: 200
        });
    } catch (error) {
        console.log(error);
        return new Response(null, {
          status: 404,
          statusText: 'Not found'
        });
    }
}