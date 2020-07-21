export const loadImage = (
    url: string,
) => {
    return new Promise(
        (response) => {
            const image = new Image();
            image.onload = (() => response(image));
            image.crossOrigin = 'anonymous';
            image.src = url;
        },
    );
};


/**
 * Edited from
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob#Polyfill
 */
export const dataURIToBlob = (
    dataURI: string,
) => {
    const binStr = atob(dataURI.split(',')[1]);
    const len = binStr.length;
    const arr = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
    }

    return new Blob([arr]);
};
