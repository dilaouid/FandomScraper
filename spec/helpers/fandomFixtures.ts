type CharacterLink = {
    name: string;
    href: string;
};

type CharacterPageOptions = {
    canonicalUrl: string;
    pageId: number;
    title: string;
    fields: Record<string, string>;
    imageMarkup?: string;
};

function createHtmlPage(body: string, head: string = ''): string {
    return `<!doctype html><html><head>${head}</head><body>${body}</body></html>`;
}

function createPortableInfobox(fields: Record<string, string>): string {
    return `
        <aside class="portable-infobox">
            ${Object.entries(fields)
                .map(([key, value]) => `
                    <section class="pi-item pi-data" data-source="${key}">
                        <h3 class="pi-data-label">${key}</h3>
                        <div class="pi-data-value">${value}</div>
                    </section>
                `)
                .join('')}
        </aside>
    `;
}

function createCharacterPage(options: CharacterPageOptions): string {
    const head = `
        <link rel="canonical" href="${options.canonicalUrl}">
        <script type="application/json">{"pageId":${options.pageId}}</script>
    `;

    const body = `
        <h1 class="mw-page-title-main">${options.title}</h1>
        ${options.imageMarkup ?? ''}
        ${createPortableInfobox(options.fields)}
    `;

    return createHtmlPage(body, head);
}

function createInvalidCharacterPage(title: string): string {
    return createHtmlPage(`<h1 class="mw-page-title-main">${title}</h1>`);
}

function createTableTwoListPage(characters: CharacterLink[]): string {
    const items = characters
        .map(({ name, href }) => `<small><b><a href="${href}">${name}</a></b></small>`)
        .join('');

    return createHtmlPage(`<div id="mw-content-text">${items}</div>`);
}

function createTableThreeListPage(characters: CharacterLink[]): string {
    const rows = characters
        .map(({ name, href }, index) => `
            <tr>
                <td>${index + 1}</td>
                <td><a href="${href}">${name}</a></td>
            </tr>
        `)
        .join('');

    return createHtmlPage(`
        <table class="fandom-table">
            <tbody>${rows}</tbody>
        </table>
    `);
}

function createCustomListPage(characters: CharacterLink[]): string {
    const rows = characters
        .map(({ name, href }, index) => `
            <tr>
                <td>${index + 1}</td>
                <td><a href="${href}">${name}</a></td>
            </tr>
        `)
        .join('');

    return createHtmlPage(`
        <div id="mw-content-text">
            <table>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `);
}

const demonSlayerCharacters: CharacterLink[] = [
    { name: 'Kagaya Ubuyashiki', href: '/wiki/Kagaya_Ubuyashiki' },
    { name: 'Tanjiro Kamado', href: '/wiki/Tanjiro_Kamado' },
    { name: 'Nezuko Kamado', href: '/wiki/Nezuko_Kamado' },
    { name: 'Zenitsu Agatsuma', href: '/wiki/Zenitsu_Agatsuma' },
    { name: 'Inosuke Hashibira', href: '/wiki/Inosuke_Hashibira' },
    { name: 'Giyu Tomioka', href: '/wiki/Giyu_Tomioka' }
];

const onePieceCharacters: CharacterLink[] = [
    { name: 'Roronoa Zoro', href: '/wiki/Zoro' },
    { name: 'Nico Robin', href: '/wiki/Nico_Robin' },
    { name: 'Monkey D. Luffy', href: '/wiki/Monkey_D._Luffy' }
];

const personalCharacters: CharacterLink[] = [
    { name: 'Amber', href: '/wiki/Amber' },
    { name: 'Lisa', href: '/wiki/Lisa' },
    { name: 'Kaeya', href: '/wiki/Kaeya' },
    { name: 'Diluc', href: '/wiki/Diluc' },
    { name: 'Jean', href: '/wiki/Jean' },
    { name: 'Mona', href: '/wiki/Mona' },
    { name: 'Venti', href: '/wiki/Venti' },
    { name: 'Qiqi', href: '/wiki/Qiqi' },
    { name: 'Keqing', href: '/wiki/Keqing' },
    { name: 'Xiangling', href: '/wiki/Xiangling' },
    { name: 'Character List', href: '/wiki/Character_List' },
    { name: 'Category:Archive', href: '/wiki/Category:Archive' },
    { name: 'File:Promo', href: '/wiki/File:Promo' },
    { name: 'Noelle', href: '/wiki/Noelle' },
    { name: 'Barbara', href: '/wiki/Barbara' }
];

function createImageMarkup(className: string, url: string): string {
    return `<div class="${className}"><img src="${url}" alt="fixture image"></div>`;
}

