// French data source not available yet

const ShikiENDataSource: IDataSource = {
    kanji: 'Name Kanji',
    status: 'Status',
    species: 'Race',
    gender: 'Gender',
    images: {
        identifier: '.mw-parser-output table img',
        get: function (page: Document) {
            // get the image inside the second tr of the table
            return page.querySelectorAll(this.identifier)
        },
    },
    quote: {
        identifier: 'div.quote',
        get: function (page: Document): Element | null {
            return page.querySelector('div.quote');
        }
    },
    episode: 'Anime Debut',
    age: 'Age',
    occupations: 'Occupation'
};

export { ShikiENDataSource };