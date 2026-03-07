import { expect } from "chai";
import { FandomScraper } from "../index";
import { buildFandomScraperRoutes } from "./helpers/fandomFixtures";
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