import { JSDOM } from 'jsdom';

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
  quote: {
    identifier: 'table[border="0"] tbody tr td div',
    get: function(page) {
      return page.querySelector('table[border="0"] tbody tr td div');
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

// wikia/kimetsu-no-yaiba/data-source.ts
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
  quote: {
    identifier: 'table[style*="rgba(210, 179, 148, 0.46)"] tbody tr:first-child td:nth-child(2)',
    get: function(page) {
      return page.querySelector('table[style*="rgba(210, 179, 148, 0.46)"] tbody tr:first-child td:nth-child(2)');
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
  quote: {
    identifier: 'table[style*="rgba(210, 179, 148, 0.46)"] tbody tr:first-child td:nth-child(2)',
    get: function(page) {
      return page.querySelector('table[style*="rgba(210, 179, 148, 0.46)"] tbody tr:first-child td:nth-child(2)');
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

// wikia/kimetsu-no-yaiba/schemas.ts
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

// wikia/kimetsu-no-yaiba/index.ts
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

// wikia/fumetsu-no-anata-e/data-source.ts
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
  quote: {
    identifier: "#Quotes",
    get: function(page) {
      const quotesHeading = page.querySelector("span#Quotes");
      if (!quotesHeading) return null;
      const h2 = quotesHeading.closest("h2");
      if (!h2) return null;
      let next = h2.nextElementSibling;
      while (next && next.tagName.toLowerCase() !== "ul") {
        next = next.nextElementSibling;
      }
      return next;
    }
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

// wikia/fumetsu-no-anata-e/schemas.ts
var FumetsuEN = {
  url: "https://fumetsunoanatae.fandom.com/wiki/Category:Characters",
  pageFormat: "classic",
  dataSource: FumetsuENDataSource
};

// wikia/fumetsu-no-anata-e/index.ts
var Fumetsu = {
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
  quote: {
    identifier: "#Citations",
    get: function(page) {
      const heading = page.querySelector("span#Citations");
      if (!heading) return null;
      const h2 = heading.closest("h2");
      if (!h2) return null;
      let next = h2.nextElementSibling;
      while (next && next.tagName.toLowerCase() !== "ul") {
        next = next.nextElementSibling;
      }
      return next;
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
  quote: {
    identifier: "#Quotes",
    get: function(page) {
      const quotesHeading = page.querySelector("span#Quotes");
      if (!quotesHeading) return null;
      const h2 = quotesHeading.closest("h2");
      if (!h2) return null;
      let next = h2.nextElementSibling;
      while (next && next.tagName.toLowerCase() !== "ul") {
        next = next.nextElementSibling;
      }
      return next;
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
  quote: {
    identifier: "table.noprint tbody tr:first-child td:nth-child(2)",
    get: function(page) {
      return page.querySelector("table.noprint tbody tr:first-child td:nth-child(2)");
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
  quote: {
    identifier: "div.quote",
    get: function(page) {
      return page.querySelector("div.quote");
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
  quote: {
    identifier: "blockquote.snippet",
    get: function(page) {
      return page.querySelector("blockquote.snippet");
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
  quote: {
    identifier: "table.cquote tbody tr:first-child td:nth-child(2)",
    get: function(page) {
      return page.querySelector("table.cquote tbody tr:first-child td:nth-child(2)");
    }
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
    ignore: [
      "https://static.wikia.nocookie.net/jjba/images/d/d5/NoPicAvailable.png",
      "https://static.wikia.nocookie.net/jjba/images/b/b1/NoPicAv.png",
      "https://static.wikia.nocookie.net/jjba/images/9/9e/Flag_of_Japan.svg",
      "https://static.wikia.nocookie.net/jjba/images/a/a4/Flag_of_the_United_States.svg"
    ]
  },
  quote: {
    identifier: "table.cquote tbody tr:first-child td:nth-child(2)",
    get: function(page) {
      return page.querySelector("table.cquote tbody tr:first-child td:nth-child(2)") ?? null;
    }
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

// wikia/dororo/data-source.ts
var DororoENDataSource = {
  kanji: "japanese name",
  age: "age",
  gender: "gender",
  species: "species",
  status: "status",
  height: "height",
  weight: "weight",
  eyeColor: "eyes",
  hairColor: "hair",
  images: {
    identifier: ".pi-image img",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    }
  },
  quote: {
    identifier: "blockquote",
    get: function(page) {
      return page.querySelector("blockquote");
    }
  },
  episode: "debut",
  relatives: "relatives",
  voiceActor: "voice eng",
  seiyu: "voice"
};

// wikia/dororo/schemas.ts
var DororoEN = {
  url: "https://dororo.fandom.com/wiki/Category:Characters",
  pageFormat: "classic",
  dataSource: DororoENDataSource
};

// wikia/dororo/index.ts
var Dororo = {
  en: DororoEN
};

// wikia/shingeki-no-kyojin/data-source.ts
var ShingekiFRDataSource = {
  name: "Nom",
  gender: "Genre",
  age: "\xC2ge",
  kanji: "Kanji",
  birthday: "Anniversaire",
  height: "Taille",
  weight: "Poids",
  species: "Esp\xE8ces",
  images: {
    identifier: ".pi-item .pi-image-thumbnail",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    }
  },
  quote: {
    identifier: ".cquote tr i",
    get: function(page) {
      return page.querySelector(".cquote tr i");
    }
  },
  episode: "Premi\xE8re Anim\xE9",
  manga: "Premi\xE8re Manga",
  seiyu: "Voix Anim\xE9",
  voiceActor: "Voix Anim\xE9 fr",
  status: "Statut",
  affiliation: "Affiliation",
  relatives: "Affili\xE9s"
};
var ShingekiENDataSource = {
  gender: "Gender",
  kanji: "Kanji",
  birthday: "Birthday",
  height: "Height",
  weight: "Weight",
  relatives: "Relatives",
  images: {
    identifier: ".pi-item .pi-image-thumbnail",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    },
    ignore: [
      "https://static.wikia.nocookie.net/shingekinokyojin/images/a/a7/Survey_Corps_Logo.png",
      "https://static.wikia.nocookie.net/shingekinokyojin/images/5/55/Garrison_Logo.png",
      "https://static.wikia.nocookie.net/shingekinokyojin/images/a/a9/104th_Trainees_Squad_Logo.png",
      "https://static.wikia.nocookie.net/shingekinokyojin/images/4/4c/Brigade_Logo.png"
    ]
  },
  manga: "Debut chapter",
  seiyu: "Voice actor",
  status: "Status",
  affiliation: "Affiliation"
};

// wikia/shingeki-no-kyojin/schemas.ts
var ShingekiFR = {
  url: "https://attaque-des-titans.fandom.com/fr/wiki/Cat%C3%A9gorie:Humains",
  pageFormat: "classic",
  dataSource: ShingekiFRDataSource
};
var ShingekiEN = {
  url: "https://attackontitan.fandom.com/wiki/List_of_characters/Anime",
  pageFormat: "table-4",
  dataSource: ShingekiENDataSource
};

// wikia/shingeki-no-kyojin/index.ts
var Shingeki = {
  fr: ShingekiFR,
  en: ShingekiEN
};

// wikia/koe-no-katachi/data-source.ts
var SilentVoiceFRDataSource = {
  name: "nom",
  age: "\xE2ge",
  birthday: "naissance",
  zodiac: "signe",
  gender: "genre",
  bloodType: "groupesanguin",
  relatives: "parent\xE9",
  occupations: "occupation",
  affiliation: "\xE9tudes",
  manga: "manga",
  images: {
    identifier: ".pi-image-thumbnail",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    }
  },
  voiceActor: "voix"
};
var SilentVoiceENDataSource = {
  age: "age",
  birthday: "birthday",
  zodiac: "sign",
  gender: "gender",
  height: "height",
  bloodType: "bloodtype",
  relatives: "relatives",
  occupations: "occupation",
  affiliation: "affiliation",
  manga: "manga",
  voiceActor: "voice_actor",
  images: {
    identifier: ".pi-image-thumbnail",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    }
  },
  quote: {
    identifier: "dl",
    get: function(page) {
      const dl = page.querySelector("dl");
      if (!dl) return null;
      dl.querySelectorAll("b").forEach((b) => b.remove());
      return dl;
    }
  }
};

// wikia/koe-no-katachi/schemas.ts
var SilentVoiceFR = {
  url: "https://koenokatachi.fandom.com/fr/wiki/Cat%C3%A9gorie:Personnages",
  pageFormat: "classic",
  dataSource: SilentVoiceFRDataSource
};
var SilentVoiceEN = {
  url: "https://koenokatachi.fandom.com/wiki/Category:Characters",
  pageFormat: "classic",
  dataSource: SilentVoiceENDataSource
};

// wikia/koe-no-katachi/index.ts
var SilentVoice = {
  fr: SilentVoiceFR,
  en: SilentVoiceEN
};

// wikia/hellsing/data-source.ts
var HellsingENDataSource = {
  age: "age",
  gender: "gender",
  height: "height",
  species: "species",
  status: "status",
  affiliation: "affiliation",
  relatives: "family",
  manga: "firstmanga",
  episode: "firstova",
  seiyu: "japanactor",
  voiceActor: "voiceactor",
  images: {
    identifier: ".pi-item .pi-image-thumbnail",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    }
  }
};

// wikia/hellsing/schemas.ts
var HellsingEN = {
  url: "https://hellsing.fandom.com/wiki/Category:Characters",
  pageFormat: "classic",
  dataSource: HellsingENDataSource
};

// wikia/hellsing/index.ts
var Hellsing = {
  en: HellsingEN
};

// wikia/smurf/data-source.ts
var SmurfFRDataSource = {
  name: "nom",
  species: "esp\xE8ce",
  gender: "sexe",
  images: {
    identifier: ".pi-image .pi-image-thumbnail",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    }
  },
  episode: "premier \xE9pisode",
  age: "\xE2ge",
  occupations: "profession",
  voiceActor: "acteur",
  relatives: "amis"
};
var SmurfENDataSource = {
  species: "race",
  gender: "gender",
  images: {
    identifier: ".pi-image-thumbnail",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    }
  },
  episode: "firt",
  voiceActor: "voice actor",
  occupations: "occupation"
};

// wikia/smurf/schemas.ts
var SmurfEN = {
  url: "https://smurfs.fandom.com/wiki/Category:Smurfs_Characters",
  pageFormat: "classic",
  dataSource: SmurfENDataSource
};
var SmurfFR = {
  url: "https://schtroumpfs.fandom.com/fr/wiki/Cat%C3%A9gorie:Personnages",
  pageFormat: "classic",
  dataSource: SmurfFRDataSource
};

// wikia/smurf/index.ts
var Smurf = {
  fr: SmurfFR,
  en: SmurfEN
};

// wikia/rick-and-morty/data-source.ts
var RickAndMortyFRDataSource = {
  name: "nom",
  species: "esp\xE8ce",
  gender: "genre",
  status: "statut",
  images: {
    identifier: ".pi-image .pi-image-thumbnail",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    }
  },
  episode: "premi\xE8re_apparition",
  age: "\xE2ge",
  occupations: "occupation",
  voiceActor: "voix",
  relatives: "famille"
};
var RickAndMortyENDataSource = {
  species: "species",
  gender: "gender",
  age: "age",
  status: "status",
  occupations: "job",
  affiliation: "affiliation",
  relatives: "family",
  images: {
    identifier: ".pi-image-thumbnail",
    get: function(page) {
      return page.querySelectorAll(this.identifier);
    }
  },
  episode: "firt",
  voiceActor: "voice actor"
};

// wikia/rick-and-morty/schemas.ts
var RickAndMortyEN = {
  url: "https://rickandmorty.fandom.com/wiki/Category:Characters",
  pageFormat: "classic",
  dataSource: RickAndMortyENDataSource
};
var RickAndMortyFR = {
  url: "https://rick-et-morty.fandom.com/fr/wiki/Cat%C3%A9gorie:Personnages",
  pageFormat: "classic",
  dataSource: RickAndMortyFRDataSource
};

// wikia/rick-and-morty/index.ts
var RickAndMorty = {
  fr: RickAndMortyFR,
  en: RickAndMortyEN
};

// wikia/death-parade/data-source.ts
var DeathParadeENDataSource = {
  kanji: "kanji",
  romaji: "romaji",
  gender: "gender",
  age: "age",
  height: "height",
  hairColor: "hair",
  eyeColor: "eye",
  weight: "weight",
  status: "status",
  occupations: "occupation",
  affiliation: "affiliation",
  images: {
    identifier: ".pi-image .pi-image-thumbnail",
    get: function(page) {
      return Array.from(page.querySelectorAll(this.identifier));
    }
  },
  quote: {
    identifier: "h2:has(span#Quotes) + ul li",
    get: function(page) {
      const quoteSection = page.querySelector('h2:has(span#Quotes), h2:has(span.mw-headline[id="Quotes"])');
      if (!quoteSection) return null;
      const quotesList = quoteSection.nextElementSibling;
      if (quotesList && quotesList.tagName === "UL") {
        return quotesList.querySelector("li");
      }
      return null;
    }
  },
  episode: "debut",
  bloodType: "blood",
  seiyu: "jvoice",
  voiceActor: "evoice"
};

// wikia/death-parade/schemas.ts
var DeathParadeEN = {
  url: "https://death-parade.fandom.com/wiki/Category:Characters",
  pageFormat: "classic",
  dataSource: DeathParadeENDataSource
};

// wikia/death-parade/index.ts
var DeathParade = {
  en: DeathParadeEN
};

// wikia/index.ts
var Schemas = {
  "berserk": Berserk,
  "death-note": DeathNote,
  "death-parade": DeathParade,
  "kimetsu-no-yaiba": DemonSlayer,
  "koe-no-katachi": SilentVoice,
  "dororo": Dororo,
  "dragon-ball": DragonBall,
  "fumetsu-no-anata-e": Fumetsu,
  "hellsing": Hellsing,
  "naruto": Naruto,
  "jojo": Jojo,
  "one-piece": OnePiece,
  "rick-and-morty": RickAndMorty,
  "promised-neverland": PromisedNeverland,
  "shiki": Shiki,
  "shingeki-no-kyojin": Shingeki,
  "smurf": Smurf
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
  },
  "table-4": {
    banList: [],
    next: {
      type: "",
      value: ""
    }
  },
  "table-5": {
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
  "berserk",
  "death-note",
  "death-parade",
  "dororo",
  "dragon-ball",
  "fumetsu-no-anata-e",
  "hellsing",
  "jojo",
  "kimetsu-no-yaiba",
  "koe-no-katachi",
  "naruto",
  "one-piece",
  "rick-and-morty",
  "shiki",
  "shingeki-no-kyojin",
  "smurf",
  "promised-neverland"
];
var PageFetcher = class {
  /**
   * Fetch a page from a URL and return its document
   * @param url - The URL to fetch
   * @returns The document of the fetched page
   */
  async fetchPage(url) {
    const text = await fetch(url).then(async (res) => {
      const text2 = await res.text();
      return text2;
    }).catch((err) => {
      throw new Error(`Error while fetching ${url}: ${err}`);
    });
    return new JSDOM(text, { url, contentType: "text/html", referrer: url }).window.document;
  }
};

// utils/extractImageURL.ts
function extractImageURL(url) {
  const regex = /^(https?:\/\/.*\.(?:png|jpe?g|gif|bmp|svg|webp|tiff?))(?=[\/?]|$)/i;
  const match = url.match(regex);
  return match ? match[1] : url;
}

// utils/imageUtils.ts
async function convertImageToBase64(imageUrl) {
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

// utils/validationUtils.ts
function isValidCharacterPage(page, schemaUrl, extractPageIdFn) {
  if (!page) {
    return false;
  }
  const id = extractPageIdFn(page);
  if (id === 0) {
    return false;
  }
  const pageString = page.documentElement.innerHTML;
  const parsedUrl = new URL(schemaUrl);
  const path = parsedUrl.pathname;
  if (!pageString.includes(path)) {
    return false;
  }
  return true;
}
function setPageVersion(page) {
  return page.querySelectorAll(".pi-data-value") === null || page.querySelectorAll(".pi-data-value").length < 2;
}

// services/DataExtractor.ts
var DataExtractor = class {
  /**
   * Extract page ID from a page document
   * @param page - The page document
   * @returns The page ID, or 0 if not found
   */
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
  /**
   * Extract data from the infobox according to the page version (old or new)
   * @param page - The page document
   * @param key - The data source key
   * @param isOldVersion - Whether the page uses the old infobox format
   * @returns The element containing the data, or null if not found
   */
  getDataAccordingToVersion(page, key, isOldVersion) {
    if (isOldVersion) {
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
  /**
   * Set the value from an element, either as a string or an array
   * @param element - The element to extract value from
   * @param inAttrToArray - Whether to return an array
   * @returns The extracted value
   */
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
   * Extract the quote text from a given DOM element
   * @param element - The DOM element from which to extract the quote
   * @returns The extracted quote as a string, or an array of quotes if the element is a list
   */
  extractQuoteFromElement(element) {
    if (element.tagName.toLowerCase() === "ul") {
      const quotes = [];
      element.querySelectorAll("li").forEach((li) => {
        const quote = this.extractQuoteFromElement(li);
        if (typeof quote === "string" && quote.length > 0) {
          quotes.push(quote);
        } else if (Array.isArray(quote)) {
          quotes.push(...quote);
        }
      });
      return quotes;
    }
    const citeElement = element.querySelector("cite, sup");
    let quoteText;
    if (citeElement) {
      const clone = element.cloneNode(true);
      const citeClone = clone.querySelector("cite, sup");
      if (citeClone) {
        citeClone.remove();
      }
      quoteText = clone.textContent?.trim() || "";
    } else {
      quoteText = element.textContent?.trim() || "";
    }
    return quoteText;
  }
};

// services/CharacterParser.ts
var CharacterParser = class {
  constructor() {
    this.dataExtractor = new DataExtractor();
  }
  /**
   * Parse a character page and extract all data according to the schema
   * @param page - The character page document
   * @param schema - The schema defining data sources
   * @param getBase64 - Whether to convert images to base64
   * @param keysAttrToArray - Keys that should be converted to arrays
   * @param attributes - Specific attributes to extract (optional)
   * @returns The parsed character data
   */
  async parseCharacterPage(page, schema, getBase64, keysAttrToArray, attributes) {
    const data = {};
    if (attributes) {
      attributes = attributes.filter((attribute) => Object.keys(schema).includes(attribute));
    }
    if (!attributes || attributes.length === 0) {
      attributes = Object.keys(schema);
    }
    const isOldVersion = setPageVersion(page);
    for (const key in schema) {
      if (attributes.includes(key) || keysAttrToArray.includes(key)) {
        const sourceKey = schema[key];
        if (!sourceKey) {
          continue;
        }
        if (key === "images") {
          const images = await this.parseImages(page, schema.images, getBase64);
          data[key] = images;
        } else if (key === "quote") {
          const quote = this.parseQuote(page, sourceKey);
          if (quote) {
            data["quote"] = quote;
          }
        } else {
          const element = this.dataExtractor.getDataAccordingToVersion(page, sourceKey, isOldVersion);
          if (!element) {
            continue;
          }
          const value = this.dataExtractor.setValue(element, keysAttrToArray.includes(key));
          if (!value || value.length === 0) {
            continue;
          }
          data[key] = value;
        }
      }
    }
    return data;
  }
  /**
   * Parse images from a character page
   * @param page - The page document
   * @param imagesConfig - The images configuration from schema
   * @param getBase64 - Whether to convert images to base64
   * @returns Array of image URLs or base64 strings
   */
  async parseImages(page, imagesConfig, getBase64) {
    if (!imagesConfig) {
      return [];
    }
    const elements = imagesConfig.get(page);
    if (!elements) {
      return [];
    }
    const images = [];
    for (const element of elements) {
      let src = element.getAttribute("src");
      if (src?.startsWith("data:image")) {
        const attributes = element.attributes;
        for (const attribute of attributes) {
          if (attribute.value.startsWith("http")) {
            src = attribute.value;
            break;
          }
        }
      }
      if (!src) {
        console.error(`No src found for images`);
        continue;
      }
      src = extractImageURL(src);
      if (imagesConfig.ignore?.includes(src))
        continue;
      if (getBase64) {
        const b64 = await convertImageToBase64(src);
        images.push(b64);
      } else {
        images.push(src);
      }
    }
    return images;
  }
  /**
   * Parse quote from a character page
   * @param page - The page document
   * @param sourceKey - The source key for the quote
   * @returns The parsed quote
   */
  parseQuote(page, sourceKey) {
    let quoteElement = null;
    if (sourceKey && typeof sourceKey === "object" && "get" in sourceKey) {
      quoteElement = sourceKey.get(page);
    } else if (typeof sourceKey === "string") {
      quoteElement = page.querySelector(sourceKey);
    }
    if (quoteElement) {
      return this.dataExtractor.extractQuoteFromElement(quoteElement);
    }
    return null;
  }
};

// services/QueryBuilder.ts
var QueryBuilder = class {
  constructor() {
    this.options = {
      base64: false,
      recursive: false,
      withId: true,
      limit: 50,
      offset: 0,
      ignore: [
        "Minor Characters",
        "Unnamed Characters",
        "Citoyen d'Honneur de Mahr",
        "Allies",
        "Attack on Titan Character Encyclopedia FINAL/Civilians",
        "Attack on Titan Character Encyclopedia FINAL/Garrison",
        "Attack on Titan Character Encyclopedia FINAL/Marleyan military"
      ],
      attributes: []
    };
    this.keysAttrToArray = [];
  }
  /**
   * Reset options to default values
   */
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
    this.keysAttrToArray = [];
  }
  /**
   * Set the limit of characters to get
   * @param limit - The limit value
   */
  setLimit(limit) {
    if (limit < 1) {
      throw new Error("Limit must be greater than 0");
    }
    this.options.limit = limit;
  }
  /**
   * Set the offset of characters to get
   * @param offset - The offset value
   */
  setOffset(offset) {
    if (offset < 0) {
      throw new Error("Offset must be greater than 0");
    }
    this.options.offset = offset;
  }
  /**
   * Set the ignored substrings in the characters names
   * @param ignore - The substrings to ignore
   */
  setIgnore(ignore) {
    if (!Array.isArray(ignore)) {
      throw new Error("Ignore parameter must be an array");
    }
    this.options.ignore = ignore;
  }
  /**
   * Set the attributes to get in the characters
   * @param attributes - The attributes string (space-separated)
   */
  setAttributes(attributes) {
    if (typeof attributes !== "string") {
      throw new Error("Attributes parameter must be a string");
    }
    attributes = attributes.replace(/\s\s+/g, " ")?.trim();
    this.options.attributes = attributes.split(" ");
  }
  /**
   * Set the keys of the attributes that should be converted to an array
   * @param attributes - The attributes string (space-separated)
   */
  setAttrToArray(attributes) {
    if (typeof attributes !== "string") {
      throw new Error("Attributes to array parameter must be a string");
    }
    attributes = attributes.replace(/\s\s+/g, " ")?.trim();
    this.keysAttrToArray = attributes.split(" ");
  }
  /**
   * Set base64 option
   * @param base64 - Whether to get images in base64
   */
  setBase64(base64) {
    this.options.base64 = base64;
  }
  /**
   * Set recursive option
   * @param recursive - Whether to get all characters recursively
   */
  setRecursive(recursive) {
    this.options.recursive = recursive;
  }
  /**
   * Set withId option
   * @param withId - Whether to get the id of the character
   */
  setWithId(withId) {
    this.options.withId = withId;
  }
  /**
   * Get the current options
   * @returns The current query options
   */
  getOptions() {
    return this.options;
  }
  /**
   * Get the keys that should be converted to arrays
   * @returns The keys to convert to arrays
   */
  getKeysAttrToArray() {
    return this.keysAttrToArray;
  }
};

// utils/urlUtils.ts
function getWikiUrl(url) {
  const urlParts = url.split("/");
  urlParts.pop();
  return urlParts.join("/") + "/";
}
function getDataUrl(domain, href) {
  return domain + href;
}

// utils/elementUtils.ts
function filterBannedElement(elements, ignore) {
  const elementsArray = Array.from(elements);
  return elementsArray.filter((element) => {
    const innerText = element.textContent?.toLowerCase() ?? "";
    return !ignore.some((substring) => innerText.includes(substring.toLowerCase()));
  });
}
function getElementAccordingToFormat(page, pageFormat, ignore) {
  const ignoreList = ignore ? [...ignore, ...allCharactersPage.classic.ignore] : allCharactersPage.classic.ignore;
  if (pageFormat === "classic") {
    const value = allCharactersPage.classic.listCharactersElement.value;
    return filterBannedElement(page.getElementsByClassName(value), ignoreList);
  } else if (pageFormat === "table-1") {
    return page.querySelectorAll("table.wikitable td:nth-child(2) a");
  } else if (pageFormat === "table-2") {
    return page.querySelectorAll("small > b");
  } else if (pageFormat === "table-3") {
    return page.querySelectorAll("table.fandom-table td:nth-child(2)");
  } else if (pageFormat === "table-4") {
    return page.querySelectorAll(".characterbox th:nth-child(1) a");
  } else if (pageFormat === "table-5") {
    return page.querySelectorAll("table.wikitable.sortable td:nth-child(1) a");
  }
  throw new Error("Invalid page format");
}
function getUrlAccordingToFormat(element, pageFormat, getDataUrlFn) {
  if (pageFormat === "classic") {
    const url = getDataUrlFn(element.getAttribute("href"));
    if (!url) throw new Error("No URL found");
    return url;
  } else if (pageFormat === "table-1") {
    const url = getDataUrlFn(element.getAttribute("href"));
    if (!url) throw new Error("No URL found");
    return url;
  } else if (pageFormat === "table-2") {
    const aElement = element.querySelector("a");
    if (!aElement) throw new Error("No <a> element found");
    const url = getDataUrlFn(aElement.getAttribute("href"));
    if (!url) throw new Error("No URL found");
    return url;
  } else if (pageFormat === "table-3") {
    const aElement = element.querySelector("a");
    if (!aElement) throw new Error("No <a> element found");
    const url = getDataUrlFn(aElement.getAttribute("href"));
    if (!url) throw new Error("No URL found");
    return url;
  } else if (pageFormat === "table-4") {
    const url = getDataUrlFn(element.getAttribute("href"));
    if (!url) throw new Error("No URL found");
    return url;
  } else if (pageFormat === "table-5") {
    const url = getDataUrlFn(element.getAttribute("href"));
    if (!url) throw new Error("No URL found");
    return url;
  }
  return "";
}

// core/FandomScraper.ts
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
    this.name = "";
    this.id = 0;
    this.isOldVersion = false;
    if (!Object.keys(Schemas).includes(name)) throw new Error(`Invalid wiki name provided: ${name}`);
    this._schema = Schemas[name][options?.lang || "en"];
    this.wikiaParameters = {
      name,
      lang: options?.lang || "en"
    };
    this.pageFetcher = new PageFetcher();
    this.characterParser = new CharacterParser();
    this.dataExtractor = new DataExtractor();
    this.queryBuilder = new QueryBuilder();
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
    this.queryBuilder.setLimit(limit);
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
    this.queryBuilder.setOffset(offset);
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
    this.queryBuilder.setIgnore(ignore);
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
    this.queryBuilder.setAttributes(attributes);
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
    this.queryBuilder.setAttrToArray(attributes);
    return this;
  }
  /**
   * Get the characters page of the current wiki.
   * @param {string} url - The url of the characters page.
   * @returns The characters page of the wiki.
   * @example
   * ```ts
   * await scraper.getCharactersPage('https://kimetsu-no-yaiba.fandom.com/fr/wiki/Catégorie:Personnages');
   * ```
   */
  async getCharactersPage(url) {
    this._CharactersPage = await this.pageFetcher.fetchPage(url);
    this.isOldVersion = setPageVersion(this._CharactersPage);
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
    this.queryBuilder.reset();
    this.queryBuilder.setBase64(options.base64);
    this.queryBuilder.setRecursive(options.recursive);
    this.queryBuilder.setWithId(options.withId);
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
    this.queryBuilder.reset();
    if (name.trim().length == 0) throw new Error("Name must be provided");
    this.name = formatName(name);
    this.method = "findByName";
    this.queryBuilder.setBase64(options.base64);
    this.queryBuilder.setWithId(options.withId);
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
    this.queryBuilder.reset();
    this.queryBuilder.setBase64(options?.base64 || false);
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
      const options = this.queryBuilder.getOptions();
      switch (this.method) {
        case "find":
          await this.getCharactersPage(this._schema.url);
          return await this._getAll(options);
        case "findByName":
          return await this._getByName(this.name, { base64: options.base64 ?? false, withId: options.withId ?? true, attributes: options.attributes ?? [] });
        case "findById":
          return await this._getById(this.id, { base64: options.base64 || false, attributes: options.attributes || [] });
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
      return await this._getByName(name, {
        base64: options.base64 ?? false,
        withId: options.withId ?? true,
        attributes: options.attributes
      });
    } catch (err) {
      console.error(err);
    }
  }
  async _getByName(name, options) {
    try {
      const url = this.getWikiUrlInternal() + formatForUrl(name);
      const data = {
        name,
        url
      };
      return this.pageFetcher.fetchPage(url).then(async (page) => {
        const isValid = this.isValidCharacterPageInternal(page);
        if (!isValid) {
          const switchName = formatName(name.split(" ").reverse().join(" "));
          const url2 = this.getWikiUrlInternal() + formatForUrl(switchName);
          return this.pageFetcher.fetchPage(url2).then(async (page2) => {
            const isValid2 = this.isValidCharacterPageInternal(page2);
            if (!isValid2) {
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
  async getById(id, options = { name: "", base64: false }) {
    try {
      if (id < 1) throw new Error("Id must be greater than 0");
      return this._getById(id, options);
    } catch (err) {
      console.error(err);
    }
  }
  async _getById(id, options) {
    const url = this.getWikiUrlInternal() + `?curid=${id}`;
    const data = {
      url
    };
    return this.pageFetcher.fetchPage(url).then(async (page) => {
      const name = page.querySelector(".mw-page-title-main")?.textContent || "";
      data.name = name;
      const characterData = await this.formatCharacterData(page, options || { base64: false }, data);
      if (!this.isValidCharacterPageInternal(page)) {
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
    const characterData = await this.characterParser.parseCharacterPage(
      page,
      this._schema.dataSource,
      options.base64,
      this.queryBuilder.getKeysAttrToArray(),
      options.attributes
    );
    if (options.withId) {
      const id = this.dataExtractor.extractPageId(page);
      characterData.id = id;
    }
    return characterData;
  }
  async formatCharacterData(page, options, data) {
    const character = await this._getOne(page, options);
    if (options.withId) {
      data.id = character.id;
      character.id = void 0;
    }
    data.data = character;
    return data;
  }
  /**
   * Get all the characters of the current wiki, considering the options provided.
   * Works only for the classic characters page format.
   * @param {IGetCharactersOptions} [options] - The options of the getCharacters method.
   * @returns The characters of the wiki.
   */
  async _getAll(options) {
    const data = [];
    let hasNext = true;
    let offset = 0;
    let count = 0;
    while (hasNext && count < options.limit) {
      const elements = getElementAccordingToFormat(this._CharactersPage, this._schema.pageFormat, options.ignore);
      for (const element of elements) {
        var characterData = {};
        if (offset >= options.offset) {
          const url = getUrlAccordingToFormat(
            element,
            this._schema.pageFormat,
            (href) => getDataUrl(new URL(this._schema.url).origin, href)
          );
          const name = element.textContent;
          if (!name) throw new Error("No name found");
          if (options.recursive || options.withId) {
            const characterPage = await this.pageFetcher.fetchPage(new URL(url, this.getWikiUrlInternal()).href);
            if (options.recursive) {
              characterData = await this.characterParser.parseCharacterPage(
                characterPage,
                this._schema.dataSource,
                options.base64,
                this.queryBuilder.getKeysAttrToArray(),
                options.attributes
              );
            }
            if (options.withId) {
              const id = this.dataExtractor.extractPageId(characterPage);
              data.push({ id, url, name, data: characterData });
            } else {
              data.push({ url, name, data: characterData });
            }
          } else {
            data.push({ url, name });
          }
          count++;
          if (!options.recursive) {
            data[data.length - 1].data = void 0;
          }
          if (!options.withId) {
            data[data.length - 1].id = void 0;
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
        count += getElementAccordingToFormat(this._CharactersPage, this._schema.pageFormat).length;
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
  /**
   * Fetches a webpage from the specified URL and extracts quotes from it.
   *
   * The method retrieves the page content using the provided URL and extracts quote data
   * by using either a schema-defined selector or by querying for <blockquote> elements.
   * It then processes the found elements using an extraction method, handling both string
   * and array formats of the quote content, and returns a list of quotes as strings.
   *
   * @param url - The URL of the webpage from which to extract quotes.
   * @returns A promise that resolves to an array of quote strings.
   *
   * @throws Will throw an error if fetching the page or processing the quote extraction fails.
   */
  async getQuotes(url) {
    try {
      const page = await this.pageFetcher.fetchPage(url);
      const quotes = [];
      const dataSource = this._schema.dataSource.quote;
      if (dataSource) {
        let quoteElements = [];
        if (typeof dataSource === "object" && dataSource.get) {
          const element = dataSource.get(page);
          if (element) quoteElements.push(element);
        } else if (typeof dataSource === "string") {
          const elements = page.querySelectorAll(dataSource);
          quoteElements = Array.from(elements);
        }
        for (const element of quoteElements) {
          const quote = this.dataExtractor.extractQuoteFromElement(element);
          const finalQuote = typeof quote === "string" ? quote : quote.join(" ");
          quotes.push(finalQuote);
        }
      } else {
        const blockquotes = page.querySelectorAll("blockquote");
        blockquotes.forEach((blockquote) => {
          const quote = this.dataExtractor.extractQuoteFromElement(blockquote);
          const finalQuote = typeof quote === "string" ? quote : quote.join(" ");
          quotes.push(finalQuote);
        });
      }
      return quotes;
    } catch (err) {
      console.error("Erreur dans getQuotes:", err);
      throw err;
    }
  }
  isValidCharacterPageInternal(page) {
    return isValidCharacterPage(page, this._schema.url, (p) => this.dataExtractor.extractPageId(p));
  }
  getWikiUrlInternal() {
    return getWikiUrl(this._schema.url);
  }
};

// core/FandomPersonalScraper.ts
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
