import { FandomScraper } from "fandomscraper";

export async function get({ params }: { params: { anime: string, method: string, lang: 'fr' | 'en' } }) {
    try {
        const anime = params.anime;
        const lang: 'fr' | 'en' = params.lang;
        const mie = new FandomScraper(anime, {lang: lang}) ?? null;
        const metadatas = await mie.getMetadata({withCount: false});

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