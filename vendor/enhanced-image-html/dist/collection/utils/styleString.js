const getObjectKey = (str) => {
    let key = str.trim();
    key = key.replace(/-([a-z])/g, (g) => { return g[1].toUpperCase(); });
    return key;
};
const getObjectValue = (str) => {
    return str.trim();
};
export const styleStringToObject = (styleString) => {
    const style = {};
    const styleRules = styleString.split(';');
    for (let i = 0; i < styleRules.length - 1; i++) {
        let key = getObjectKey(styleRules[i].split(':')[0]);
        let val = getObjectValue(styleRules[i].split(':')[1]);
        style[key] = val;
    }
    return style;
};
