# FandomScraper
![logo](https://github.com/dilaouid/FandomScraper/blob/media/logo.png?raw=true)

*First of all, this project wouldn't exist without the hard work of the wiki maintainers. It involves a lot of effort, and this project does not aim to devalue or exploit their work*

## Introduction

**FandomScraper** is a TypeScript library working a **NodeJS** environment designed to simplify and accelerate the process of scraping character lists and informations from various Fandom wikias. With this library, you can effortlessly retrieve data from any Fandom wiki, making it quick and easy to access informations about characters. FandomScraper is highly scalable, allowing for seamless integration with a growing number of wikias.

## How to use

### Installation

You can install the FandomScraper library using either npm or Yarn.
#### npm
```shell
npm install fandomscraper
```
#### yarn
```shell
yarn add fandomscraper
```

### How to use

#### FandomScraper
1. Once installed, you can import the `FandomScraper` class into your project as follows:
```js
import { FandomScraper } from 'fandomscraper';
```

Make sure to adjust the import statement according to your project's setup.

2. Create an instance of `FandomScraper` by providing the wiki name and language in the constructor:

```js
const scraper = new FandomScraper('shiki', { lang:  'en' });
```

- The `name` property should be the name of the wiki you want to scrape from. First, check if the wiki is available. To know the list of the current available wikis, use the following method:

```js
const wikis = scraper.getAvailableWikis();
```
- The `language` property represents the language of the wiki (e.g., 'fr' for French or 'en' for English).

Please note that you can still change the characters page url with the method `setCharactersPage(url)` like this:
```js
scraper.setCharactersPage('https://shiki.fandom.com/wiki/Category:Characters');
```

3. Use the available methods to retrieve the desired information. Here are some examples:
---

-  **Get all characters of the current wiki:**

```js
const allCharacters = await scraper
	.findAll({ base64:  false, withId:  true, recursive:  true })
	.limit(100)
	.offset(5)
	.attr('age kanji status episode images affiliation occupations')
	.attrToArray('affiliation occupations')
	.ignore(['muroi'])
	.exec();
```

This method allows you to retrieve all characters from the wiki.

- The `findAll()` method takes an options object as an argument, which can be used to customize the query. It supports the following options:

-  `base64`: A boolean value that determines whether to return character images in base64 format.

-  `withId`: A boolean value that indicates whether to include the character's ID (corresponding to the wikia's `pageId` value).

-  `recursive`: A boolean value that specifies whether to retrieve additional information from the character's infobox along with their name, URL, and optional ID.

- The `limit()` method is used to set the maximum number of characters to return. In the example above, it's `.limit(100)`.

- The `offset()` method is used to set the starting point for retrieving characters. In the example above, it's `.offset(5)`.

- The `attr()` method is used to specify which properties (keys) from the data source schema should be returned in the query result. It takes a string as an argument, where each property is separated by a space. In the example above, it's `.attr('age kanji status episode images')` (used only if `recursive` is set to `true`).

- The `attrToArray()` method converts the values of specific attributes from strings to arrays. This method is useful when you want the values of certain attributes to be returned as arrays instead of strings, allowing you to retrieve multiple values for those attributes if they exist in the data source. (used only if `recursive` is set to `true`).

- The `ignore()` method is used to specify substrings. Characters whose names contain any of the specified substrings will be ignored. It takes an array of strings as an argument. In the example above, it's `.ignore(['muroi'])`.

- The `exec()` method must be called at the end of the query chain to execute the query and retrieve the result.

  

Make sure to adjust the options, methods, and property names according to your specific use case and schema.

  
  

---

-  **Get a character by name:**

```js
const character = await scraper
	.findByName('toshio ozaki', { base64:  false, withId:  true })
	.attr('age kanji status episode images affiliation occupations')
	.attrToArray('affiliation occupations')
	.exec()
```
This method allows you to retrieve a character from the wiki based on their name.
-   The `findByName()` method takes two arguments:
    
    -   The first argument is the name of the character you want to find. In the example above, it's `'toshio ozaki'`.
    -   The second argument is an options object that can be used to customize the query. It supports the following options:
        -   `base64`: A boolean value that determines whether to return character images in base64 format.
        -   `withId`: A boolean value that indicates whether to include the character's ID (corresponding to the wikia's `pageId` value).
