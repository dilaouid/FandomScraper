import { expect } from "chai";
import { FandomScraper } from "../index";
import { buildFandomScraperRoutes, buildKimetsuFRMediaWikiRoutes } from "./helpers/fandomFixtures";
import { installMockFetch } from "./helpers/mockFetch";

jest.setTimeout(10000);

describe("FandomScraper with deterministic fixtures", () => {
    let restoreFetch: (() => void) | undefined;

    beforeAll(() => {
        restoreFetch = installMockFetch(buildFandomScraperRoutes());
    });

    afterAll(() => {
        restoreFetch?.();
    });

    describe("Demon Slayer", () => {
        describe("metadata", () => {
            let metadatas: any;

            beforeAll(async () => {
                const scraper = new FandomScraper("kimetsu-no-yaiba", { lang: "en" });
                metadatas = await scraper.getMetadata();
            });

            it("returns stable metadata for the configured wiki", () => {
                expect(metadatas).to.be.an("object");
                expect(metadatas.name).to.equal("kimetsu-no-yaiba");
                expect(metadatas.language).to.equal("en");
                expect(metadatas.attributes).to.be.an("array");
                expect(metadatas.attributes).to.include("kanji");
                expect(metadatas.count).to.equal(6);
            });
        });

        describe("findAll", () => {
            let all: any[];

            beforeAll(async () => {
                const scraper = new FandomScraper("kimetsu-no-yaiba", { lang: "en" });
                all = await scraper
                    .findAll({ base64: false, recursive: true, withId: true })
                    .attr("kanji romaji status species images occupations affiliation height weight relatives age")
                    .limit(5)
                    .offset(0)
                    .attrToArray("relatives age")
                    .exec();
            });

            it("returns the requested number of characters", () => {
                expect(all).to.be.an("array");
                expect(all.length).to.equal(5);
            });

            it("keeps parsing deterministic for the first fixture entry", () => {
                expect(all[0].id).to.equal(99);
                expect(all[0].name).to.equal("Kagaya Ubuyashiki");
                expect(all[0].data.kanji).to.equal("産屋敷 耀哉");
                expect(all[0].data.romaji).to.equal("Ubuyashiki Kagaya");
            });

            it("converts configured fields to arrays", () => {
                expect(all[0].data.relatives).to.deep.equal(["Amane Ubuyashiki", "Kiriya Ubuyashiki"]);
                expect(all[0].data.age).to.deep.equal(["23"]);
            });
        });

        describe("findByName", () => {
            let kagaya: any;
            let notFound: any;

            beforeAll(async () => {
                const scraper = new FandomScraper("kimetsu-no-yaiba", { lang: "en" });
                kagaya = await scraper
                    .findByName("Kagaya Ubuyashiki", { base64: true, withId: true })
                    .attr("kanji romaji status species images occupations affiliation height weight relatives age")
                    .attrToArray("relatives age")
                    .exec();

                notFound = await scraper
                    .findByName("Toshio Ozaki", { base64: false, withId: true })
                    .exec();
            });

            it("finds a character by name and keeps typed fields stable", () => {
                expect(kagaya.id).to.equal(99);
                expect(kagaya.data.kanji).to.equal("産屋敷 耀哉");
                expect(kagaya.data.romaji).to.equal("Ubuyashiki Kagaya");
                expect(kagaya.data.relatives).to.deep.equal(["Amane Ubuyashiki", "Kiriya Ubuyashiki"]);
                expect(kagaya.data.age).to.deep.equal(["23"]);
            });

            it("returns deterministic base64 image content", () => {
                expect(kagaya.data.images).to.be.an("array");
                expect(kagaya.data.images[0]).to.be.a("string");
                expect(kagaya.data.images[0].length).to.be.greaterThan(0);
                expect(/^[A-Za-z0-9+/]*={0,2}$/.test(kagaya.data.images[0])).to.equal(true);
            });

            it("returns an empty array when the character does not exist", () => {
                expect(notFound).to.be.an("array");
                expect(notFound.length).to.equal(0);
            });
        });

        describe("findById", () => {
            let kamadoId: any;
            let notFound: any;

            beforeAll(async () => {
                const scraper = new FandomScraper("kimetsu-no-yaiba", { lang: "en" });
                kamadoId = await scraper
                    .findById(132, { base64: true })
                    .attr("kanji romaji status species images occupations affiliation height weight relatives age")
                    .attrToArray("relatives age")
                    .exec();

                notFound = await scraper
                    .findById(1, { base64: false })
                    .exec();
            });

            it("finds a character by id with deterministic fixture data", () => {
                expect(kamadoId.data.kanji).to.equal("竈門 炭治郎");
                expect(kamadoId.data.romaji).to.equal("Kamado Tanjirō");
                expect(kamadoId.data.relatives).to.deep.equal(["Nezuko Kamado", "Hanako Kamado"]);
                expect(kamadoId.data.age).to.deep.equal(["15"]);
            });

            it("returns base64 image data for image-enabled queries", () => {
                expect(kamadoId.data.images).to.be.an("array");
                expect(kamadoId.data.images[0]).to.be.a("string");
                expect(/^[A-Za-z0-9+/]*={0,2}$/.test(kamadoId.data.images[0])).to.equal(true);
            });

            it("returns an empty array for invalid ids", () => {
                expect(notFound).to.be.an("array");
                expect(notFound.length).to.equal(0);
            });
        });
    });

    describe("One Piece", () => {
        describe("metadata", () => {
            let metadatas: any;

            beforeAll(async () => {
                const scraper = new FandomScraper("one-piece", { lang: "en" });
                metadatas = await scraper.getMetadata();
            });

            it("returns stable metadata for the configured wiki", () => {
                expect(metadatas).to.be.an("object");
                expect(metadatas.name).to.equal("one-piece");
                expect(metadatas.language).to.equal("en");
                expect(metadatas.attributes).to.include("age");
                expect(metadatas.count).to.equal(3);
            });
        });

        describe("findByName", () => {
            let zoro: any;
            let notFound: any;

            beforeAll(async () => {
                const scraper = new FandomScraper("one-piece", { lang: "en" });
                zoro = await scraper
                    .findByName("zoro", { base64: true, withId: true })
                    .attr("kanji romaji status images occupations affiliation height age")
                    .attrToArray("affiliation age height")
                    .exec();

                notFound = await scraper
                    .findByName("kamado tanjiro", { base64: false, withId: true })
                    .exec();
            });

            it("finds a character by name using fixture-backed content", () => {
                expect(zoro.id).to.equal(501);
                expect(zoro.data.kanji).to.equal("ロロノア・ゾロ");
                expect(zoro.data.romaji).to.equal("Roronoa Zoro");
                expect(zoro.data.age).to.deep.equal(["21"]);
            });

            it("returns base64 images without live network access", () => {
                expect(zoro.data.images).to.be.an("array");
                expect(zoro.data.images[0]).to.be.a("string");
                expect(/^[A-Za-z0-9+/]*={0,2}$/.test(zoro.data.images[0])).to.equal(true);
            });

            it("returns an empty array when no fixture matches", () => {
                expect(notFound).to.be.an("array");
                expect(notFound.length).to.equal(0);
            });
        });

        describe("findById", () => {
            let robinId: any;
            let notFound: any;

            beforeAll(async () => {
                const scraper = new FandomScraper("one-piece", { lang: "en" });
                robinId = await scraper
                    .findById(1558, { base64: false })
                    .attr("kanji romaji status images occupations affiliation height age")
                    .attrToArray("affiliation age")
                    .exec();

                notFound = await scraper
                    .findById(96, { base64: false })
                    .exec();
            });

            it("finds a character by id with deterministic values", () => {
                expect(robinId.data.kanji).to.equal("ニコ・ロビン");
                expect(robinId.data.romaji).to.equal("Niko Robin");
                expect(robinId.data.affiliation).to.deep.equal(["Straw Hat Pirates", "Revolutionary Army"]);
                expect(robinId.data.age).to.deep.equal(["30"]);
            });

            it("returns an empty array for invalid ids", () => {
                expect(notFound).to.be.an("array");
                expect(notFound.length).to.equal(0);
            });
        });
    });
});

