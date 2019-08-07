import React from 'react';
import ReactDOM from 'react-dom';
import EnhancedImage from '@plurid/enhanced-image-react';

import { chromeStorage } from '../utils';



async function contentscript() {
    const isImage = (location: string) => {
        let imagePage = false;

        const reFormats = /(\.png)|(\.jpe?g)|(\.gif)|(\.tif)|(\.svg)|(\.webp)$/;
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

    const { extensionOn } = await chromeStorage.get('extensionOn');

    if (!extensionOn) {
        return;
    }

    if (isImage(href)) {
        const imagesArray = Array.from(document.images);

        for (let i = 0; i < imagesArray.length; i++) {
            const image = imagesArray[i];
            if (image) {
                const height = image.offsetHeight;
                const width = image.offsetWidth;
                const src = image.src;
                const alt = image.alt;

                document.body.removeChild(image);

                const rootId = `root-enhanced-image-${i}`;
                const root = document.createElement('div');
                root.id = rootId;
                document.body.appendChild(root);

                const { theme } = await chromeStorage.get('theme');
                const { user } = await chromeStorage.get('user');

                ReactDOM.render(
                    <EnhancedImage
                        src={src}
                        alt={alt ? alt : ''}
                        height={height}
                        width={width}
                        about={false}
                        theme={theme || 'depict'}
                        textFunctions={!!user}
                    />,
                    document.getElementById(rootId) as HTMLElement,
                );

                // if (image.classList) {
                //     enhancedImage.setAttribute('classes', image.classList + "");
                // }

                // enhancedImage.setAttribute('text-select', 'true');
                // enhancedImage.setAttribute('no-about', 'true');
                // enhancedImage.setAttribute('icon', 'textselect');

                // // enhancedImage.setAttribute('styling', "width: 500px;");
                // // console.log(enhancedImage);

                // image.parentElement.replaceChild(enhancedImage, image);
            }
        }
    }
}


async function contentscriptMain() {
    await contentscript();
};


contentscriptMain();