export function buildFandomScraperRoutes(): Record<string, string> {
    return {
        'https://kimetsu-no-yaiba.fandom.com/wiki/Characters#Manga': createTableTwoListPage(demonSlayerCharacters),
        'https://kimetsu-no-yaiba.fandom.com/wiki/Kagaya_Ubuyashiki': createCharacterPage({
            canonicalUrl: 'https://kimetsu-no-yaiba.fandom.com/wiki/Kagaya_Ubuyashiki',
            pageId: 99,
            title: 'Kagaya Ubuyashiki',
            imageMarkup: `<a class="pi-image-thumbnail" href="https://images.test/kagaya.jpg"><img src="https://images.test/kagaya.jpg" alt="Kagaya"></a>`,
            fields: {
                kanji: '産屋敷 耀哉',
                'rōmaji': 'Ubuyashiki Kagaya',
                status: 'Deceased',
                race: 'Human',
                'relative(s)': 'Amane Ubuyashiki<br>Kiriya Ubuyashiki',
                age: '23'
            }
        }),
        'https://kimetsu-no-yaiba.fandom.com/wiki/Tanjiro_Kamado': createCharacterPage({
            canonicalUrl: 'https://kimetsu-no-yaiba.fandom.com/wiki/Tanjiro_Kamado',
            pageId: 132,
            title: 'Tanjiro Kamado',
            imageMarkup: `<a class="pi-image-thumbnail" href="https://images.test/tanjiro.jpg"><img src="https://images.test/tanjiro.jpg" alt="Tanjiro"></a>`,
            fields: {
                kanji: '竈門 炭治郎',
                'rōmaji': 'Kamado Tanjirō',
                status: 'Alive',
                race: 'Human',
                'relative(s)': 'Nezuko Kamado<br>Hanako Kamado',
                age: '15'
            }
        }),
        'https://kimetsu-no-yaiba.fandom.com/wiki/Nezuko_Kamado': createCharacterPage({
            canonicalUrl: 'https://kimetsu-no-yaiba.fandom.com/wiki/Nezuko_Kamado',
            pageId: 133,
            title: 'Nezuko Kamado',
            imageMarkup: `<a class="pi-image-thumbnail" href="https://images.test/nezuko.jpg"><img src="https://images.test/nezuko.jpg" alt="Nezuko"></a>`,
            fields: {
                kanji: '竈門 禰豆子',
                'rōmaji': 'Kamado Nezuko',
                status: 'Alive',
                race: 'Demon',
                'relative(s)': 'Tanjiro Kamado',
                age: '14'
            }
        }),
        'https://kimetsu-no-yaiba.fandom.com/wiki/Zenitsu_Agatsuma': createCharacterPage({
            canonicalUrl: 'https://kimetsu-no-yaiba.fandom.com/wiki/Zenitsu_Agatsuma',
            pageId: 134,
            title: 'Zenitsu Agatsuma',
            imageMarkup: `<a class="pi-image-thumbnail" href="https://images.test/zenitsu.jpg"><img src="https://images.test/zenitsu.jpg" alt="Zenitsu"></a>`,
            fields: {
                kanji: '我妻 善逸',
                'rōmaji': 'Agatsuma Zenitsu',
                status: 'Alive',
                race: 'Human',
                'relative(s)': 'Jigoro Kuwajima',
                age: '16'
            }
        }),
        'https://kimetsu-no-yaiba.fandom.com/wiki/Inosuke_Hashibira': createCharacterPage({
            canonicalUrl: 'https://kimetsu-no-yaiba.fandom.com/wiki/Inosuke_Hashibira',
            pageId: 135,
            title: 'Inosuke Hashibira',
            imageMarkup: `<a class="pi-image-thumbnail" href="https://images.test/inosuke.jpg"><img src="https://images.test/inosuke.jpg" alt="Inosuke"></a>`,
            fields: {
                kanji: '嘴平 伊之助',
                'rōmaji': 'Hashibira Inosuke',
                status: 'Alive',
                race: 'Human',
                'relative(s)': 'Kotoha Hashibira',
                age: '15'
            }
        }),
        'https://kimetsu-no-yaiba.fandom.com/wiki/Giyu_Tomioka': createCharacterPage({
            canonicalUrl: 'https://kimetsu-no-yaiba.fandom.com/wiki/Giyu_Tomioka',
            pageId: 136,
            title: 'Giyu Tomioka',
            imageMarkup: `<a class="pi-image-thumbnail" href="https://images.test/giyu.jpg"><img src="https://images.test/giyu.jpg" alt="Giyu"></a>`,
            fields: {
                kanji: '冨岡 義勇',
                'rōmaji': 'Tomioka Giyu',
                status: 'Alive',
                race: 'Human',
                'relative(s)': 'Tsutako Tomioka',
                age: '21'
            }
        }),
        'https://kimetsu-no-yaiba.fandom.com/wiki/?curid=132': createCharacterPage({
            canonicalUrl: 'https://kimetsu-no-yaiba.fandom.com/wiki/Tanjiro_Kamado',
            pageId: 132,
            title: 'Tanjiro Kamado',
            imageMarkup: `<a class="pi-image-thumbnail" href="https://images.test/tanjiro.jpg"><img src="https://images.test/tanjiro.jpg" alt="Tanjiro"></a>`,
            fields: {
                kanji: '竈門 炭治郎',
                'rōmaji': 'Kamado Tanjirō',
                status: 'Alive',
                race: 'Human',
                'relative(s)': 'Nezuko Kamado<br>Hanako Kamado',
                age: '15'
            }
        }),
        'https://kimetsu-no-yaiba.fandom.com/wiki/?curid=1': createInvalidCharacterPage('Missing character'),
        'https://onepiece.fandom.com/wiki/List_of_Canon_Characters': createTableThreeListPage(onePieceCharacters),
        'https://onepiece.fandom.com/wiki/Zoro': createCharacterPage({
            canonicalUrl: 'https://onepiece.fandom.com/wiki/Zoro',
            pageId: 501,
            title: 'Roronoa Zoro',
            imageMarkup: `<div class="wds-tab__content"><img src="https://images.test/zoro.png" alt="Zoro"></div>`,
            fields: {
                ename: 'Roronoa Zoro',
                jname: 'ロロノア・ゾロ',
                rname: 'Roronoa Zoro',
                age: '21',
                affiliation: 'Straw Hat Pirates',
                status: 'Alive'
            }
        }),
        'https://onepiece.fandom.com/wiki/Nico_Robin': createCharacterPage({
            canonicalUrl: 'https://onepiece.fandom.com/wiki/Nico_Robin',
            pageId: 1558,
            title: 'Nico Robin',
            imageMarkup: `<div class="wds-tab__content"><img src="https://images.test/robin.png" alt="Robin"></div>`,
            fields: {
                ename: 'Nico Robin',
                jname: 'ニコ・ロビン',
                rname: 'Niko Robin',
                age: '30',
                affiliation: 'Straw Hat Pirates<br>Revolutionary Army',
                status: 'Alive'
            }
        }),
        'https://onepiece.fandom.com/wiki/Monkey_D._Luffy': createCharacterPage({
            canonicalUrl: 'https://onepiece.fandom.com/wiki/Monkey_D._Luffy',
            pageId: 500,
            title: 'Monkey D. Luffy',
            imageMarkup: `<div class="wds-tab__content"><img src="https://images.test/luffy.png" alt="Luffy"></div>`,
            fields: {
                ename: 'Monkey D. Luffy',
                jname: 'モンキー・D・ルフィ',
                rname: 'Monkey D. Luffy',
                age: '19',
                affiliation: 'Straw Hat Pirates',
                status: 'Alive'
            }
        }),
        'https://onepiece.fandom.com/wiki/?curid=1558': createCharacterPage({
            canonicalUrl: 'https://onepiece.fandom.com/wiki/Nico_Robin',
            pageId: 1558,
            title: 'Nico Robin',
            imageMarkup: `<div class="wds-tab__content"><img src="https://images.test/robin.png" alt="Robin"></div>`,
            fields: {
                ename: 'Nico Robin',
                jname: 'ニコ・ロビン',
                rname: 'Niko Robin',
                age: '30',
                affiliation: 'Straw Hat Pirates<br>Revolutionary Army',
                status: 'Alive'
            }
        }),
        'https://onepiece.fandom.com/wiki/?curid=96': createInvalidCharacterPage('Missing character'),
        'https://images.test/kagaya.jpg': 'fixture-image-kagaya',
        'https://images.test/tanjiro.jpg': 'fixture-image-tanjiro',
        'https://images.test/nezuko.jpg': 'fixture-image-nezuko',
        'https://images.test/zenitsu.jpg': 'fixture-image-zenitsu',
        'https://images.test/inosuke.jpg': 'fixture-image-inosuke',
        'https://images.test/giyu.jpg': 'fixture-image-giyu',
        'https://images.test/zoro.png': 'fixture-image-zoro',
        'https://images.test/robin.png': 'fixture-image-robin',
        'https://images.test/luffy.png': 'fixture-image-luffy'
    };
}

export function buildPersonalScraperRoutes(): Record<string, string> {
    const characterPages = personalCharacters.reduce<Record<string, string>>((routes, character, index) => {
        routes[`https://genshin-impact.fandom.com${character.href}`] = createCharacterPage({
            canonicalUrl: `https://genshin-impact.fandom.com${character.href}`,
            pageId: 700 + index,
            title: character.name,
            imageMarkup: `<a class="pi-image-thumbnail" href="https://images.test/${character.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg"><img src="https://images.test/${character.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg" alt="${character.name}"></a>`,
            fields: {
                name: character.name,
                element: 'Pyro'
            }
        });
        return routes;
    }, {});

    return {
        'https://genshin-impact.fandom.com/wiki/Character/List': createCustomListPage(personalCharacters),
        'https://genshin-impact.fandom.com/wiki/NonExistentPage': createHtmlPage('<div id="mw-content-text"></div>'),
        ...characterPages
    };
}