-   The `attr()` method is used to specify which properties (keys) from the data source schema should be returned in the query result. It takes a string as an argument, where each property is separated by a space. In the example above, it's `.attr('age kanji status episode images')` (used only if `recursive` is set to `true`).
    
- The `attrToArray()` method converts the values of specific attributes from strings to arrays. This method is useful when you want the values of certain attributes to be returned as arrays instead of strings, allowing you to retrieve multiple values for those attributes if they exist in the data source.

-   The `exec()` method must be called at the end of the query chain to execute the query and retrieve the result.

Make sure to adjust the options, methods, and property names according to your specific use case and schema.

---

-  **Get a character by ID:**

```js
const characterById = await scraper
	.findById(24013, { base64:  false })
	.attr('age kanji status episode images affiliation occupations')
	.attrToArray('affiliation occupations')
	.exec()
```
This method allows you to retrieve a character from the wiki based on their ID.

-   The `findById()` method takes two arguments:
    
    -   The first argument is the ID of the character you want to find. In the example above, it's `24013`.
    -   The second argument is an options object that can be used to customize the query. It supports the following option:
        -   `base64`: A boolean value that determines whether to return character images in base64 format.
-   The `attr()` method is used to specify which properties (keys) from the data source schema should be returned in the query result. It takes a string as an argument, where each property is separated by a space. In the example above, it's `.attr('name kanji age affiliations')`.
    
-   The `exec()` method must be called at the end of the query chain to execute the query and retrieve the result.

Make sure to adjust the options, methods, and property names according to your specific use case and schema.

---

-  **Get the metadatas of the wiki:**

```js
const metadatas = await scraper.getMetadata({withCount: true});
```

This method returns an object specifying global informations about the scrapped wikias. The returned object follows this interface:
```ts
interface IMetaData {
    // the name of the wiki
    name: string;

    // the language of the wiki
    language: 'en' | 'fr';

    // the available attributes of the wiki
    attributes: string[];

	// the number of characters in the wiki
    count?: number;

	// the available languages of the wiki
    availableLanguages: string[];
};
```

---

-  **Get the total count of characters in the wiki:**

```js
const characterCount = await scraper.count();
```

This method returns the total number of characters in the specified wikia.

---

4. Handle the retrieved character data based on the IData interface:

```ts
interface  IData {
	id?: number;
	name: string;
	url: string;
	data?: IDataset;
}

interface  IDataset {
	name?: TDataset; // name of the character
	kanji?: string; // kanji name of the character
	quote?: string | string[]; // quote of the character
	romaji?: string; // romaji name of the character
	status?: string; // status of the character (dead, alive, etc.)
	species?: TDataset; // race
	gender?: string; // gender of the character
	images?: string[]; // array of image urls
	episode?: TDataset; // array of episode names where the character first appeared
	manga?: string; // manga chapter where the character first appeared
	age?: TDataset; // age of the character
	birthday?: string; // birthday of the character
	bloodType?: string; // blood type of the character
	zodiac?: string; // zodiac sign of the character
	hairColor?: string; // hair color of the character
	eyeColor?: string; // eye color of the character
	height?: TDataset; // height of the character
	weight?: TDataset; // weight of the character
	relatives?: TDataset; // array of relatives of the character
	affiliation?: string; // affiliation of the character
	occupations?: TDataset; // array of occupations of the character
	nationality?: string; // nationality of the character
	seiyu?: TDataset; // seiyu of the character
	voiceActor?: TDataset; // voice actor of the character
}

```
- The `IData` interface represents the structure of a character object.
- The `IDataset` interface defines the structure of the character's data.

Feel free to customize the options and explore the capabilities of FandomScraper to efficiently retrieve character informations from various Fandom wikis.

Remember to handle any errors that may occur and adjust the method names and options according to your specific use case.

#### FandomPersonalScraper

**FandomPersonalScraper** is a child class of **FandomScraper** that allows you to specify your own schema for scraping a wiki. It has the same methods as the parent class, but instead of relying on an existing schema, you define the schema in its constructor.

To use FandomPersonalScraper, follow these steps:

1.  Import the `FandomPersonalScraper` class into your project:
```js
import { FandomPersonalScraper } from 'fandomscraper';
```
Make sure to adjust the import statement according to your project's setup.

