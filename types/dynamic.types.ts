import * as fs from 'fs';
import * as path from 'path';

// the different wikis available to scrape are the different folders in the schemas folder
const schemaDirectory = path.join(__dirname, '../wikia');

// get the list of available wikis by getting the list of folders in the schemas folder
const availableWikis = fs.readdirSync(schemaDirectory, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

// the type of the available wikis is the list of the different folders in the schemas folder
type TAvailableWikis = typeof availableWikis[number];

export { TAvailableWikis, availableWikis };