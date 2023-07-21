import { FandomScraper } from "fandomscraper";

export async function get({ params }: { params: { anime: string } }) {
    try {
        const anime = params.anime;
        const mie = new FandomScraper(anime, {lang: "en"}) ?? null;
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

};