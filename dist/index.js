import { JSDOM } from 'jsdom';

// index.ts

// wikia/death-note/data-source.ts
var DeathNoteFRDataSource = {
  gender: "Sexe",
  images: {
    identifier: ".mw-parser-output table img",
    get: function(page) {
      const elements = page.querySelectorAll(this.identifier);
      const filteredElements = Array.from(elements).filter((element) => {
        return element.getAttribute("alt") !== "Tete" && element.getAttribute("alt") !== "Pomme";
      });
      return filteredElements;
    }
  },
  episode: "anime",
  age: "\xE2ge",
  birthday: "Naissance",
  affiliation: "affiliation",
  bloodType: "Groupe sanguin",
  occupations: "Activit\xE9(s)",
  height: "Taille",
  weight: "Poids",
  relatives: "Famille"
};
var DeathNoteENDataSource = {
  kanji: "name",
  species: "species",
  gender: "gender",
  images: {
    identifier: ".pi-image-thumbnail",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    }
  },
  episode: "anime",
  manga: "manga",
  age: "age",
  birthday: "birth",
  bloodType: "blood",
  height: "height",
  weight: "weight",
  affiliation: "organization",
  occupations: "occupation",
  relatives: "family",
  seiyu: "japanese",
  voiceActor: "english"
};

// wikia/death-note/schemas.ts
var DeathNoteFR = {
  url: "https://deathnote.fandom.com/fr/wiki/Cat%C3%A9gorie:Personnages",
  pageFormat: "classic",
  dataSource: DeathNoteFRDataSource
};
var DeathNoteEN = {
  url: "https://deathnote.fandom.com/wiki/Category:Manga_characters",
  pageFormat: "classic",
  dataSource: DeathNoteENDataSource
};

// wikia/death-note/index.ts
var DeathNote = {
  fr: DeathNoteFR,
  en: DeathNoteEN
};

// wikia/demon-slayer/data-source.ts
var DemonSlayerFRDataSource = {
  kanji: "kanji",
  romaji: "r\xF4maji",
  status: "statut",
  species: "race",
  gender: "genre",
  images: {
    identifier: ".pi-image-thumbnail",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    }
  },
  episode: "anime",
  manga: "manga",
  age: "\xE2ge",
  affiliation: "affiliation",
  height: "taille",
  weight: "poids",
  birthday: "anniversaire",
  occupations: "occupation",
  relatives: "relation",
  seiyu: "japonais"
};
var DemonSlayerENDataSource = {
  kanji: "kanji",
  romaji: "r\u014Dmaji",
  status: "status",
  species: "race",
  gender: "gender",
  images: {
    identifier: ".pi-image-thumbnail",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    }
  },
  episode: "anime_debut",
  manga: "manga_debut",
  age: "age",
  affiliation: "affiliation",
  occupations: "occupation",
  relatives: "relative(s)",
  birthday: "birthday",
  height: "height",
  weight: "weight",
  seiyu: "japanese_va",
  voiceActor: "english_va"
};

// wikia/demon-slayer/schemas.ts
var DemonSlayerFR = {
  url: "https://kimetsu-no-yaiba.fandom.com/fr/wiki/Cat\xE9gorie:Personnages",
  pageFormat: "classic",
  dataSource: DemonSlayerFRDataSource
};
var DemonSlayerEN = {
  url: "https://kimetsu-no-yaiba.fandom.com/wiki/Characters#Manga",
  pageFormat: "table-2",
  dataSource: DemonSlayerENDataSource
};

// wikia/demon-slayer/index.ts
var DemonSlayer = {
  fr: DemonSlayerFR,
  en: DemonSlayerEN
};

// wikia/dragon-ball/data-source.ts
var DragonBallFRDataSource = {
  kanji: "Nom Original",
  status: "Statut",
  species: "Race",
  images: {
    identifier: ".pi-image-thumbnail",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    }
  },
  episode: "Premi\xE8re apparition Anime",
  manga: "Premi\xE8re apparition Manga",
  birthday: "Naissance",
  height: "Taille",
  weight: "Poids",
  seiyu: "Voix Japonaise",
  voiceActor: "Voix Fran\xE7aise",
  relatives: "Famille"
};
var DragonBallENDataSource = {
  kanji: "JapName",
  romaji: "RomName",
  gender: "Gender",
  species: "Race",
  images: {
    identifier: ".pi-image-thumbnail",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    }
  },
  episode: "anime debut",
  affiliation: "Allegiance",
  manga: "manga debut",
  height: "Height",
  weight: "Weight",
  occupations: "Occupation",
  relatives: "FamConnect",
  birthday: "Date of birth"
};

// wikia/dragon-ball/schemas.ts
var DragonBallFR = {
  url: "https://dragonball.fandom.com/fr/wiki/Cat\xE9gorie:Personnages",
  pageFormat: "classic",
  dataSource: DragonBallFRDataSource
};
var DragonBallEN = {
  url: "https://dragonball.fandom.com/wiki/Characters",
  pageFormat: "classic",
  dataSource: DragonBallENDataSource
};

// wikia/dragon-ball/index.ts
var DragonBall = {
  fr: DragonBallFR,
  en: DragonBallEN
};