describe("FandomScraper — MediaWiki generator API path", () => {
    let restoreFetch: (() => void) | undefined;

    afterEach(() => {
        restoreFetch?.();
        restoreFetch = undefined;
    });

    describe("findAll (non-recursive, withId)", () => {
        let all: any[];

        beforeAll(async () => {
            restoreFetch = installMockFetch(buildKimetsuFRMediaWikiRoutes(false));
            const scraper = new FandomScraper("kimetsu-no-yaiba", { lang: "fr" });
            all = await scraper
                .findAll({ base64: false, recursive: false, withId: true })
                .exec();
        });

        it("returns all characters from the category API without fetching individual pages", () => {
            expect(all).to.be.an("array");
            expect(all.length).to.equal(3);
        });

        it("populates id directly from the API pageid", () => {
            const tanjiro = all.find((c: any) => c.name === "Tanjiro Kamado");
            expect(tanjiro).to.exist;
            expect(tanjiro.id).to.equal(200);
        });

        it("populates profileImage when the API includes original.source", () => {
            const tanjiro = all.find((c: any) => c.name === "Tanjiro Kamado");
            expect(tanjiro.profileImage).to.equal("https://images.test/tanjiro-fr.jpg");

            const inosuke = all.find((c: any) => c.name === "Inosuke Hashibira");
            expect(inosuke.profileImage).to.equal("https://images.test/inosuke-fr.jpg");
        });

        it("sets profileImage to undefined when the API omits original", () => {
            const nezuko = all.find((c: any) => c.name === "Nezuko Kamado");
            expect(nezuko.profileImage).to.be.undefined;
        });

        it("does not set data when recursive is false", () => {
            all.forEach((c: any) => {
                expect(c.data).to.be.undefined;
            });
        });
    });

    describe("count", () => {
        it("counts characters via the generator API", async () => {
            restoreFetch = installMockFetch(buildKimetsuFRMediaWikiRoutes(false));
            const scraper = new FandomScraper("kimetsu-no-yaiba", { lang: "fr" });
            const total = await scraper.count();
            expect(total).to.equal(3);
        });
    });

    describe("findAll — offset (non-recursive)", () => {
        it("skips the first offset valid entries", async () => {
            restoreFetch = installMockFetch(buildKimetsuFRMediaWikiRoutes(false));
            const scraper = new FandomScraper("kimetsu-no-yaiba", { lang: "fr" });
            const result = await scraper
                .findAll({ base64: false, recursive: false, withId: true })
                .offset(1)
                .limit(2)
                .exec();

            expect(result).to.be.an("array");
            expect(result.length).to.equal(2);
            const names = result.map((c: any) => c.name);
            expect(names).to.not.include("Tanjiro Kamado");
            expect(names).to.include("Nezuko Kamado");
            expect(names).to.include("Inosuke Hashibira");
        });

        it("returns fewer results when offset+limit exceeds the category size", async () => {
            restoreFetch = installMockFetch(buildKimetsuFRMediaWikiRoutes(false));
            const scraper = new FandomScraper("kimetsu-no-yaiba", { lang: "fr" });
            const result = await scraper
                .findAll({ base64: false, recursive: false, withId: true })
                .offset(2)
                .limit(10)
                .exec();

            expect(result).to.be.an("array");
            expect(result.length).to.equal(1);
            expect(result[0].name).to.equal("Inosuke Hashibira");
        });
    });

    describe("findAll — ignore (non-recursive)", () => {
        it("filters entries whose title contains an ignored substring", async () => {
            restoreFetch = installMockFetch(buildKimetsuFRMediaWikiRoutes(false));
            const scraper = new FandomScraper("kimetsu-no-yaiba", { lang: "fr" });
            const result = await scraper
                .findAll({ base64: false, recursive: false, withId: false })
                .ignore(["Nezuko"])
                .limit(10)
                .exec();

            expect(result).to.be.an("array");
            expect(result.length).to.equal(2);
            const names = result.map((c: any) => c.name);
            expect(names).to.not.include("Nezuko Kamado");
            expect(names).to.include("Tanjiro Kamado");
            expect(names).to.include("Inosuke Hashibira");
        });

        it("ignore is applied before offset — ignored entries do not consume an offset slot", async () => {
            // Ignore Tanjiro (first valid entry); then offset=1 skips Nezuko → only Inosuke
            restoreFetch = installMockFetch(buildKimetsuFRMediaWikiRoutes(false));
            const scraper = new FandomScraper("kimetsu-no-yaiba", { lang: "fr" });
            const result = await scraper
                .findAll({ base64: false, recursive: false, withId: false })
                .ignore(["Tanjiro"])
                .offset(1)
                .limit(5)
                .exec();

            expect(result).to.be.an("array");
            expect(result.length).to.equal(1);
            expect(result[0].name).to.equal("Inosuke Hashibira");
        });
    });

    describe("findAll — offset + recursive (parallel fetches)", () => {
        let result: any[];

        beforeAll(async () => {
            restoreFetch = installMockFetch(buildKimetsuFRMediaWikiRoutes(true));
            const scraper = new FandomScraper("kimetsu-no-yaiba", { lang: "fr" });
            result = await scraper
                .findAll({ base64: false, recursive: true, withId: true })
                .offset(1)
                .limit(2)
                .attr("kanji age")
                .exec();
        });

        it("fetches only the windowed entries even in recursive mode", () => {
            expect(result).to.be.an("array");
            expect(result.length).to.equal(2);
            const names = result.map((c: any) => c.name);
            expect(names).to.not.include("Tanjiro Kamado");
            expect(names).to.include("Nezuko Kamado");
            expect(names).to.include("Inosuke Hashibira");
        });

        it("populates character data for each entry in the window", () => {
            const nezuko = result.find((c: any) => c.name === "Nezuko Kamado");
            expect(nezuko.data).to.exist;
            expect(nezuko.data.kanji).to.equal("竈門 禰豆子");
            expect(nezuko.data.age).to.equal("14");
        });

        it("preserves id and profileImage alongside data", () => {
            const inosuke = result.find((c: any) => c.name === "Inosuke Hashibira");
            expect(inosuke.id).to.equal(202);
            expect(inosuke.profileImage).to.equal("https://images.test/inosuke-fr.jpg");
        });
    });

    describe("findAll (recursive)", () => {
        let all: any[];

        beforeAll(async () => {
            restoreFetch = installMockFetch(buildKimetsuFRMediaWikiRoutes(true));
            const scraper = new FandomScraper("kimetsu-no-yaiba", { lang: "fr" });
            all = await scraper
                .findAll({ base64: false, recursive: true, withId: true })
                .attr("kanji romaji age")
                .exec();
        });

        it("returns characters with parsed data when recursive is true", () => {
            expect(all).to.be.an("array");
            expect(all.length).to.equal(3);
            const tanjiro = all.find((c: any) => c.name === "Tanjiro Kamado");
            expect(tanjiro.data).to.exist;
            expect(tanjiro.data.kanji).to.equal("竈門 炭治郎");
            expect(tanjiro.data.age).to.equal("15");
        });

        it("still exposes id and profileImage alongside data", () => {
            const tanjiro = all.find((c: any) => c.name === "Tanjiro Kamado");
            expect(tanjiro.id).to.equal(200);
            expect(tanjiro.profileImage).to.equal("https://images.test/tanjiro-fr.jpg");
        });
    });
});