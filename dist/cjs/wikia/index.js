"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schemas = void 0;
const types_1 = require("../types");
const importSchema = async (wiki) => {
    var _a;
    // change wiki into a single word with each first letter capitalized
    // ex: demon-slayer -> DemonSlayer
    const formatted = wiki.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join('');
    // import the schema module according to the wiki name
    // get the index file of the wiki folder
    const schemaModule = await (_a = `/wikia/${wiki}`, Promise.resolve().then(() => __importStar(require(_a))));
    return schemaModule[formatted];
};
exports.Schemas = {};
(async () => {
    for (const wiki of types_1.availableWikis) {
        exports.Schemas[wiki] = await importSchema(wiki);
    }
})();
//# sourceMappingURL=index.js.map