import React, {
    useState,
    useEffect,
} from 'react';

import ReactDOM from 'react-dom';

import EnhancedImage from '@plurid/enhanced-image-react';

import themes from '@plurid/plurid-themes';

import {
    graphql,
} from '@plurid/plurid-functions';

import {
    chromeStorage,
} from '../../services/utilities';



const sendMessage = (
    message: any,
) => {
    chrome.runtime.sendMessage({message});
}

const initialTimedNotification = {
    text: '',
    time: 0,
};

export interface ImageProperties {
    src: string;
    alt: string;
    theme: keyof typeof themes;
    ownerToken: string;
    refreshOwnerToken: string;
    options: any;
}

const Image: React.FC<ImageProperties> = (
    properties,
) => {
    const {
        src,
        alt,
        theme,
        ownerToken,
        refreshOwnerToken,
        options,
    } = properties;

    const [data, setData] = useState(null);
    const [timedNotification, setTimeNotification] = useState(initialTimedNotification);

    useEffect(() => {
        chrome.runtime.onMessage.addListener((request) => {
            const {
                data,
                status,
                error
            } = request.message;

            if (status) {
                setData(graphql.deleteTypenames(data));
            }

            if (!status) {
                if (error === 'NOT_FOUND') {
                    const timedNotification = {
                        text: 'Image Text Not Found.',
                        time: 2500,
                    };
                    setTimeNotification(timedNotification);
                }

                const timedNotification = {
                    text: 'Something Went Wrong. Please Try Again.',
                    time: 3500,
                };
                setTimeNotification(timedNotification);
            }
        });
    }, []);

    return (
        <EnhancedImage
            src={src}
            alt={alt ? alt : ''}
            theme={theme || 'depict'}

            ownerToken={ownerToken}
            refreshOwnerToken={refreshOwnerToken}

            sendMessage={sendMessage}

            preloadedData={data}
            timedNotification={timedNotification}

            getTextOnLoad={options ? options.getImageTextAtLoad : false}
            transparentUI={options ? options.transparentUI : true}
        />
    );
}


const isImage = (
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


async function contentscript() {
    try {
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
                    const { refreshOwnerToken } = await chromeStorage.get('refreshOwnerToken');
                    const { options } = await chromeStorage.get('options');

                    ReactDOM.render(
                        <Image
                            src={src}
                            alt={alt}
                            theme={theme}
                            ownerToken={token}
                            refreshOwnerToken={refreshOwnerToken}
                            options={options}
                        />,
                        document.getElementById(rootId) as HTMLElement,
                    );
                }
            }
        }
    } catch (error) {
    }
}


async function contentscriptMain() {
    await contentscript();
};


contentscriptMain();
