export const loadImage = (url: string) => {
    return new Promise(
        (response) => {
            const image = new Image();
            image.onload = (() => response(image));
            image.crossOrigin = 'anonymous';
            image.src = url;
        },
    );
};
