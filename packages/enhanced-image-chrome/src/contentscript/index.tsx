import React from 'react';
import ReactDOM from 'react-dom';
import EnhancedImage from '@plurid/enhanced-image-react';

import { chromeStorage } from '../utilities';



const isImage = (location: string) => {
    let imagePage = false;

    const reFormats = /(\.png)|(\.jpe?g)|(\.gif)|(\.tif)|(\.svg)|(\.webp)/;
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

async function contentscript() {
    const href = location.href;

    const { extensionOn } = await chromeStorage.get('extensionOn');

    if (!extensionOn) {
        console.log('extension is off');
        return;
    }

    if (isImage(href)) {
        const imagesArray = Array.from(document.images);
        console.log(imagesArray);

        for (let i = 0; i < imagesArray.length; i++) {
            const image = imagesArray[i];
            if (image) {
                if (image.getAttribute('data-depict')) {
                    return;
                }

                const height = image.offsetHeight;
                const width = image.offsetWidth;
                const src = image.src;
                const alt = image.alt;

                document.body.removeChild(image);

                const rootId = `root-enhanced-image-${i}`;
                const root = document.createElement('div');
                root.id = rootId;
                root.style.cssText = `margin: auto; height: ${height}px; width: ${width}px`;
                document.body.appendChild(root);

                const { theme } = await chromeStorage.get('theme');
                const { token } = await chromeStorage.get('token');
                // console.log(token);

                ReactDOM.render(
                    <EnhancedImage
                        src={src}
                        alt={alt ? alt : ''}
                        // height={height}
                        // width={width}
                        // about={false}
                        theme={theme || 'depict'}
                        apiKey="depict_228d11d4cfcf128a17ee61da"

                        // userToken={token}
                        // textFunctions={!!user}
                    />,
                    document.getElementById(rootId) as HTMLElement,
                );
            }
        }
    }
}


async function contentscriptMain() {
    await contentscript();
};


contentscriptMain();
