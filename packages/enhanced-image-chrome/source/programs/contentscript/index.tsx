import React from 'react';

import ReactDOM from 'react-dom';

import {
    chromeStorage,
    isImage,
} from '../../services/utilities';

import Image from '../../components/Image';



async function contentscript() {
    try {
        const href = location.href;

        const {
            extensionOn,
        } = await chromeStorage.get('extensionOn');

        if (!extensionOn) {
            return;
        }

        if (isImage(href)) {
            const imagesArray = Array.from(document.images);

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
                    root.style.cssText = `margin: auto; height: ${height}px; width: ${width}px;`;
                    document.body.appendChild(root);

                    const { theme } = await chromeStorage.get('theme');
                    const { options } = await chromeStorage.get('options');

                    ReactDOM.render(
                        <Image
                            src={src}
                            alt={alt}
                            theme={theme}
                            options={options}
                        />,
                        document.getElementById(rootId) as HTMLElement,
                    );
                }
            }
        }
    } catch (error) {
        return;
    }
}


async function contentscriptMain() {
    await contentscript();
};


contentscriptMain();
