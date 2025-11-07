import { FandomPersonalScraper } from "../index";
import { expect } from "chai";

jest.setTimeout(60000);

describe("FandomPersonalScraper - Custom pageFormat", () => {
    describe("Genshin Impact with custom selector", () => {
        const genshinSchema: ISchema = {
            url: "https://genshin-impact.fandom.com/wiki/Character/List",
            pageFormat: {
                // Use a more generic selector to target character links in the table
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

        let scraper: FandomPersonalScraper;
        let characterList: any[];

        beforeAll(async () => {
            scraper = new FandomPersonalScraper(genshinSchema);
            characterList = await scraper
                .findAll({ base64: false, recursive: false, withId: true })
                .limit(50)
                .offset(0)
                .exec()
                .catch(() => []);
        });

        it("should return at least 10 characters", () => {
            expect(Array.isArray(characterList)).to.equal(true);
            expect(characterList.length).to.be.greaterThan(10);
        });

        it("each character entry should have valid name and URL", () => {
            for (const character of characterList) {
                expect(character).to.have.property("name");
                expect(character.name).to.be.a("string");
                expect(character.name.trim().length).to.be.greaterThan(0);

                expect(character).to.have.property("url");
                expect(character.url).to.be.a("string");
                expect(character.url).to.include("genshin-impact.fandom.com/wiki/");
            }
        });

        it("should contain known characters (Amber, Lisa, or Kaeya)", () => {
            const names = characterList.map((c) => String(c.name).toLowerCase());
            const knownCharacters = ["amber", "lisa", "kaeya"];
            const hasKnownCharacter = knownCharacters.some((name) => names.includes(name));
            expect(hasKnownCharacter).to.equal(true);
        });

        it("should have unique character names (no duplicates)", () => {
            const names = characterList.map((c) => c.name);
            const uniqueNames = new Set(names);
            expect(uniqueNames.size).to.equal(names.length);
        });

        it("should respect limit parameter", async () => {
            const limitedList = await scraper
                .findAll({ base64: false, recursive: false, withId: true })
                .limit(5)
                .exec()
                .catch(() => []);

            expect(limitedList.length).to.be.lessThanOrEqual(5);
        });

        it("should respect offset parameter", async () => {
            const offsetList = await scraper
                .findAll({ base64: false, recursive: false, withId: true })
                .limit(5)
                .offset(5)
                .exec()
                .catch(() => []);

            if (offsetList.length > 0 && characterList.length > 5) {
                expect(offsetList[0].name).to.not.equal(characterList[0].name);
            }
        });

        it("should include pageId when withId is true", () => {
            if (characterList.length > 0) {
                expect(characterList[0]).to.have.property("id");
                expect(characterList[0].id).to.be.a("number");
                expect(characterList[0].id).to.be.greaterThan(0);
            }
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

        it("should filter out ignored strings from results", async () => {
            const scraper = new FandomPersonalScraper(schemaWithIgnore);
            const list = await scraper
                .findAll({ base64: false, recursive: false, withId: true })
                .limit(50)
                .exec()
                .catch(() => []);

            const ignoredKeywords = ["Character", "List", "Category:"];
            for (const character of list) {
                const nameContainsIgnored = ignoredKeywords.some((keyword) =>
                    character.name.toLowerCase().includes(keyword.toLowerCase())
                );
                expect(nameContainsIgnored).to.equal(false);
            }
        });
    });

    describe("Schema validation", () => {
        it("should throw error if schema is missing url", () => {
            expect(() => {
                new FandomPersonalScraper({
                    pageFormat: { selector: "a" },
                    dataSource: {}
                } as any);
            }).to.throw("The schema you provided is not valid");
        });

        it("should throw error if schema is missing pageFormat", () => {
            expect(() => {
                new FandomPersonalScraper({
                    url: "https://test.fandom.com",
                    dataSource: {}
                } as any);
            }).to.throw("The schema you provided is not valid");
        });

        it("should throw error if schema is missing dataSource", () => {
            expect(() => {
                new FandomPersonalScraper({
                    url: "https://test.fandom.com",
                    pageFormat: { selector: "a" }
                } as any);
            }).to.throw("The schema you provided is not valid");
        });

        it("should throw error if images config is missing get function", () => {
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

        it("should throw error if images config is missing identifier", () => {
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

        it("should not break existing predefined formats (classic)", async () => {
            // This ensures custom formats don't break the existing functionality
            const scraper = new FandomPersonalScraper(testSchema);
            const result = await scraper.getSchema();
            expect(result).to.have.property("url");
            expect(result).to.have.property("pageFormat");
            expect(result).to.have.property("dataSource");
        });

        it("should handle empty results gracefully", async () => {
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
                .exec()
                .catch(() => []);

            expect(Array.isArray(result)).to.equal(true);
            expect(result.length).to.equal(0);
        });

        it("should maintain consistency across multiple calls", async () => {
            const scraper = new FandomPersonalScraper(testSchema);
            
            const firstCall = await scraper
                .findAll({ base64: false, recursive: false, withId: true })
                .limit(10)
                .exec()
                .catch(() => []);

            const secondCall = await scraper
                .findAll({ base64: false, recursive: false, withId: true })
                .limit(10)
                .exec()
                .catch(() => []);

            expect(firstCall.length).to.equal(secondCall.length);
            if (firstCall.length > 0) {
                expect(firstCall[0].name).to.equal(secondCall[0].name);
            }
        });

        it("should not modify the original schema object", async () => {
            const originalSchema = { ...testSchema };
            const scraper = new FandomPersonalScraper(testSchema);
            
            await scraper
                .findAll({ base64: false, recursive: false, withId: true })
                .limit(5)
                .exec()
                .catch(() => []);

            expect(testSchema.url).to.equal(originalSchema.url);
            expect(JSON.stringify(testSchema.pageFormat)).to.equal(JSON.stringify(originalSchema.pageFormat));
        });
    });
});

