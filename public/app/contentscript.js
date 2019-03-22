console.log('content script loaded');
// console.log(document.images);

var script = document.createElement('script');
script.src = chrome.extension.getURL('enhanced-image-html/dist/enhanced-image-html.js');  // eslint-disable-line no-undef
document.body.appendChild(script);

const imagesArr = Array.from(document.images);

for (let i = 0; i < imagesArr.length; i++) {
    const image = imagesArr[i];
    if (image) {
        if (image.width > 400) {
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
        }
    }
}
