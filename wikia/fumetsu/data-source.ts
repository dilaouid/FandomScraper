import { IDataSource } from "../../interfaces/datasets";

// French data source not available yet

const FumetsuENDataSource: IDataSource = {
    kanji: 'Kanji',
    status: 'Status',
    species: 'Race',
    gender: 'Sex',
    images: {
        identifier: '.mw-parser-output table img',
        get: function(page: Document) {
            // get the image inside the second tr of the table
            return page.querySelectorAll(this.identifier)
        },
    },
    episode: 'Anime',
    age: 'Age',
    affiliation: 'Affiliation'
};

export { FumetsuENDataSource };