// wikia/fumetsu/data-source.ts
var FumetsuENDataSource = {
  kanji: "Kanji",
  status: "Status",
  species: "Race",
  gender: "Sex",
  images: {
    identifier: ".mw-parser-output table img",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    },
    ignore: ["https://static.wikia.nocookie.net/fumetsunoanatae/images/0/03/Alert_4.png"]
  },
  episode: "Anime",
  manga: "Manga",
  age: "Age",
  affiliation: "Affiliation",
  birthday: "Birthday",
  relatives: "Relatives",
  seiyu: "Japanese Voice",
  voiceActor: "English Voice"
};

// wikia/fumetsu/schemas.ts
var FumetsuEN = {
  url: "https://fumetsunoanatae.fandom.com/wiki/Category:Characters",
  pageFormat: "classic",
  dataSource: FumetsuENDataSource
};

// wikia/fumetsu/index.ts
var Fumetsu = {
  fr: FumetsuEN,
  en: FumetsuEN
};

// wikia/naruto/data-source.ts
var NarutoFRDataSource = {
  name: "Nom",
  status: "Statut",
  gender: "Genre",
  images: {
    identifier: ".pi-image-thumbnail",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    }
  },
  episode: "D\xE9but anime",
  manga: "D\xE9but manga",
  age: "\xC2ge",
  affiliation: "Affiliation",
  birthday: "Naissance",
  height: "Taille",
  weight: "Poids",
  relatives: "Famille",
  bloodType: "Groupe Sanguin",
  seiyu: "Seiy\xFB",
  voiceActor: "Doubleur Fran\xE7ais"
};
var NarutoENDataSource = {
  status: "Status",
  gender: "Sex",
  images: {
    identifier: ".mw-parser-output .imagecell img",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    }
  },
  episode: "Anime",
  manga: "Manga",
  age: "Age",
  affiliation: "Affiliation",
  occupations: "Occupation",
  birthday: "Birthdate",
  height: "Height",
  weight: "Weight",
  relatives: "Famille",
  bloodType: "Blood type",
  seiyu: "Japanese",
  voiceActor: "English"
};

// wikia/naruto/schemas.ts
var NarutoFR = {
  url: "https://naruto.fandom.com/fr/wiki/Cat\xE9gorie:Personnages",
  pageFormat: "classic",
  dataSource: NarutoFRDataSource
};
var NarutoEN = {
  url: "https://naruto.fandom.com/wiki/Category:Characters",
  pageFormat: "classic",
  dataSource: NarutoENDataSource
};

// wikia/naruto/index.ts
var Naruto = {
  fr: NarutoFR,
  en: NarutoEN
};

// wikia/one-piece/data-source.ts
var OnePieceFRDataSource = {
  name: "nomf",
  kanji: "nomj",
  romaji: "nomr",
  status: "statut",
  age: "\xE2ge",
  images: {
    identifier: ".wds-tab__content img",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    }
  },
  episode: "premi\xE8re",
  affiliation: "affiliation",
  occupations: "occupation",
  height: "taille",
  bloodType: "groupe sanguin",
  seiyu: "voj",
  voiceActor: "vof"
};
var OnePieceENDataSource = {
  name: "ename",
  kanji: "jname",
  romaji: "rname",
  status: "status",
  age: "age",
  images: {
    identifier: ".wds-tab__content img",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    }
  },
  episode: "first",
  affiliation: "affiliation",
  occupations: "occupation",
  bloodType: "blood type",
  height: "height",
  seiyu: "jva",
  voiceActor: "Odex eva"
};

// wikia/one-piece/schemas.ts
var OnePieceFR = {
  url: "https://onepiece.fandom.com/fr/wiki/Liste_des_Personnages_Canon",
  pageFormat: "table-1",
  dataSource: OnePieceFRDataSource
};
var OnePieceEN = {
  url: "https://onepiece.fandom.com/wiki/List_of_Canon_Characters",
  pageFormat: "table-3",
  dataSource: OnePieceENDataSource
};

// wikia/one-piece/index.ts
var OnePiece = {
  fr: OnePieceFR,
  en: OnePieceEN
};

// wikia/shiki/data-source.ts
var ShikiENDataSource = {
  kanji: "Name Kanji",
  status: "Status",
  species: "Race",
  gender: "Gender",
  images: {
    identifier: ".mw-parser-output table img",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    }
  },
  episode: "Anime Debut",
  age: "Age",
  occupations: "Occupation"
};

// wikia/shiki/schemas.ts
var ShikiEN = {
  url: "https://shiki.fandom.com/wiki/Category:Characters",
  pageFormat: "classic",
  dataSource: ShikiENDataSource
};

// wikia/shiki/index.ts
var Shiki = {
  fr: ShikiEN,
  en: ShikiEN
};

