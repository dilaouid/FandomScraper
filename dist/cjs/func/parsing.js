"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatForUrl = exports.switchFirstAndLastName = exports.formatName = exports.isComposedName = exports.removeBrackets = void 0;
// remove brackets and their content from a string
const removeBrackets = (str) => {
    return str.replace(/\[.*?\]/g, '').trim();
};
exports.removeBrackets = removeBrackets;
const isComposedName = (name) => {
    return name.includes(' ');
};
exports.isComposedName = isComposedName;
const formatName = (name) => {
    // put all first letters in uppercase
    const split = name.split(' ');
    const formatted = split.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return formatted.join(' ');
};
exports.formatName = formatName;
const switchFirstAndLastName = (name) => {
    const split = name.split(' ');
    if (split.length !== 2) {
        return name;
    }
    const [firstName, lastName] = split;
    return `${lastName} ${firstName}`;
};
exports.switchFirstAndLastName = switchFirstAndLastName;
const formatForUrl = (name) => {
    return name.replace(/ /g, '_');
};
exports.formatForUrl = formatForUrl;
//# sourceMappingURL=parsing.js.map