interface IDataAllCharactersPage {
    url: string;
    name: string;
    data?: any[];
};

const allCharactersPage = {
    classic: {
        banList: ['Catégorie:', 'Category:', 'List of'],
        listCharactersElement: {
            type: 'class',
            value: 'category-page__member-link'
        },
        next: {
            type: 'class',
            value: 'category-page__pagination-next'
        }
    }
}

export { 
    IDataAllCharactersPage,
    allCharactersPage 
};