// wikia/promised-neverland/data-source.ts
var PromisedNeverlandFRDataSource = {
  kanji: "kanji",
  romaji: "r\u014Dmaji",
  gender: "genre",
  species: "esp\xE8ce",
  images: {
    identifier: ".mw-parser-output table img",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    }
  },
  episode: "premi\xE8re_apparition",
  status: "statut",
  age: "\xE2ge",
  birthday: "anniversaire",
  eyeColor: "yeux",
  hairColor: "cheveux",
  height: "taille",
  affiliation: "Affiliations",
  relatives: "famille",
  seiyu: "doubleur"
};
var PromisedNeverlandENDataSource = {
  kanji: "Kanji",
  romaji: "R\u014Dmaji",
  gender: "Gender",
  species: "Species",
  images: {
    identifier: ".pi-image-thumbnail",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    }
  },
  manga: "Manga",
  episode: "Episode",
  status: "Status",
  bloodType: "Blood Type",
  age: "Age",
  birthday: "Birthday",
  eyeColor: "Eye Color",
  hairColor: "Hair Color",
  height: "Height",
  affiliation: "Previous Affiliation",
  voiceActor: "English VA",
  seiyu: "Japanese VA"
};

// wikia/promised-neverland/schemas.ts
var PromisedNeverlandFR = {
  url: "https://the-promised-neverland.fandom.com/fr/wiki/Cat\xE9gorie:Personnages",
  pageFormat: "classic",
  dataSource: PromisedNeverlandFRDataSource
};
var PromisedNeverlandEN = {
  url: "https://yakusokunoneverland.fandom.com/wiki/Category:Manga_characters",
  pageFormat: "classic",
  dataSource: PromisedNeverlandENDataSource
};

// wikia/promised-neverland/index.ts
var PromisedNeverland = {
  fr: PromisedNeverlandFR,
  en: PromisedNeverlandEN
};

// wikia/berserk/data-source.ts
var BerserkENDataSource = {
  gender: "Gender",
  species: "Kind",
  images: {
    identifier: ".mw-parser-output aside img",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    }
  },
  episode: "First appearance",
  status: "Status",
  affiliation: "Affiliations",
  occupations: "Occupation(s)",
  relatives: "Relatives",
  hairColor: "Hair color",
  eyeColor: "Eye color"
};

// wikia/berserk/schemas.ts
var BerserkEN = {
  url: "https://berserk.fandom.com/wiki/Category:Fantasia_Arc_Characters",
  pageFormat: "classic",
  dataSource: BerserkENDataSource
};

// wikia/berserk/index.ts
var Berserk = {
  fr: BerserkEN,
  en: BerserkEN
};

// wikia/jojo/data-source.ts
var JojoFRDataSource = {
  kanji: "Kanji",
  romaji: "Romaji",
  species: "Esp\xE8ce",
  gender: "Genre",
  images: {
    identifier: ".pi-image-thumbnail",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    },
    ignore: ["https://static.wikia.nocookie.net/jjba/images/d/d5/NoPicAvailable.png"]
  },
  episode: "D\xE9but anime",
  manga: "D\xE9but manga",
  age: "\xC2ge",
  birthday: "Date de naissance",
  zodiac: "Signe",
  height: "Taille",
  weight: "Poids",
  hairColor: "Couleur de cheveux",
  eyeColor: "Couleur des yeux",
  occupations: "Profession",
  affiliation: "Profession"
};
var JojoENDataSource = {
  kanji: "ja_kanji",
  romaji: "ja_romaji",
  status: "status",
  gender: "gender",
  images: {
    identifier: ".mw-parser-output aside img",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    },
    ignore: ["https://static.wikia.nocookie.net/jjba/images/d/d5/NoPicAvailable.png"]
  },
  episode: "animedebut",
  manga: "mangadebut",
  age: "age",
  birthday: "birthday",
  zodiac: "zodiac",
  height: "height",
  weight: "weight",
  occupations: "occupation",
  hairColor: "hair",
  eyeColor: "eyes",
  affiliation: "affiliation",
  seiyu: "seiyuu",
  voiceActor: "voiceactor"
};

// wikia/jojo/schemas.ts
var JojoFR = {
  url: "https://jjba.fandom.com/fr/wiki/Cat\xE9gorie:Personnages",
  pageFormat: "classic",
  dataSource: JojoFRDataSource
};
var JojoEN = {
  url: "https://jojo.fandom.com/wiki/Category:Characters",
  pageFormat: "classic",
  dataSource: JojoENDataSource
};

// wikia/jojo/index.ts
var Jojo = {
  fr: JojoFR,
  en: JojoEN
};

// wikia/index.ts
var Schemas = {
  "demon-slayer": DemonSlayer,
  "naruto": Naruto,
  "shiki": Shiki,
  "death-note": DeathNote,
  "fumetsu": Fumetsu,
  "one-piece": OnePiece,
  "dragon-ball": DragonBall,
  "promised-neverland": PromisedNeverland,
  "berserk": Berserk,
  "jojo": Jojo
};

// utils/allCharactersPage.ts
var allCharactersPage = {
  "classic": {
    ignore: ["Cat\xE9gorie:", "Category:", "List of", "File:", "Template:"],
    listCharactersElement: {
      type: "class",
      value: "category-page__member-link"
    },
    next: {
      type: "class",
      value: "category-page__pagination-next"
    }
  },
  "table-1": {
    banList: [],
    next: {
      type: "",
      value: ""
    }
  },
  "table-2": {
    banList: [],
    next: {
      type: "",
      value: ""
    }
  },
  "table-3": {
    banList: [],
    next: {
      type: "",
      value: ""
    }
  }
};

// func/parsing.ts
var removeBrackets = (str) => {
  return str.replace(/\[.*?\]/g, "").trim();
};
var formatName = (name) => {
  const split = name.split(" ");
  const formatted = split.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return formatted.join(" ");
};
var formatForUrl = (name) => {
  return name.replace(/ /g, "_");
};

