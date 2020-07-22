export const isImage = (
    location: string,
) => {
    let imagePage = false;

    const reFormats = /((\.|=)png)|((\.|=)jpe?g)|((\.|=)gif)|((\.|=)tif)|((\.|=)svg)|((\.|=)webp)/;
    imagePage = reFormats.test(location);
    if (imagePage) {
        return true;
    }

    const reBase64 = /^data:image/;
    imagePage = reBase64.test(location);
    if (imagePage) {
        return true;
    }
}
