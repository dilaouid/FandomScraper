import { IDataSource } from "../../interfaces";

// French data source not available yet

const ShikiENDataSource: IDataSource = {
    kanji: 'Name Kanji',
    status: 'Status',
    species: 'Race',
    gender: 'Gender',
    images: {
        identifier: '.mw-parser-output',
        get: function(page: Document) {
            // get the image inside the second tr of the table
            const table = page.querySelector(this.identifier)?.querySelectorAll('tr')[1];
            return table?.querySelector('img');
        },
    },
    episode: 'Anime Debut',
    age: 'Age',
    affiliation: 'Occupation'
};

export { ShikiENDataSource };