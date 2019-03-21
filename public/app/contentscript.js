console.log('content script loaded');
// console.log(document.images);

var script = document.createElement('script');
script.src = chrome.extension.getURL('enhanced-image-html/dist/enhanced-image-html.js');
document.body.appendChild(script);

const imagesArr = Array.from(document.images);

for (let i = 0; i < imagesArr.length; i++) {
    const image = imagesArr[i];
    if (image) {
        if (image.width > 400) {
            console.log(image);
            console.log(image.width);
            const enhancedImage = document.createElement('enhanced-image');
            // console.log(image.src);
            enhancedImage.setAttribute('src', image.src);
            // console.log(enhancedImage);

            image.parentElement.replaceChild(enhancedImage, image);
        }
    }
}
