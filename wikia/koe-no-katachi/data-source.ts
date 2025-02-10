const SilentVoiceFRDataSource: IDataSource = {
    name: 'nom',
    age: 'âge',
    birthday: 'naissance',
    zodiac: "signe",
    gender: 'genre',
    bloodType: "groupesanguin",
    relatives: 'parenté',
    occupations: 'occupation',
    affiliation: 'études',
    manga: 'manga',
    images: {
        identifier: '.pi-image-thumbnail',
        get: function (page: Document) {
            return page.querySelectorAll(this.identifier);
        },
    },
    voiceActor: 'voix',
};

const SilentVoiceENDataSource: IDataSource = {
    age: 'age',
    birthday: 'birthday',
    zodiac: "sign",
    gender: 'gender',
    height: 'height',
    bloodType: "bloodtype",
    relatives: 'relatives',
    occupations: 'occupation',
    affiliation: 'affiliation',
    manga: 'manga',
    voiceActor: 'voice_actor',
    images: {
        identifier: '.pi-image-thumbnail',
        get: function (page: Document) {
            return page.querySelectorAll(this.identifier);
        },
    },
    quote: {
        identifier: 'dl',
        get: function (page: Document): Element | null {
            const dl = page.querySelector('dl');
            if (!dl) return null;
            dl.querySelectorAll('b').forEach(b => b.remove());
            return dl;
        }
    },
};

export { SilentVoiceENDataSource, SilentVoiceFRDataSource };