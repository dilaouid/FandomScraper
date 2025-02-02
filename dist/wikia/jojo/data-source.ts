const JojoFRDataSource: IDataSource = {
    kanji: 'Kanji',
    romaji: 'Romaji',
    species: 'Espèce',
    gender: 'Genre',
    images: {
        identifier: '.pi-image-thumbnail',
        get: function(page: Document) {
            return page.querySelectorAll(this.identifier);
        },
        ignore: ['https://static.wikia.nocookie.net/jjba/images/d/d5/NoPicAvailable.png']
    },
    episode: 'Début anime',
    manga: 'Début manga',
    age: 'Âge',
    birthday: 'Date de naissance',
    zodiac: "Signe",
    height: 'Taille',
    weight: 'Poids',
    hairColor: 'Couleur de cheveux',
    eyeColor: 'Couleur des yeux',
    occupations: 'Profession',
    affiliation: 'Profession'
};

const JojoENDataSource: IDataSource = {
    kanji: 'ja_kanji',
    romaji: 'ja_romaji',
    status: 'status',
    gender: 'gender',
    images: {
        identifier: '.mw-parser-output aside img',
        get: function(page: Document) {
            return page.querySelectorAll(this.identifier);
        },
        ignore: ['https://static.wikia.nocookie.net/jjba/images/d/d5/NoPicAvailable.png']
    },
    episode: 'animedebut',
    manga: 'mangadebut',
    age: 'age',
    birthday: 'birthday',
    zodiac: 'zodiac',
    height: 'height',
    weight: 'weight',
    occupations: 'occupation',
    hairColor: 'hair',
    eyeColor: 'eyes',
    affiliation: 'affiliation',
    seiyu: 'seiyuu',
    voiceActor: 'voiceactor'
};

export { JojoFRDataSource, JojoENDataSource };