2.  Create an instance of `FandomPersonalScraper` by providing the scraper schema in the constructor:

```js
const personalScraper = new FandomPersonalScraper({
	url: 'https://mywikia.fandom.com/wiki/Category:Characters',
	pageFormat: 'classic',
	dataSource: {
		name: 'Name',
		age: 'Age',
		kanji: 'Kanji',
		romaji: 'Romaji',
		status: 'Status',
		gender: 'Gender',
		species: 'Kind',
		images: {
			identifier: '.mw-parser-output table img',
			get: function(page) {
				return  page.querySelectorAll(this.identifier);
			}
		},
		quotes: {
			identifier: '.quote',
			get: function(page) {
				return  page.querySelectorAll(this.identifier);
			}
		},
		episode: 'First appearance',
		affiliation: 'Affiliations'
	}
});
```
The constructor of `FandomPersonalScraper` expects an object that adheres to the `ISchema` interface.

```ts
type TPageFormats = 'classic' | 'table-1' | 'table-2' | 'table-3';

interface IImage {
	identifier: string;
	get: Function;
};

// Interface of where to scrap the page to get the data of the characters (data-source)
interface IDataSource {
    name?: string;
	kanji?: string;
	quote?: string | IQuote;
	romaji?: string;
	status?: string;
	species?: string;
	gender?: string;
	images?: IImage;
	episode?: string;
	manga?: string;
	age?: string;
	affiliation?: string;
	hairColor?: string;
	eyeColor?: string;
	occupations?: string;
	seiyu?: string;
	voiceActor?: string;
	relatives?: string;
	birthday?: string;
	zodiac?: string;
	height?: string;
	weight?: string;
	nationality?: string;
	bloodType?: string;
};

interface ISchema {
	// the url of the wiki characters list to scrape (ex: 'https://dragonball.fandom.com/wiki/Characters')
	url:  string;

	// the format of the characters list page (ex: 'classic')
	pageFormat: TPageFormats;

	// the data-source of the wiki (ex: DragonBallFRDataSource) which will be used to scrape the wiki
	dataSource:  IDataSource;
};
```
-   `url`: The URL of the wiki's characters list page, for example: `'https://dragonball.fandom.com/wiki/Characters'`.

-   `pageFormat`: The format of the characters list page, which can be `'classic'`, `'table-1'`, `table-3` or `'table-4'` depending on how the characters page list is structured.

-   `dataSource`: An object specifying the data sources for scraping character pages. It defines properties like `name`, `age`, `kanji`, etc. Each property corresponds to a piece of information about the character. If an element on the character page has a `data-source` attribute, the value of that attribute is used as the property value. Otherwise, the value is taken from the adjacent cell in the table.
	-   `images`: An object specifying the data source for scraping character images. It follows the `IImage` interface, which has two properties:
	    -   `identifier`: A string that identifies the HTML element(s) containing the images. This can be a CSS selector, XPath, or any other valid selector format.
	    -   `get`: A function that takes the `page` document as an argument and returns the selected image elements. This function is responsible for extracting and returning all the image elements that match the specified identifier.

Here's an example of how to define the `images` property in the `dataSource` object:
```ts
images: {
    identifier: '.mw-parser-output table img',
    get: function(page: Document) {
        return page.querySelectorAll(this.identifier);
    },
}
```

(And it works the same way for the the `quotes` property)

In this example, the `identifier` uses a CSS selector format to select all the image elements within a specific table on the character page. The `get` function receives the `page` document and uses the `querySelectorAll` method to retrieve and return all the selected image elements.

This allows you to customize the image scraping process based on the specific structure and location of images on your wiki's character pages.

Make sure to provide the appropriate values for your specific wiki.

This allows you to create a customized scraper that fits the structure and data sources of your wiki.

---

### Key Features

- Rapid and Simple Retrieval: FandomScraper offers a fast and straightforward approach to fetching informations from any Fandom wikia.
- Scalability: While the current number of wikias is hardcoded, FandomScraper allows for effortless and speedy addition of new wikias.
- Database Integration: The `withId` option will help you to store character informations in a database.

Feel free to explore FandomScraper and leverage its capabilities for efficiently gathering informations from various Fandom wikias.
