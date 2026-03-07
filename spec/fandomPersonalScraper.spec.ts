import { expect } from "chai";
import { FandomPersonalScraper } from "../index";
import { buildPersonalScraperRoutes } from "./helpers/fandomFixtures";
import { installMockFetch } from "./helpers/mockFetch";

jest.setTimeout(10000);

describe("FandomPersonalScraper - deterministic custom pageFormat", () => {
    let restoreFetch: (() => void) | undefined;

    const genshinSchema: ISchema = {
        url: "https://genshin-impact.fandom.com/wiki/Character/List",
        pageFormat: {
            selector: "#mw-content-text table tbody tr td:nth-child(2) a",
            ignore: ["Category:", "File:", "Template:"]
        },
        dataSource: {
            name: "name",
            images: {
                identifier: ".pi-image-thumbnail",
                get: function (page: Document) {
                    return page.querySelectorAll(this.identifier);
                }
            }
        }
    };

    beforeAll(() => {
        restoreFetch = installMockFetch(buildPersonalScraperRoutes());
    });

    afterAll(() => {
        restoreFetch?.();
    });

    describe("Genshin Impact with custom selector", () => {
        let scraper: FandomPersonalScraper;
        let characterList: any[];

        beforeAll(async () => {
            scraper = new FandomPersonalScraper(genshinSchema);
            characterList = await scraper
                .findAll({ base64: false, recursive: false, withId: true })
                .limit(50)
                .offset(0)
                .exec();
        });

        it("returns a stable filtered list of characters", () => {
            expect(Array.isArray(characterList)).to.equal(true);
            expect(characterList.length).to.equal(13);
        });

        it("keeps each character entry well-formed", () => {
            for (const character of characterList) {
                expect(character.name).to.be.a("string");
                expect(character.name.trim().length).to.be.greaterThan(0);
                expect(character.url).to.be.a("string");
                expect(character.url).to.include("genshin-impact.fandom.com/wiki/");
                expect(character.id).to.be.a("number");
                expect(character.id).to.be.greaterThan(0);
            }
        });

        it("includes expected known characters from the fixture", () => {
            const names = characterList.map((character) => String(character.name).toLowerCase());
            expect(names).to.include("amber");
            expect(names).to.include("lisa");
            expect(names).to.include("kaeya");
        });

        it("keeps character names unique", () => {
            const names = characterList.map((character) => character.name);
            expect(new Set(names).size).to.equal(names.length);
        });

        it("respects the limit parameter", async () => {
            const limitedList = await scraper
                .findAll({ base64: false, recursive: false, withId: true })
                .limit(5)
                .exec();

            expect(limitedList.length).to.equal(5);
            expect(limitedList.map((character: any) => character.name)).to.deep.equal([
                "Amber",
                "Lisa",
                "Kaeya",
                "Diluc",
                "Jean"
            ]);
        });

        it("respects the offset parameter", async () => {
            const offsetList = await scraper
                .findAll({ base64: false, recursive: false, withId: true })
                .limit(5)
                .offset(5)
                .exec();

            expect(offsetList.length).to.equal(5);
            expect(offsetList[0].name).to.equal("Mona");
            expect(offsetList[0].name).to.not.equal(characterList[0].name);
        });
    });

    describe("Custom pageFormat with ignore list", () => {
        const schemaWithIgnore: ISchema = {
            url: "https://genshin-impact.fandom.com/wiki/Character/List",
            pageFormat: {
                selector: "#mw-content-text table tbody tr td:nth-child(2) a",
                ignore: ["Character", "List", "Category:"]
            },
            dataSource: {
                images: {
                    identifier: ".pi-image-thumbnail",
                    get: function (page: Document) {
                        return page.querySelectorAll(this.identifier);
                    }
                }
            }
        };

        it("filters ignored strings from the result set", async () => {
            const scraper = new FandomPersonalScraper(schemaWithIgnore);
            const list = await scraper
                .findAll({ base64: false, recursive: false, withId: true })
                .limit(50)
                .exec();

            const names = list.map((character: any) => character.name);
            expect(names).to.not.include("Character List");
            expect(names.some((name: string) => name.includes("Category:"))).to.equal(false);
        });
    });

    describe("Schema validation", () => {
        it("throws if schema is missing url", () => {
            expect(() => {
                new FandomPersonalScraper({
                    pageFormat: { selector: "a" },
                    dataSource: {}
                } as any);
            }).to.throw("The schema you provided is not valid");
        });

        it("throws if schema is missing pageFormat", () => {
            expect(() => {
                new FandomPersonalScraper({
                    url: "https://test.fandom.com",
                    dataSource: {}
                } as any);
            }).to.throw("The schema you provided is not valid");
        });

        it("throws if schema is missing dataSource", () => {
            expect(() => {
                new FandomPersonalScraper({
                    url: "https://test.fandom.com",
                    pageFormat: { selector: "a" }
                } as any);
            }).to.throw("The schema you provided is not valid");
        });

        it("throws if images config is missing get function", () => {
            expect(() => {
                new FandomPersonalScraper({
                    url: "https://test.fandom.com",
                    pageFormat: { selector: "a" },
                    dataSource: {
                        images: {
                            identifier: ".test"
                        } as any
                    }
                });
            }).to.throw("The schema you provided is not valid");
        });

        it("throws if images config is missing identifier", () => {
            expect(() => {
                new FandomPersonalScraper({
                    url: "https://test.fandom.com",
                    pageFormat: { selector: "a" },
                    dataSource: {
                        images: {
                            get: () => []
                        } as any
                    }
                });
            }).to.throw("The schema you provided is not valid");
        });
    });

    describe("Regression tests", () => {
        const testSchema: ISchema = {
            url: "https://genshin-impact.fandom.com/wiki/Character/List",
            pageFormat: {
                selector: "#mw-content-text table tbody tr td:nth-child(2) a"
            },
            dataSource: {
                images: {
                    identifier: ".pi-image-thumbnail",
                    get: function (page: Document) {
                        return page.querySelectorAll(this.identifier);
                    }
                }
            }
        };

        it("keeps the custom schema accessible through getSchema", () => {
            const scraper = new FandomPersonalScraper(testSchema);
            const result = scraper.getSchema();

            expect(result).to.have.property("url");
            expect(result).to.have.property("pageFormat");
            expect(result).to.have.property("dataSource");
        });

        it("handles empty results gracefully", async () => {
            const emptySchema: ISchema = {
                url: "https://genshin-impact.fandom.com/wiki/NonExistentPage",
                pageFormat: {
                    selector: ".nonexistent-selector"
                },
                dataSource: {}
            };

            const scraper = new FandomPersonalScraper(emptySchema);
            const result = await scraper
                .findAll({ base64: false, recursive: false, withId: true })
                .limit(10)
                .exec();

            expect(Array.isArray(result)).to.equal(true);
            expect(result.length).to.equal(0);
        });

        it("returns consistent results across repeated calls", async () => {
            const scraper = new FandomPersonalScraper(testSchema);

            const firstCall = await scraper
                .findAll({ base64: false, recursive: false, withId: true })
                .limit(10)
                .exec();

            const secondCall = await scraper
                .findAll({ base64: false, recursive: false, withId: true })
                .limit(10)
                .exec();

            expect(firstCall.length).to.equal(secondCall.length);
            expect(firstCall.map((character: any) => character.name)).to.deep.equal(
                secondCall.map((character: any) => character.name)
            );
        });

        it("does not mutate the original schema object", async () => {
            const originalSchema = JSON.parse(JSON.stringify(testSchema));
            const scraper = new FandomPersonalScraper(testSchema);

            await scraper
                .findAll({ base64: false, recursive: false, withId: true })
                .limit(5)
                .exec();

            expect(testSchema.url).to.equal(originalSchema.url);
            expect(JSON.stringify(testSchema.pageFormat)).to.equal(JSON.stringify(originalSchema.pageFormat));
            expect(JSON.stringify(testSchema.dataSource)).to.equal(JSON.stringify(originalSchema.dataSource));
        });
    });
});

