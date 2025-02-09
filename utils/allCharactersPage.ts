const allCharactersPage = {
    'classic': {
        ignore: ['Catégorie:', 'Category:', 'List of', 'File:', 'Template:'],
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
    },
    'table-3': {
        banList: [],
        next: {
            type: '',
            value: ''
        }
    },
    'table-4': {
        banList: [],
        next: {
            type: '',
            value: ''
        }
    }
}

export { allCharactersPage }