// remove brackets and their content from a string
export const removeBrackets = (str: string) => {
    return str.replace(/\[.*?\]/g, '').trim();
};

export const isComposedName = (name: string) => {
    return name.includes(' ');
};

export const switchFirstAndLastName = (name: string) => {
    const split = name.split(' ');
    if (split.length !== 2) {
        return name;
    }
    const [firstName, lastName] = split;
    return `${lastName} ${firstName}`;
};