// remove brackets and their content from a string
export const removeBrackets = (str: string) => {
    return str.replace(/\[.*?\]/g, '').trim();
};

export const formatName = (name: string) => {
    // put all first letters in uppercase
    const split = name.split(' ');
    const formatted = split.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return formatted.join(' ');
};

export const formatForUrl = (name: string) => {
    return name.replace(/ /g, '_');
};