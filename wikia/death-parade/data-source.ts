const DeathParadeENDataSource: IDataSource = {
    kanji: 'kanji',
    romaji: 'romaji',
    gender: 'gender',
    age: 'age',
    height: 'height',
    hairColor: 'hair',
    eyeColor: 'eye',
    weight: 'weight',
    status: 'status',
    occupations: 'occupation',
    affiliation: 'affiliation',
    images: {
        identifier: '.pi-image .pi-image-thumbnail',
        get: function (page: Document): Element[] | null {
            return Array.from(page.querySelectorAll(this.identifier));
        }
    },
    quote: {
        identifier: 'h2:has(span#Quotes) + ul li',
        get: function (page: Document): Element | null {
            const quoteSection = page.querySelector('h2:has(span#Quotes), h2:has(span.mw-headline[id="Quotes"])');
            if (!quoteSection) return null;
            
            const quotesList = quoteSection.nextElementSibling;
            if (quotesList && quotesList.tagName === 'UL') {
                return quotesList.querySelector('li');
            }
            return null;
        }    
    },
    episode: 'debut',
    bloodType: 'blood',
    seiyu: 'jvoice',
    voiceActor: 'evoice'
};

export { DeathParadeENDataSource };