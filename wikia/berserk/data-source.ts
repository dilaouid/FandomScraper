import { IDataSource } from "../../interfaces/datasets";

const BerserkENDataSource: IDataSource = {
    gender: 'Gender',
    species: 'Kind',
    images: {
        identifier: '.mw-parser-output table img',
        get: function(page: Document) {
            return page.querySelectorAll(this.identifier);
        }
    },
    episode: 'First appearance',
    status: 'Status',
    affiliation: 'Affiliations'
};

export { BerserkENDataSource };