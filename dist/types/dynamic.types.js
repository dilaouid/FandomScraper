import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
const getCurrentPath = () => {
    if (typeof __dirname !== 'undefined') {
        return __dirname;
    }
    return path.dirname(fileURLToPath(import.meta.url));
};
// the different wikis available to scrape are the different folders in the schemas folder
const schemaDirectory = path.join(getCurrentPath(), '../wikia');
// get the list of available wikis by getting the list of folders in the schemas folder
const availableWikis = fs.readdirSync(schemaDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
export { availableWikis };
//# sourceMappingURL=dynamic.types.js.map