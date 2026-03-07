import { expect } from "chai";
import { FandomScraper } from "../../index";
import {
    buildWikiSmokeCases,
    isLiveSmokeEnabled,
    LIVE_SMOKE_ENV_NAME,
    type IWikiSmokeCase
} from "./helpers/buildWikiSmokeCases";
import { assertLiveSchemaPageAccessible } from "./helpers/assertLiveSchemaPageAccessible";
import { assertValidCharacterList, assertValidMetadata } from "./helpers/wikiSmokeAssertions";

jest.setTimeout(300000);

const smokeCases = buildWikiSmokeCases();
const smokeIt = isLiveSmokeEnabled() ? it : it.skip;

describe("Live Fandom smoke tests", () => {
    it("stays disabled by default", () => {
        if (isLiveSmokeEnabled()) {
            expect(process.env[LIVE_SMOKE_ENV_NAME]).to.equal("1");
            return;
        }

        expect(process.env[LIVE_SMOKE_ENV_NAME]).to.not.equal("1");
    });

    smokeIt.each(smokeCases)("$label returns valid metadata", async ({ wiki, lang, schema }: IWikiSmokeCase) => {
        const scraper = new FandomScraper(wiki, { lang });
        const metadata = await scraper.getMetadata({ withCount: false });

        assertValidMetadata(metadata, {
            wiki,
            lang,
            schemaUrl: schema.url
        });
    });

    smokeIt.each(smokeCases)("$label still returns valid character pages", async ({ wiki, lang, schema, profile }: IWikiSmokeCase) => {
        await assertLiveSchemaPageAccessible(schema.url);

        const scraper = new FandomScraper(wiki, { lang });
        const characters = await scraper
            .findAll({ base64: false, recursive: true, withId: true })
            .limit(profile.sampleSize)
            .exec();

        assertValidCharacterList(characters, {
            schemaUrl: schema.url,
            minItems: 1,
            minParsedFields: profile.minParsedFields
        });
    });
});
