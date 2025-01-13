import { FandomScraper } from "../index" 
import { expect } from "chai";

describe("FandomScraper Demon Slayer", () => {
    let scraper: FandomScraper
    let metadatas: any;
    
    beforeEach(async () => {
        scraper = new FandomScraper("demon-slayer", { lang: "en" });
        metadatas = await scraper.getMetadata();
    });

    describe("Checking metadatas", () => {
        it("should have valid metadatas", () => {
            expect(metadatas).to.be.an('object');
        });

        it("metadata should have name, language, attributes and count", () => {
            expect(metadatas.name).to.be.a('string');
            expect(metadatas.language).to.be.a('string');
            expect(metadatas.attributes).to.be.an('array');
            expect(metadatas.count).to.be.a('number');
        });

        it("metadata name should be 'demon-slayer'", () => {
            expect(metadatas.name).to.equal("demon-slayer");
        });

        it("metadata language should be 'en'", () => {
            expect(metadatas.language).to.equal("en");
        });

        it("metadata attributes should be an array of string", () => {
            expect(metadatas.attributes.length).to.be.greaterThan(0);
            expect(metadatas.attributes[0]).to.be.a('string');
        });

        it("metadata count should be greater than 1", () => {
            expect(metadatas.count).to.be.greaterThan(1);
        });
    });

    describe("FindAll", () => {
        let all: any[];

        beforeAll(async () => {
            all = await scraper
              .findAll({ base64: false, recursive: true, withId: true })
              .attr('kanji romaji status species images occupations affiliation height weight relatives age')
              .limit(5)
              .offset(0)
              .attrToArray('relatives age')
              .exec().catch((err) => {
                    throw err;
                }
            );
            
        });
      
        it("Result of findAll() should have 5 characters", () => {
            expect(all.length).to.equal(5);
        });
        it("Result of findAll() should get the first character (Ubuyashiki Kagaya)", () => {
            expect(all[0].data.kanji).to.equal("産屋敷 耀哉");
            expect(all[0].data.romaji).to.equal("Ubuyashiki Kagaya");
        });
        it("Kagaya relatives must be an array", () => {
            expect(all[0].data.relatives).to.be.an('array');
        });
        it("Kagaya age must be an array", () => {
            expect(all[0].data.age).to.be.an('array');
        });
        it("Kagaya relatives must be an array of string", () => {
            expect(all[0].data.relatives[0]).to.be.an('string');
        });
        it("Kagaya age must be an array of string", () => {
            expect(all[0].data.age[0]).to.be.an('string');
        });
    });

    describe("FindByName", () => {
        let Kagaya: any;
        let notFound: any;

        beforeAll(async () => {
            Kagaya = await scraper
              .findByName("Kagaya Ubuyashiki", { base64: true, withId: true })
              .attr('kanji romaji status species images occupations affiliation height weight relatives age')
              .attrToArray('relatives age')
              .exec().catch((err) => {
                return [];
            });
      
            notFound = await scraper
              .findByName("Toshio Ozaki", { base64: false, withId: true })
              .exec().catch((err) => {
                return [];
            });
        });

        it("Kagaya name must be 産屋敷 耀哉 (Kagaya Ubuyashiki)", () => {
            expect(Kagaya.data.kanji).to.equal("産屋敷 耀哉");
            expect(Kagaya.data.romaji).to.equal("Ubuyashiki Kagaya");
        });
        it("Kagaya relatives must be an array", () => {
            expect(Kagaya.data.relatives).to.be.an('array');
            expect(Kagaya.data.relatives[0]).to.be.an('string');
        });
        it("Kagaya age must be an array", () => {
            expect(Kagaya.data.age).to.be.an('array');
            expect(Kagaya.data.age[0]).to.be.an('string');
        });
        it("Kagaya images must be an array of base64", () => {
            expect(Kagaya.data.images).to.be.an('array');
            expect(Kagaya.data.images[0]).to.be.an('string');

            const base64Regex = /^data:image\/(png|jpg|jpeg);base64,|iVBORw0KGgoAAAANSUhEUgAAA/;
            expect(base64Regex.test(Kagaya.data.images[0])).to.be.true;
        });

        it("Toshio Ozaki should not be found (result empty array)", () => {
            expect(notFound).to.be.an('array');
            expect(notFound.length).to.equal(0);
        });
    });

    describe("FindById", () => {
        let kamadoId: any;
        let notFound: any;

        beforeAll(async () => {
            kamadoId = await scraper
              .findById(132, { base64: true })
              .attr('kanji romaji status species images occupations affiliation height weight relatives age')
              .attrToArray('relatives age')
              .exec().catch((err) => {
                return [];
            });
      
            notFound = await scraper
              .findById(1, { base64: false })
              .exec().catch((err) => {
                return [];
            });
        });

        it("Kamado Tanjirō name must be 竈門 炭治郎 (Kamado Tanjirō)", () => {
            expect(kamadoId.data.kanji).to.equal("竈門 炭治郎");
            expect(kamadoId.data.romaji).to.equal("Kamado Tanjirō");
        });

        it("Kamado Tanjirō relatives must be an array", () => {
            expect(kamadoId.data.relatives).to.be.an('array');
            expect(kamadoId.data.relatives[0]).to.be.an('string');
        });

        it("Kamado Tanjirō age must be an array", () => {
            expect(kamadoId.data.age).to.be.an('array');
            expect(kamadoId.data.age[0]).to.be.an('string');
        });

        it("Kamado Tanjirō images must be an array of base64", () => {
            expect(kamadoId.data.images).to.be.an('array');
            expect(kamadoId.data.images[0]).to.be.an('string');

            const base64Regex = /^data:image\/(png|jpg|jpeg);base64,|iVBORw0KGgoAAAANSUhEUgAAAV4AAA/;
            expect(base64Regex.test(kamadoId.data.images[0])).to.be.true;
        });

        it("Id 1 should not be found (result empty array)", () => {
            expect(notFound).to.be.an('array');
            expect(notFound.length).to.equal(0);
        });

    });

});

