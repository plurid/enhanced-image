console.log('content script loaded');



const isImage = (location) => {
    let imagePage = false;

    const reFormats = /(\.png)|(\.jpe?g)|(\.gif)|(\.tif)|(\.svg)$/;
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

const href = location.href;

if (isImage(href)) {
    const script = document.createElement('script');
    script.src = chrome.extension.getURL('enhanced-image-html/dist/enhanced-image-html.js');
    document.body.appendChild(script);

    const imagesArr = Array.from(document.images);

    for (let i = 0; i < imagesArr.length; i++) {
        const image = imagesArr[i];
        if (image) {
            // if (image.width > 400) {
                // console.log(image);
                // console.log(image.width);
                const enhancedImage = document.createElement('enhanced-image');

                // console.log(image.src);
                enhancedImage.setAttribute('src', image.src);

                if (image.alt) {
                    enhancedImage.setAttribute('alt', image.alt);
                }

                if (image.height) {
                    enhancedImage.setAttribute('height', image.height);
                }

                if (image.width) {
                    enhancedImage.setAttribute('width', image.width);
                }

                if (image.classList) {
                    enhancedImage.setAttribute('classes', image.classList);
                }

                enhancedImage.setAttribute('text-select', true);
                enhancedImage.setAttribute('no-about', true);
                enhancedImage.setAttribute('icon', 'textselect');

                // enhancedImage.setAttribute('styling', "width: 500px;");
                // console.log(enhancedImage);

                image.parentElement.replaceChild(enhancedImage, image);
            // }
        }
    }
}
