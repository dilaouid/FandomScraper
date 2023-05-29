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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schemas = void 0;
const types_1 = require("../types");
const importSchema = (wiki) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // change wiki into a single word with the each first letter capitalized
    // ex: demon-slayer -> DemonSlayer
    const formatted = wiki.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join('');
    // import the schema module according to the wiki name
    const schemaModule = yield (_a = `./${wiki}/index`, Promise.resolve().then(() => __importStar(require(_a))));
    return schemaModule[formatted];
});
exports.Schemas = {};
(() => __awaiter(void 0, void 0, void 0, function* () {
    for (const wiki of types_1.availableWikis) {
        exports.Schemas[wiki] = yield importSchema(wiki);
    }
}))();
//# sourceMappingURL=index.js.map