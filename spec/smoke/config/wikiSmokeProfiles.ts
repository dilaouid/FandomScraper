import type { TAvailableWikis } from "../../../index";

export type TWikiLanguage = "en" | "fr";

export interface IWikiSmokeProfile {
    sampleSize: number;
    minParsedFields: number;
    languages?: TWikiLanguage[];
    skip?: boolean;
}

export const defaultWikiSmokeProfile: IWikiSmokeProfile = {
    sampleSize: 2,
    minParsedFields: 1
};

export const wikiSmokeProfiles: Partial<Record<TAvailableWikis, Partial<IWikiSmokeProfile>>> = {
    "berserk": {
        sampleSize: 1
    }
};
