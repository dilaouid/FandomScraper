import fs from 'fs';
import path from 'path';
// the different wikis available to scrape are the different folders in the schemas folder
const schemaDirectory = path.join(__dirname, '../schemas');
// get the list of available wikis by getting the list of folders in the schemas folder
export const availableWikis = fs.readdirSync(schemaDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
/*
    classic: the classic page with the list of characters names
    table-1: the table with the image on the left
    table-2: the sorted table with the different categories
*/ 
//# sourceMappingURL=index.js.map