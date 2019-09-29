const getObjectKey = (str: string): string => {
    let key = str.trim();
    // camelCase
    key = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    return key;
};


const getObjectValue = (str: string): string => {
    return str.trim();
};


export const styleStringToObject = (styleString: string): object => {
    const style = {};

    const styleRules = styleString.split(';');
    for (let i = 0; i < styleRules.length - 1; i++) {
        const key = getObjectKey(styleRules[i].split(':')[0]);
        const val = getObjectValue(styleRules[i].split(':')[1]);
        style[key] = val;
    }

    return style;
};
