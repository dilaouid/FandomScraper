const NarutoFRDataSource = {
    name: 'Nom',
    status: 'Statut',
    gender: 'Genre',
    images: {
        identifier: '.pi-image-thumbnail',
        get: function (page) {
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'Début anime',
    age: 'Âge',
    affiliation: 'Affiliation'
};
// DOM version of the english data-source is bad, so WIP to find a solution
const NarutoENDataSource = {};
export { NarutoFRDataSource, NarutoENDataSource };
//# sourceMappingURL=data-source.js.map