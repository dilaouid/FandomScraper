const NarutoFRDataSource: IDataSource = {
    name: 'Nom',
    status: 'Statut',
    gender: 'Genre',
    images: {
        identifier: '.pi-image-thumbnail',
        get: function (page: Document) {
            return page.querySelectorAll(this.identifier);
        },
    },
    quote: {
        identifier: '#Citations',
        get: function (page: Document): Element | null {
            const heading = page.querySelector('span#Citations');
            if (!heading) return null;
            const h2 = heading.closest('h2');
            if (!h2) return null;
            let next = h2.nextElementSibling;
            while (next && next.tagName.toLowerCase() !== 'ul') {
                next = next.nextElementSibling;
            }
            return next;
        }
    },
    episode: 'Début anime',
    manga: 'Début manga',
    age: 'Âge',
    affiliation: 'Affiliation',
    birthday: 'Naissance',
    height: 'Taille',
    weight: 'Poids',
    relatives: 'Famille',
    bloodType: 'Groupe Sanguin',
    seiyu: 'Seiyû',
    voiceActor: 'Doubleur Français'
};

// DOM version of the english data-source is bad, so WIP to find a solution
const NarutoENDataSource: IDataSource = {
    status: 'Status',
    gender: 'Sex',
    images: {
        identifier: '.mw-parser-output .imagecell img',
        get: function (page: Document) {
            return page.querySelectorAll(this.identifier);
        },
    },
    quote: {
        identifier: '#Quotes',
        get: function (page: Document): Element | null {
            const quotesHeading = page.querySelector('span#Quotes');
            if (!quotesHeading) return null;
            const h2 = quotesHeading.closest('h2');
            if (!h2) return null;
            let next = h2.nextElementSibling;
            while (next && next.tagName.toLowerCase() !== 'ul') {
                next = next.nextElementSibling;
            }
            return next;
        }
    },
    episode: 'Anime',
    manga: 'Manga',
    age: 'Age',
    affiliation: 'Affiliation',
    occupations: 'Occupation',
    birthday: 'Birthdate',
    height: 'Height',
    weight: 'Weight',
    relatives: 'Famille',
    bloodType: 'Blood type',
    seiyu: 'Japanese',
    voiceActor: 'English'
};

export { NarutoFRDataSource, NarutoENDataSource };