describe("FandomScraper One Piece", () => {
    let scraper: FandomScraper
    let metadatas: any;
    
    beforeEach(async() => {
        scraper = new FandomScraper("one-piece", { lang: "en" });
        metadatas = await scraper.getMetadata();
    });

    describe("Checking metadatas", () => {
        it("should have valid metadatas", () => {
            expect(metadatas).to.be.an('object');
        });

        it("metadata should have name, language, attributes and count", () => {
            expect(metadatas.name).to.be.a('string');
            expect(metadatas.language).to.be.a('string');
            expect(metadatas.attributes).to.be.an('array');
            expect(metadatas.count).to.be.a('number');
        });

        it("metadata name should be 'one-piece'", () => {
            expect(metadatas.name).to.equal("one-piece");
        });

        it("metadata language should be 'en'", () => {
            expect(metadatas.language).to.equal("en");
        });

        it("metadata attributes should be an array of string", () => {
            expect(metadatas.attributes.length).to.be.greaterThan(0);
            expect(metadatas.attributes[0]).to.be.a('string');
        });

        it("metadata count should be greater than 1", () => {
            expect(metadatas.count).to.be.greaterThan(1);
        });
    });

    describe("FindAll", () => {
        let all: any[];

        beforeAll(async () => {
            all = await scraper
              .findAll({ base64: false, recursive: true, withId: true })
              .attr('kanji romaji status images occupations affiliation height age')
              .limit(5)
              .offset(355)
              .attrToArray('age affiliation')
              .exec().catch((err) => {
                    throw err;
                }
            );
            
        });
      
        it("Result of findAll() should have 5 characters", () => {
            expect(all.length).to.equal(5);
        });

        it("Result of findAll() should get the first character (Disuko)", () => {
            expect(all[0].data.kanji).to.equal("ディスコ");
            expect(all[0].data.romaji).to.equal("Disuko");
        });

        it("Disuko affiliation must be an array", () => {
            expect(all[0].data.affiliation).to.be.an('array');
        });
        
        it("Disuko images must be an array of string", () => {
            expect(all[0].data.images).to.be.an('array');
            expect(all[0].data.images[0]).to.be.an('string');
        });
    });

    describe("FindByName", () => {
        let Zoro: any;
        let notFound: any;

        beforeAll(async () => {
            Zoro = await scraper
              .findByName("zoro", { base64: true, withId: true })
              .attr('kanji romaji status images occupations affiliation height age')
              .attrToArray('affiliation age height')
              .exec().catch((err) => {
                return [];
            });
      
            notFound = await scraper
              .findByName("kamado tanjiro", { base64: false, withId: true })
              .exec().catch((err) => {
                return [];
            });
        });

        it("Zoro name must be ロロノア・ゾロ (Roronoa Zoro)", () => {
            expect(Zoro.data.kanji).to.equal("ロロノア・ゾロ");
            expect(Zoro.data.romaji).to.equal("Roronoa Zoro");
        });
        
        it("Zoro age must be an array", () => {
            expect(Zoro.data.age).to.be.an('array');
            expect(Zoro.data.age[0]).to.be.an('string');
        });

        it("Zoro images must be an array of base64", () => {
            expect(Zoro.data.images).to.be.an('array');
            expect(Zoro.data.images[0]).to.be.an('string');

            console.log(Zoro.data.images[0].substring(0, 100));
            
            const base64Regex = /^data:image\/(png|jpg|jpeg);base64,|iVBOR/;
            expect(base64Regex.test(Zoro.data.images[0])).to.be.true;
        });

        it("Kamado Tanjiro should not be found (result empty array)", () => {
            expect(notFound).to.be.an('array');
            expect(notFound.length).to.equal(0);
        });
    });

    describe("FindById", () => {
        let RobinId: any;
        let notFound: any;

        beforeAll(async () => {
            RobinId = await scraper
              .findById(1558, { base64: false })
              .attr('kanji romaji status images occupations affiliation height age')
              .attrToArray('affiliation age')
              .exec().catch((err) => {
                return [];
            });
      
            notFound = await scraper
              .findById(96, { base64: false })
              .exec().catch((err) => {
                return [];
            });
        });

        it("Robin name must be ニコ・ロビン (Nico Robin)", () => {
            expect(RobinId.data.kanji).to.equal("ニコ・ロビン");
            expect(RobinId.data.romaji).to.equal("Niko Robin");
        });

        it("Robin affiliation must be an array", () => {
            expect(RobinId.data.affiliation).to.be.an('array');
        });

        it("Robin age must be an array of string", () => {
            expect(RobinId.data.age).to.be.an('array');
            expect(RobinId.data.age[0]).to.be.an('string');
        });

        it("Id 1 should not be found (result empty array)", () => {
            expect(notFound).to.be.an('array');
            expect(notFound.length).to.equal(0);
        });

    });

});