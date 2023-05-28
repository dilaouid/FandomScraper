"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.availableWikis = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// the different wikis available to scrape are the different folders in the schemas folder
const schemaDirectory = path_1.default.join(__dirname, '../schemas');
// get the list of available wikis by getting the list of folders in the schemas folder
exports.availableWikis = fs_1.default.readdirSync(schemaDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
/*
    classic: the classic page with the list of characters names
    table-1: the table with the image on the left
    table-2: the sorted table with the different categories
*/ 
//# sourceMappingURL=index.js.map