import type { TAvailableWikis } from "../../../index";
import { availableWikis } from "../../../types/dynamic.types";
import { Schemas } from "../../../wikia";
import {
    defaultWikiSmokeProfile,
    type IWikiSmokeProfile,
    type TWikiLanguage,
    wikiSmokeProfiles
} from "../config/wikiSmokeProfiles";

export const LIVE_SMOKE_ENV_NAME = "LIVE_FANDOM_SMOKE";

export interface IWikiSmokeCase {
    wiki: TAvailableWikis;
    lang: TWikiLanguage;
    label: string;
    schema: ISchema;
    profile: IWikiSmokeProfile;
}

function getAvailableLanguages(wiki: TAvailableWikis): TWikiLanguage[] {
    return Object.keys(Schemas[wiki]) as TWikiLanguage[];
}

function buildProfile(wiki: TAvailableWikis): IWikiSmokeProfile {
    return {
        ...defaultWikiSmokeProfile,
        ...wikiSmokeProfiles[wiki]
    };
}

export function isLiveSmokeEnabled(): boolean {
    return process.env[LIVE_SMOKE_ENV_NAME] === "1";
}

export function buildWikiSmokeCases(): IWikiSmokeCase[] {
    return availableWikis.flatMap((wiki) => {
        const profile = buildProfile(wiki);
        if (profile.skip) {
            return [];
        }

        const languages = profile.languages ?? getAvailableLanguages(wiki);

        return languages
            .filter((lang) => getAvailableLanguages(wiki).includes(lang))
            .map((lang) => ({
                wiki,
                lang,
                label: `${wiki} (${lang})`,
                schema: Schemas[wiki][lang],
                profile
            }));
    });
}
