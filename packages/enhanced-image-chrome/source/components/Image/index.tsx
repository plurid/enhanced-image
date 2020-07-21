import React, {
    useState,
    useEffect,
} from 'react';

import EnhancedImage from '@plurid/enhanced-image-react';

import themes from '@plurid/plurid-themes';

import {
    graphql,
} from '@plurid/plurid-functions';

import {
    API_URI,
    initialTimedNotification,
} from '../../data/constants';

import {
    sendMessage,
} from '../../services/utilities';



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
    /** properties */
    const {
        src,
        alt,
        theme,
        ownerToken,
        refreshOwnerToken,
        options,
    } = properties;


    /** state */
    const [
        data,
        setData,
    ] = useState(null);
    const [
        timedNotification,
        setTimeNotification,
    ] = useState(initialTimedNotification);


    /** effects */
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


    /** render */
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

            generator={true}
            development={true}

            apiEndpoint={API_URI}
        />
    );
}


export default Image;