// types/dynamic.types.ts
var availableWikis = [
  "demon-slayer",
  "naruto",
  "shiki",
  "death-note",
  "fumetsu",
  "one-piece",
  "dragon-ball",
  "promised-neverland",
  "berserk",
  "jojo"
];

// utils/extractImageURL.ts
function extractImageURL(url) {
  const regex = /^(https?:\/\/.*\.(?:png|jpe?g|gif|bmp|svg|webp|tiff?))(?=[\/?]|$)/i;
  const match = url.match(regex);
  return match ? match[1] : url;
}

// index.ts
var FandomScraper = class {
  /**
   * Constructs a FandomScraper instance.
   * @param { name: TAvailableWikis, options?: { lang: 'en' | 'fr' | null } } options - The options of the constructor.
   * @throws Error if an invalid wiki name is provided.
   * @example
   * ```ts
   * const scraper = new FandomScraper({ name: 'dragon-ball', language: 'fr' });
   * ```
   */
  constructor(name, options) {
    this.options = {
      base64: false,
      recursive: false,
      withId: true,
      limit: 50,
      offset: 0,
      ignore: ["User:", "Special:", "Template:", "Category:", "MediaWiki:", "Help:", "Forum:", "Blog:", "BlogComments:", "Message Wall:", "Board Thread:", "Thread:", "User blog comment:", "User blog:", "Module:", "Thread:"],
      attributes: []
    };
    this.name = "";
    this.id = 0;
    this.keysAttrToArray = [];
    this.isOldVersion = false;
    if (!Object.keys(Schemas).includes(name)) throw new Error(`Invalid wiki name provided: ${name}`);
    this._schema = Schemas[name][options?.lang || "en"];
    this.wikiaParameters = {
      name,
      lang: options?.lang || "en"
    };
  }
  /**
   * Get the schema of the current wiki.
   * @returns The schema of the wiki.
   */
  getSchema() {
    return this._schema;
  }
  /**
   * Get metadata about the current wiki. (availables attributes, language, etc...)
   * @returns The metadata of the wiki.
   */
  async getMetadata(options = { withCount: true }) {
    const schema = Schemas[this.wikiaParameters.name];
    const count = options.withCount ? await this.count() : 0;
    const data = {
      name: this.wikiaParameters.name,
      count,
      attributes: Object.keys(this._schema.dataSource),
      language: this.wikiaParameters.lang,
      availableLanguages: Object.keys(schema),
      url: this._schema.url
    };
    if (!options.withCount)
      delete data.count;
    return data;
  }
  /**
   * Set the url of the characters page of the wiki in the schema.
   * @param {string} url - The url of the characters page.
   * @returns The FandomScraper instance.
   */
  setCharactersPage(url) {
    this._schema.url = url;
    return this;
  }
  /**
   * Set the limit of characters to get. Default: 50
   * @param {number} limit - The limit of characters to get.
   * @throws Error if the limit is less than 1.
   * @example
   * ```ts
   * await scraper.findAll({ base64: true, recursive: true, withId: true }).limit(100).exec();
   * ```
   */
  limit(limit) {
    if (this.method === "findById" || this.method === "findByName")
      throw new Error("Limit cannot be used with findById or findByName");
    if (limit < 1)
      throw new Error("Limit must be greater than 0");
    this.options.limit = limit;
    return this;
  }
  /**
   * Set the offset of characters to get. Default: 0
   * @param {number} offset - The offset of characters to get.
   * @throws Error if the offset is less than 0.
   * @example
   * ```ts
   * await scraper.findAll({ base64: true, recursive: true, withId: true }).offset(100).exec();
   * ```
   */
  offset(offset) {
    if (this.method === "findById" || this.method === "findByName")
      throw new Error("Offset cannot be used with findById or findByName");
    if (offset < 0)
      throw new Error("Offset must be greater than 0");
    this.options.offset = offset;
    return this;
  }
  /**
   * Set the language of the current wiki instance.
   * @param {'en' | 'fr'} lang - The language to set
   * @returns The FandomScraper instance
   * @throws Error if the language is not available for this wiki
   * @example
   * ```ts
   * await scraper.setLanguage('fr');
   * ```
  */
  setLanguage(lang) {
    const schema = Schemas[this.wikiaParameters.name];
    if (!Object.keys(schema).includes(lang)) {
      throw new Error(`Language ${lang} is not available for this wiki`);
    }
    this._schema = schema[lang];
    this.wikiaParameters.lang = lang;
    return this;
  }
  /**
   * Set the ignored substrings in the characters names. Default: []
   * @param {string[]} ignore - The substrings to ignore in the characters names.
   * @throws Error if the ignore parameter is not an array.
   * @example
   * ```ts
   * await scraper.findAll({ base64: true, recursive: true, withId: true }).ignore(['(Dragon Ball Heroes)']).exec();
   * ```
   */
  ignore(ignore) {
    if (this.method === "findById" || this.method === "findByName")
      throw new Error("Ignore cannot be used with findById or findByName");
    if (!Array.isArray(ignore))
      throw new Error("Ignore parameter must be an array");
    this.options.ignore = ignore;
    return this;
  }
  /**
   * Set the attributes to get in the characters. Default are the attributes of the schema.
   * @param {string} attributes - The attributes to get in the characters.
   * @throws Error if the attributes parameter is not a string.
   * @example
   * ```ts
   * await scraper.findAll({ base64: true, recursive: true, withId: true }).attr('name images age kanji').exec();
   * ```
   */
  attr(attributes) {
    if (typeof attributes !== "string")
      throw new Error("Attributes parameter must be a string");
    attributes = attributes.replace(/\s\s+/g, " ")?.trim();
    this.options.attributes = attributes.split(" ");
    return this;
  }
  /**
   * Set the keys of the attributes that should be converted to an array instead of a string. Default: []
   * @param {string} attributes - The keys of the attributes that should be converted to an array instead of a string.
   * @throws Error if the attributes parameter is not a string.
   * @example
   * ```ts
   * await scraper.findAll({ base64: true, recursive: true, withId: true }).attrToArray('age height voiceActor').exec();
   * ```
   */
  attrToArray(attributes) {
    if (typeof attributes !== "string")
      throw new Error("Attributes to array parameter must be a string");
    attributes = attributes.replace(/\s\s+/g, " ")?.trim();
    this.keysAttrToArray = attributes.split(" ");
    return this;
  }
  reset() {
    this.options = {
      base64: false,
      recursive: false,
      withId: true,
      limit: 50,
      offset: 0,
      ignore: [],
      attributes: []
    };
  }
  /**
   * Get the characters page of the current wiki.
   *  
   * @param {string} url - The url of the characters page.
   * @returns The characters page of the wiki.
   * @throws Error if the characters page is not set.
   * @example
   * ```ts
   * await scraper.getCharactersPage('https://kimetsu-no-yaiba.fandom.com/fr/wiki/Catégorie:Personnages');
   * ```
   */
  async getCharactersPage(url) {
    this._CharactersPage = await this.fetchPage(url);
    this.isOldVersion = this.setPageVersion(this._CharactersPage);
  }
  async fetchPage(url) {
    const text = await fetch(url).then(async (res) => {
      const text2 = await res.text();
      return text2;
    }).catch((err) => {
      throw new Error(`Error while fetching ${url}: ${err}`);
    });
    return new JSDOM(text, { url, contentType: "text/html", referrer: url }).window.document;
  }
  /**
   * Get all the characters of the current wiki, considering the options provided.
   * @param {IGetCharactersOptions} [options] - The options of the getCharacters method.
   * @returns The characters of the wiki.
   * @throws Error if the limit is less than 1.
   * @throws Error if the offset is less than 0.
   * @example
   * ```ts
   * const characters = await scraper.getCharacters({ limit: 100, offset: 0, recursive: true, base64: true, withId: true });
   * ```
   * @deprecated Use the findAll method instead.
   */
  async getAll(options = { offset: 0, limit: 1e5, recursive: false, base64: true, withId: true, ignore: [] }) {
    try {
      if (options.limit < 1) throw new Error("Limit must be greater than 0");
      if (options.offset < 0) throw new Error("Offset must be greater than 0");
      await this.getCharactersPage(this._schema.url);
      return await this._getAll(options);
    } catch (err) {
      console.error(err);
    }
    return [];
  }
  /**
   * Get all the characters of the current wiki, considering the options provided.
   * Must be called before the exec method and any other method.
   * @param { { base64: boolean, recursive: boolean, withId: boolean } } [options] - The options of the getCharacters method.
   * @returns The characters of the wiki.
   * @example
   * ```ts
   * const characters = await scraper.findAll({ base64: true, recursive: true, withId: true }).exec();
   * ```
   */
  findAll(options) {
    this.method = "find";
    this.reset();
    this.options.base64 = options.base64;
    this.options.recursive = options.recursive;
    this.options.withId = options.withId;
    return this;
  }
  /**
   * Get a character of the current wiki according to its name, considering the options provided.
   * Must be called before the exec method and any other method.
   * @param {string} name - The name of the character to get.
   * @param { { base64: boolean, withId: boolean } } [options] - The options of the getCharacters method.
   * @returns The character of the wiki.
   * @throws Error if the name is not provided.
   * @example
   * ```ts
   * const character = await scraper.findByName('Tanjiro Kamado', { base64: true, withId: true }).exec();
   * ```
   */
  findByName(name, options) {
    this.reset();
    if (name.trim().length == 0) throw new Error("Name must be provided");
    this.name = formatName(name);
    this.method = "findByName";
    this.options.base64 = options.base64;
    this.options.withId = options.withId;
    return this;
  }
  /**
   * Get a character of the current wiki according to its id, considering the options provided.
   * Must be called before the exec method and any other method.
   * @param {number} id - The id of the character to get.
   * @param { { base64: boolean } } [options] - The options of the getCharacters method.
   * @returns The character of the wiki.
   * @throws Error if the id is less than 1.
   * @example
   * ```ts
   * const character = await scraper.findById(1, { base64: true }).exec();
   * ```
   */
  findById(id, options) {
    if (id < 1) throw new Error("Id must be greater than 0");
    this.id = id;
    this.method = "findById";
    this.reset();
    this.options.base64 = options.base64;
    return this;
  }
  /**
   * Execute the method previously called. Must be called after all the methods to get the result.
   * @returns The result of the method previously called.
   * @throws Error if the method is not valid.
   * @example
   * ```ts
   * const characters = await scraper.findAll({ base64: true, recursive: true, withId: true }).limit(100).attributes('name images').exec();
   * ```
   */
  async exec() {
    try {
      switch (this.method) {
        case "find":
          await this.getCharactersPage(this._schema.url);
          return await this._getAll(this.options);
        case "findByName":
          return await this._getByName(this.name, { base64: this.options.base64 ?? false, withId: this.options.withId ?? true, attributes: this.options.attributes ?? [] });
        case "findById":
          return await this._getById(this.id, { base64: this.options.base64 || false, attributes: this.options.attributes || [] });
        default:
          throw new Error("Invalid method");
      }
    } catch (err) {
      console.error(err);
    }
    return [];
  }
  /**
   * Get a character of the current wiki according to its name, considering the options provided.
   * @param {IGetCharacterOptions} [options] - The options of the getCharacter method.
   * @returns The character of the wiki.
   * @throws Error if the name is not provided.
   * @throws Error if the character is not found.
   * @example
   * ```ts
   * const character = await scraper.getByName({ name: 'Goku', base64: true, withId: true });
   * ```
   * @deprecated Use the findByName method instead.
   */
  async getByName(options = { name: "", base64: false, withId: true }) {
    try {
      if (options.name?.trim()?.length === 0) throw new Error("Name must be provided");
      const name = formatName(options.name || "");
      const url = this.getWikiUrl() + formatForUrl(name);
      const data = {
        name,
        url: this.getWikiUrl() + formatForUrl(name)
      };
      return this.fetchPage(url).then(async (page) => {
        const isValidCharacter = this.isValidCharacterPage(page);
        if (!isValidCharacter) {
          const switchName = formatName(name.split(" ").reverse().join(" "));
          const url2 = this.getWikiUrl() + formatForUrl(switchName);
          return this.fetchPage(url2).then(async (page2) => {
            const isValidCharacter2 = this.isValidCharacterPage(page2);
            if (!isValidCharacter2) {
              throw new Error(`This character does not exists: ${name}`);
            } else {
              data.url = url2;
              return await this.formatCharacterData(page2, options, data);
            }
          }).catch((err) => {
            throw new Error(`Error while fetching ${url2}: ${err}`);
          });
        } else {
          return await this.formatCharacterData(page, options, data);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }
  async _getByName(name, options) {
    try {
      const url = this.getWikiUrl() + formatForUrl(name);
      const data = {
        name,
        url: this.getWikiUrl() + formatForUrl(name)
      };
      return this.fetchPage(url).then(async (page) => {
        const isValidCharacter = this.isValidCharacterPage(page);
        if (!isValidCharacter) {
          const switchName = formatName(name.split(" ").reverse().join(" "));
          const url2 = this.getWikiUrl() + formatForUrl(switchName);
          return this.fetchPage(url2).then(async (page2) => {
            const isValidCharacter2 = this.isValidCharacterPage(page2);
            if (!isValidCharacter2) {
              throw new Error(`This character does not exists: ${name}`);
            } else {
              data.url = url2;
              return await this.formatCharacterData(page2, options, data);
            }
          }).catch((err) => {
            throw new Error(`Error while fetching ${url2}: ${err}`);
          });
        } else {
          return await this.formatCharacterData(page, options, data);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }
  /**
   * Get a character of the current wiki by its id, considering the options provided.
   * @param {number} id - The id of the character.
   * @param {IGetCharacterOptions} [options] - The options of the getCharacter method.
   * @returns The character of the wiki.
   * @throws Error if the id is less than 1.
   * @throws Error if the character does not exists.
   * @example
   * ```ts
   * const scraper = new FandomScraper({ name: 'dragon-ball' });
   * const character = await scraper.getById(1, { base64: true, withId: true });
   * ```
   * @deprecated Use the findById method instead.
   */
  async getById(id, options = { name: "", base64: false, withId: true }) {
    try {
      if (id < 1) throw new Error("Id must be greater than 0");
      return this._getById(id, options);
    } catch (err) {
      console.error(err);
    }
  }
  async _getById(id, options) {
    const url = this.getWikiUrl() + `?curid=${id}`;
    const data = {
      url
    };
    return this.fetchPage(url).then(async (page) => {
      const name = page.querySelector(".mw-page-title-main")?.textContent || "";
      data.name = name;
      const characterData = await this.formatCharacterData(page, options, data);
      if (!this.isValidCharacterPage(page)) {
        throw new Error(`This character with this id does not exists: ${id}`);
      }
      return characterData;
    });
  }
  /**
   * Get all the available wikis of the FandomScraper class.
   * @returns The available wikis.
   */
  getAvailableWikis() {
    return availableWikis.map((wiki) => ({
      name: wiki,
      lang: "en"
    }));
  }
  async _getOne(page, options) {
    const characterData = await this.parseCharacterPage(page, options.base64, options.attributes);
    if (options.withId) {
      const id = this.extractPageId(page);
      characterData.id = id;
    }
    return characterData;
  }
  async formatCharacterData(page, options, data) {
    const character = await this._getOne(page, options);
    if (options.withId) {
      data.id = character.id;
      character.id = undefined;
    }
    data.data = character;
    return data;
  }
  /**
   * Get all the characters of the current wiki, considering the options provided.
   * Works only for the classic characters page format.
   * @param {IGetCharactersOptionsDeprecated} [options] - The options of the getCharacters method.
   * @returns The characters of the wiki.
   */
  async _getAll(options) {
    const data = [];
    let hasNext = true;
    let offset = 0;
    let count = 0;
    while (hasNext && count < options.limit) {
      const elements = this.getElementAccordingToFormat(options.ignore);
      for (const element of elements) {
        var characterData = {};
        if (offset >= options.offset) {
          const url = this.getUrlAccordingToFormat(element);
          const name = element.textContent;
          if (!name) throw new Error("No name found");
          if (options.recursive || options.withId) {
            const characterPage = await this.fetchPage(new URL(url, this.getWikiUrl()).href);
            if (options.recursive) {
              characterData = await this.parseCharacterPage(characterPage, options.base64, options.attributes);
            }
            if (options.withId) {
              const id = this.extractPageId(characterPage);
              data.push({ id, url, name, data: characterData });
            } else {
              data.push({ url, name, data: characterData });
            }
          } else {
            data.push({ url, name });
          }
          count++;
          if (!options.recursive) {
            data[data.length - 1].data = undefined;
          }
          if (!options.withId) {
            data[data.length - 1].id = undefined;
          }
          if (count == options.limit) {
            return data;
          }
        }
        offset++;
      }
      const nextElement = this._CharactersPage.getElementsByClassName(allCharactersPage[this._schema.pageFormat].next.value)[0];
      if (!nextElement) {
        hasNext = false;
      } else {
        const nextUrl = nextElement.getAttribute("href");
        if (!nextUrl) {
          hasNext = false;
        } else {
          await this.getCharactersPage(nextUrl);
        }
      }
    }
    return data;
  }
  /**
   * Count the number of characters of the current wiki and return the number.
   * @returns The number of characters of the wiki.
   * @async
   */
  async count() {
    var count = 0;
    try {
      let hasNext = true;
      await this.getCharactersPage(this._schema.url);
      while (hasNext) {
        count += this.getElementAccordingToFormat().length;
        const nextElement = this._CharactersPage.getElementsByClassName(allCharactersPage[this._schema.pageFormat].next.value)[0];
        if (!nextElement) {
          hasNext = false;
        } else {
          const nextUrl = nextElement.getAttribute("href");
          if (!nextUrl) {
            hasNext = false;
          } else {
            await this.getCharactersPage(nextUrl);
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
    return count;
  }
  async parseCharacterPage(page, getBase64, attributes) {
    const format = this._schema.dataSource;
    const data = {};
    if (attributes) {
      attributes = attributes.filter((attribute) => Object.keys(format).includes(attribute));
    }
    if (!attributes || attributes.length === 0) {
      attributes = Object.keys(format);
    }
    this.isOldVersion = this.setPageVersion(page);
    for (const key in format) {
      if (attributes.includes(key) || this.keysAttrToArray.includes(key)) {
        const sourceKey = format[key];
        if (!sourceKey) {
          continue;
        }
        if (key === "images") {
          const elements = format.images?.get(page);
          if (!elements) {
            continue;
          }
          const images = [];
          for (const element of elements) {
            let src = element.getAttribute("src");
            if (src?.startsWith("data:image")) {
              const attributes2 = element.attributes;
              for (const attribute of attributes2) {
                if (attribute.value.startsWith("http")) {
                  src = attribute.value;
                  break;
                }
              }
            }
            if (!src) {
              console.error(`No src found for key ${key}`);
              continue;
            }
            src = extractImageURL(src);
            if (format.images?.ignore?.includes(src))
              continue;
            if (getBase64) {
              const b64 = await this.convertImageToBase64(src);
              images.push(b64);
            } else {
              images.push(src);
            }
          }
          data[key] = images;
        } else {
          const element = this.getDataAccordingToVersion(page, sourceKey);
          if (!element) {
            continue;
          }
          const value = this.setValue(element, this.keysAttrToArray.includes(key));
          if (!value || value.length === 0) {
            continue;
          }
          data[key] = value;
        }
      }
    }
    return data;
  }
  setValue(element, inAttrToArray) {
    if (inAttrToArray) {
      let value = [element.innerHTML];
      value = value.flatMap(
        (item) => item.split(/<br\s*\/?>|<li[^>]*>/).map((value2) => removeBrackets(value2))
      );
      for (let i = 0; i < value.length; i++) {
        const decodedValue = value[i].replace(/<[^>]*>?/gm, "").replace(/&nbsp;/g, " ").replace(/&lt;br\s*\/?&gt;/g, "");
        value[i] = decodedValue.trim();
      }
      const filteredValue = value.filter((value2) => value2 !== "");
      return filteredValue;
    } else {
      return removeBrackets(element.textContent || "");
    }
  }
  /**
   * Convert the image from the given URL to a base64 string
   * Due to somes issues about CORS, this method is sometimes necessary to print the image in your application
   * @param {string} imageUrl The URL of the image to convert
   * @returns The base64 string of the image
   * @throws An error if the image cannot be fetched or converted
   */
  async convertImageToBase64(imageUrl) {
    try {
      const response = await fetch(imageUrl);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Image = buffer.toString("base64");
      return base64Image;
    } catch (error) {
      console.error("Error fetching or converting image:", error);
      throw error;
    }
  }
  /**
   * Remove the elements from the characters list that contains one of the banned substring
   * @param {HTMLCollectionOf<Element>} elements The elements to filter
   * @param {string[]} banList The list of substring to ban
   * @returns The filtered elements
   */
  filterBannedElement(elements, ignore) {
    const elementsArray = Array.from(elements);
    return elementsArray.filter((element) => {
      const innerText = element.textContent?.toLowerCase() ?? "";
      return !ignore.some((substring) => innerText.includes(substring.toLowerCase()));
    });
  }
  /**
   * 
   * Get the data from the infobox according to if the wiki is in the old version or not
   * @param page
   * @param key
   * @returns The data from the page according to the old version of the wiki
   * 
   */
  getDataAccordingToVersion(page, key) {
    if (this.isOldVersion) {
      const identifier = ".mw-parser-output";
      const tdElement = Array.from(page.querySelectorAll(identifier + " td")).find((td) => {
        return td?.textContent?.includes(String(key));
      });
      if (tdElement?.nextElementSibling) {
        return tdElement?.nextElementSibling;
      }
      const thElement = Array.from(page.querySelectorAll(identifier + " th")).find((th) => {
        return th?.textContent?.includes(String(key));
      });
      if (thElement?.nextElementSibling) {
        return thElement.nextElementSibling;
      }
      return null;
    } else {
      return page.querySelector(`[data-source="${key}"] .pi-data-value`);
    }
  }
  extractPageId(page) {
    const allScripts = page.getElementsByTagName("script");
    const script = Array.from(allScripts).find((script2) => script2.textContent?.includes("pageId"))?.textContent;
    if (!script) {
      return 0;
    }
    const regex = /"pageId":(\d+)/;
    const match = script.match(regex);
    if (match && match.length > 1)
      return parseInt(match[1], 10);
    return 0;
  }
  getElementAccordingToFormat(ignore) {
    const ignoreList = ignore ? [...ignore, ...allCharactersPage.classic.ignore] : allCharactersPage.classic.ignore;
    if (this._schema.pageFormat === "classic") {
      const value = allCharactersPage.classic.listCharactersElement.value;
      return this.filterBannedElement(this._CharactersPage.getElementsByClassName(value), ignoreList);
    } else if (this._schema.pageFormat === "table-1") {
      return this._CharactersPage.querySelectorAll("table.wikitable td:nth-child(2) a");
    } else if (this._schema.pageFormat === "table-2") {
      return this._CharactersPage.querySelectorAll("small > b");
    } else if (this._schema.pageFormat === "table-3") {
      return this._CharactersPage.querySelectorAll("table.fandom-table td:nth-child(2)");
    }
    throw new Error("Invalid page format");
  }
  getUrlAccordingToFormat(element) {
    if (this._schema.pageFormat === "classic") {
      const url = this.getDataUrl(element.getAttribute("href"));
      if (!url) throw new Error("No URL found");
      return url;
    } else if (this._schema.pageFormat === "table-1") {
      const url = this.getDataUrl(element.getAttribute("href"));
      if (!url) throw new Error("No URL found");
      return url;
    } else if (this._schema.pageFormat === "table-2") {
      const aElement = element.querySelector("a");
      if (!aElement) throw new Error("No <a> element found");
      const url = this.getDataUrl(aElement.getAttribute("href"));
      if (!url) throw new Error("No URL found");
      return url;
    } else if (this._schema.pageFormat === "table-3") {
      const aElement = element.querySelector("a");
      if (!aElement) throw new Error("No <a> element found");
      const url = this.getDataUrl(aElement.getAttribute("href"));
      if (!url) throw new Error("No URL found");
      return url;
    }
    return "";
  }
  isValidCharacterPage(page) {
    if (!page) {
      return false;
    }
    const id = this.extractPageId(page);
    if (id === 0) {
      return false;
    }
    const pageString = page.documentElement.innerHTML;
    const parsedUrl = new URL(this._schema.url);
    const path = parsedUrl.pathname;
    if (!pageString.includes(path)) {
      return false;
    }
    return true;
  }
  setPageVersion(page) {
    return page.querySelectorAll(".pi-data-value") === null || page.querySelectorAll(".pi-data-value").length < 2;
  }
  getWikiUrl() {
    const urlParts = this._schema.url.split("/");
    urlParts.pop();
    return urlParts.join("/") + "/";
  }
  getDataUrl(href) {
    const domain = new URL(this._schema.url).origin;
    return domain + href;
  }
};
var FandomPersonalScraper = class extends FandomScraper {
  constructor(schema) {
    super("one-piece", { lang: "en" });
    if (!schema.url || !schema.pageFormat || !schema.dataSource) {
      throw new Error("The schema you provided is not valid");
    }
    if (schema.dataSource.images) {
      if (!schema.dataSource.images.get || !schema.dataSource.images.identifier) {
        throw new Error("The schema you provided is not valid");
      }
    }
    this._schema = schema;
  }
};

export { FandomPersonalScraper, FandomScraper, availableWikis };
