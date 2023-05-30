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

1. Once installed, you can import the `FandomScraper` class into your project as follows:
```js
import { FandomScraper } from 'fandomscraper';
```

Make sure to adjust the import statement according to your project's setup.

2.  Create an instance of `FandomScraper` by providing the wiki name and language in the constructor:
```js
const scraper = new FandomScraper({ name: 'shiki', language: 'en' });
```
-   The `name` property should be the name of the wiki you want to scrape from. First, check if the wiki is available. To know the list of the current available wikis, use the following method:
```js
const wikis = scraper.getAvailableWikis();
```
-   The `language` property represents the language of the wiki (e.g., 'fr' for French or 'en' for English).


3.  Use the available methods to retrieve the desired information. Here are some examples:
---
-   **Get all characters of the current wiki:**
```js
const allCharacters = await scraper.getAll({ limit: 100, offset: 0, base64: false, withId: true, recursive: true });
```
-   The `limit` option sets the maximum number of characters to return.
    
-   The `offset` option sets the starting point for retrieving characters.
    
-   The `base64` option determines whether to return character images in base64 format.
    
-   The `withId` option indicates whether to include the character's ID (corresponding to the wikia's pageId value).
    
-   The `recursive` option specifies whether to retrieve additional informations from the character's infobox along with their name, URL, and optional ID.
---
-   **Get a character by name:**
```js
const character = await scraper.getByName({
  name: 'toshio ozaki',
  withId: true,
  base64: false,
});
```
-   The `name` property should be the name of the character, not the wiki.
---

-   **Get a character by ID:**
```js
const characterById = await scraper.getById(2049, {
  base64: false,
  withId: true,
});
```
-   The first argument is the ID of the character retrieved from the pageId value from the wikia.
-   The `base64` option determines whether to return the character images in base64 format.
-   The `withId` option indicates whether to include the character's ID in the returned data.
---

-   **Get the total count of characters in the wiki:**
```js
const characterCount = await scraper.count();
```
This method returns the total number of characters in the specified wikia.

---

4.  Handle the retrieved character data based on the IData interface:
```ts
interface IData {
  id?: number;
  name: string;
  url: string;
  data?: IDataset;
}

interface IDataset {
  name?: string;
  kanji?: string;
  romaji?: string;
  status?: string;
  species?: string;
  gender?: string;
  images?: string[];
  episode?: string[];
  age?: string;
  affiliation?: string;
}
```

-   The `IData` interface represents the structure of a character object.
-   The `IDataset` interface defines the structure of the character's data.

Feel free to customize the options and explore the capabilities of FandomScraper to efficiently retrieve character informations from various Fandom wikis.

Remember to handle any errors that may occur and adjust the method names and options according to your specific use case.

---

### Key Features

-   Rapid and Simple Retrieval: FandomScraper offers a fast and straightforward approach to fetching informations from any Fandom wikia.
    
-   Scalability: While the current number of wikias is hardcoded, FandomScraper allows for effortless and speedy addition of new wikias.
    
-   Database Integration: The `withId` option will help you to store character informations in a database.
    

Feel free to explore FandomScraper and leverage its capabilities for efficiently gathering informations from various Fandom wikias.