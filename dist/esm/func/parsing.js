// remove brackets and their content from a string
export const removeBrackets = (str) => {
    return str.replace(/\[.*?\]/g, '').trim();
};
export const isComposedName = (name) => {
    return name.includes(' ');
};
export const formatName = (name) => {
    // put all first letters in uppercase
    const split = name.split(' ');
    const formatted = split.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return formatted.join(' ');
};
export const switchFirstAndLastName = (name) => {
    const split = name.split(' ');
    if (split.length !== 2) {
        return name;
    }
    const [firstName, lastName] = split;
    return `${lastName} ${firstName}`;
};
export const formatForUrl = (name) => {
    return name.replace(/ /g, '_');
};
//# sourceMappingURL=parsing.js.map