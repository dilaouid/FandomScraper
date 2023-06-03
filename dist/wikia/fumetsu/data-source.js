// French data source not available yet
const FumetsuENDataSource = {
    kanji: 'Kanji',
    status: 'Status',
    species: 'Race',
    gender: 'Sex',
    images: {
        identifier: '.mw-parser-output table img',
        get: function (page) {
            // get the image inside the second tr of the table
            return page.querySelectorAll(this.identifier);
        },
    },
    episode: 'Anime',
    manga: 'Manga',
    age: 'Age',
    affiliation: 'Affiliation',
    birthday: 'Birthday',
    relatives: 'Relatives',
    seiyu: 'Japanese Voice',
    voiceActor: 'English Voice'
};
export { FumetsuENDataSource };
//# sourceMappingURL=data-source.js.map