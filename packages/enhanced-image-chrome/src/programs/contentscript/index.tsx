import React, {
    useState,
    useEffect,
} from 'react';
import ReactDOM from 'react-dom';

import EnhancedImage from '@plurid/enhanced-image-react';
import themes from '@plurid/plurid-themes';

import {
    deleteTypenames,
} from '@plurid/plurid-functions';

import {
    chromeStorage,
} from '../../services/utilities';



const sendMessage = (message: any) => {
    chrome.runtime.sendMessage({message});
}


interface ImageProperties {
    src: string;
    alt: string;
    theme: keyof typeof themes;
    userToken: string;
}

const Image: React.FC<ImageProperties> = (properties) => {
    const {
        src,
        alt,
        theme,
        // userToken,
    } = properties;

    const [data, setData] = useState (null);

    useEffect(() => {
        chrome.runtime.onMessage.addListener((request) => {
            const {
                data,
                status,
            } = request.message;

            if (status) {
                setData(deleteTypenames(data));
            }
        });
    }, []);

    return (
        <EnhancedImage
            src={src}
            alt={alt ? alt : ''}
            // height={height}
            // width={width}
            // about={false}
            theme={theme || 'depict'}

            apiKey="depict_228d11d4cfcf128a17ee61da"
            // userToken={userToken}

            sendMessage={sendMessage}
            data={data}
        />
    );
}


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
                const { token } = await chromeStorage.get('token');

                ReactDOM.render(
                    <Image
                        src={src}
                        alt={alt}
                        theme={theme}
                        userToken={token}
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
