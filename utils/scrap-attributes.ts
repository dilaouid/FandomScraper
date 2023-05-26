interface IDataAllCharactersPage {
    url: string;
    name: string;
    data?: any[];
};

const allCharactersPage = {
    'classic': {
        banList: ['Catégorie:', 'Category:', 'List of'],
        listCharactersElement: {
            type: 'class',
            value: 'category-page__member-link'
        },
        next: {
            type: 'class',
            value: 'category-page__pagination-next'
        }
    },
    'table-1': {
        banList: [],
        next: {
            type: '',
            value: ''
        }
    },
    'table-2': {
        banList: [],
        next: {
            type: '',
            value: ''
        }
    }
}

export { 
    IDataAllCharactersPage,
    allCharactersPage 
};