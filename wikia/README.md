
# Create your scraper

The "`wikia`" folder in FandomScraper contains subfolders for each supported wikia. Each subfolder is named after the respective wikia in snake case format (e.g., "demon-slayer" or "naruto"). Within each subfolder, there are three TypeScript files:

## The "wikia" folder

#### data-source.ts:
This file defines the data source for each supported language in the wikia. It contains objects of type `IDataSource`, one for each available language for scraping. Each data source object represents a mapping between the keys and the data-source attribute values of elements within the character infobox. The individual data source objects are exported from this file.

For example:
```ts
import { IDataSource } from  "../../interfaces/datasets";

const  BerserkENDataSource: IDataSource  = {
	gender: 'Gender',
	species: 'Kind',
	images: {
		identifier:  '.mw-parser-output table img',
		get:  function(page:  Document) {
			return  page.querySelectorAll(this.identifier);
		}
	},
	/// ... other properties
};
export { BerserkENDataSource };
```

*You can have more informations about the formating of `IDataSource` objects in the FandomScraper README.*

#### schemas.ts:
This file defines the schemas for each supported wikia, one per language. Each schema is of type `ISchema` and imports the corresponding data source defined in the "`data-source.ts`" file. The individual schemas are exported from this file.

For example:
```ts
import { ISchema } from  "../../interfaces/schemas";
import { DemonSlayerFRDataSource, DemonSlayerENDataSource } from "./data-source";

const  DemonSlayerFR: ISchema = {
	url: 'https://kimetsu-no-yaiba.fandom.com/fr/wiki/Catégorie:Personnages',
	pageFormat: 'classic',
	dataSource: DemonSlayerFRDataSource
};

const DemonSlayerEN: ISchema = {
	url: 'https://kimetsu-no-yaiba.fandom.com/wiki/Characters#Manga',
	pageFormat: 'table-2',
	dataSource: DemonSlayerENDataSource
};
export { DemonSlayerFR, DemonSlayerEN };
```
*You can have more informations about the formating of `ISchema` objects in the FandomScraper README.*

#### index.ts:

This file imports the two schema files created earlier and exports them within an object, with the language as the property name. For example:
```ts
import { DeathNoteFR, DeathNoteEN } from "./schemas";

export const DeathNote = {
    fr: DeathNoteFR,
    en: DeathNoteEN
};
```
This file is of paramount importance as it serves as the main entry point for accessing the schemas. It is the file that gets imported and referenced when utilizing FandomScraper for a specific wikia.

## The index file
Outside the "wikia" folders, there is the "`index.ts`" file that serves as a central index for all supported wikias. It imports each individual wikia's "`index.ts`" file and exports them as a Record with keys corresponding to the names of the wikia folders. For example:
```ts
import { TAvailableWikis } from '../types';

import { DeathNote } from './death-note/index';
import { DemonSlayer } from './demon-slayer/index';
import { DragonBall } from './dragon-ball/index';
import { Fumetsu } from './fumetsu/index';
import { Naruto } from './naruto/index';
// ... and other wikias

export const Schemas: Record<TAvailableWikis, any> = {
    'demon-slayer': DemonSlayer,
    'naruto': Naruto,
    'dragon-ball': DragonBall,
    // ... and other wikias
} as Record<TAvailableWikis, any>;
```
When adding a new wikia, simply import its "`index.ts`" file and add a new property to the exported `Schemas` object, with the name being the wikia folder's name and the value being the imported object.

**Remember, the property must be equal to the wikia folder name !**

This folder structure ensures modularity and scalability, making it easy to add and manage new wikias and their respective schemas in FandomScraper. It simplifies access to the data and provides a clear organization for the scraping process.
