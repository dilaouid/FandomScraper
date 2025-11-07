/**
 * Data source for Fate/Type-Moon wiki
 * Values MUST match the infobox data-source attribute (not the visible label)
 */

const FateENDataSource: IDataSource = {
    species: "type",
    gender: "gender",
    height: "height",
    weight: "weight",
    bloodType: "bloodt",
    likes: "likes",
    dislikes: "dislikes",
    talent: "talent",
    enemy: "enemy",
    imageColor: "imagecol",
    ancestors: "Ancestor",
    father: "Father",
    mother: "Mother",
    spirit: "spirit",
    type: "type",
    source: "source",
    region: "region",
    alignement: "alignement",
    attribute: "attribute",
    armament: "armament",

    // Images
    images: {
        identifier: '.pi-image-thumbnail',
        get: function (page: Document) {
            return page.querySelectorAll(this.identifier);
        },
    },

    // Quote block (optional)
    quote: {
        identifier: '#Quotes',
        get: function (page: Document): Element | null {
            const quotesHeading = page.querySelector('span#Quotes');
            if (!quotesHeading) return null;
            const h2 = quotesHeading.closest('h2');
            if (!h2) return null;
            let next = h2.nextElementSibling;
            while (next && next.tagName.toLowerCase() !== 'ul') {
                next = next.nextElementSibling;
            }
            return next;
        }
    },
    kanji: 'jname',
    name: 'name',
    seiyu: 'JPvoice',
    voiceActor: 'Engvoice',
    franchise: 'franchise',
    appearance: 'appearances',

    aka: 'aka',
    class: 'class',
    master: 'master',
    age: 'age',
    affiliation: 'affiliation',
    birthday: 'bday',
    occupations: 'occupation',
    relatives: 'relative(s)',
};

export { FateENDataSource };