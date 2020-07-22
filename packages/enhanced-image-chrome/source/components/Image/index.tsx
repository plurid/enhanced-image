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
    MESSAGE_TYPE_GET_PLURID_ACCESS_TOKEN,

    initialTimedNotification,
    logErrors,
} from '../../data/constants';

import {
    sendMessage,
} from '../../services/utilities';



export interface ImageProperties {
    src: string;
    alt: string;
    theme: keyof typeof themes;
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

    const [
        accessToken,
        setAccessToken,
    ] = useState('');
    const [
        refreshAccessToken,
        setRefeshAccessToken,
    ] = useState('');


    /** effects */
    useEffect(() => {
        const handleRequest = (
            request: any,
        ) => {
            const {
                accessToken,
                data,
                status,
                error,
            } = request.message;

            if (accessToken) {
                return;
            }

            if (!status) {
                if (error === 'NOT_FOUND') {
                    const timedNotification = {
                        text: 'Image Text Not Found.',
                        time: 2500,
                    };
                    setTimeNotification(timedNotification);
                    return;
                }

                const timedNotification = {
                    text: 'Something Went Wrong. Please Try Again.',
                    time: 3500,
                };
                setTimeNotification(timedNotification);
                return;
            }

            setData(graphql.deleteTypenames(data));
        }

        chrome.runtime.onMessage.addListener(handleRequest);

        return () => {
            chrome.runtime.onMessage.removeListener(handleRequest);
        }
    }, []);

    /** Get access token */
    useEffect(() => {
        const message = {
            type: MESSAGE_TYPE_GET_PLURID_ACCESS_TOKEN,
        };
        sendMessage(message);
    }, []);

    useEffect(() => {
        const handleRequest = (
            request: any,
        ) => {
            if (!request.message) {
                return;
            }

            const {
                accessToken,
                refreshAccessToken,
            } = request.message;

            setAccessToken(accessToken || '');
            setRefeshAccessToken(refreshAccessToken || '');
        }

        chrome.runtime.onMessage.addListener(handleRequest);

        return () => {
            chrome.runtime.onMessage.removeListener(handleRequest);
        }
    }, []);


    /** render */
    return (
        <EnhancedImage
            src={src}
            alt={alt ? alt : ''}
            theme={theme || 'depict'}

            ownerToken={accessToken}
            refreshOwnerToken={refreshAccessToken}

            sendMessage={sendMessage}

            preloadedData={data}
            timedNotification={timedNotification}

            getTextOnLoad={options ? options.getImageTextAtLoad : false}
            transparentUI={options ? options.transparentUI : true}

            generator={true}
            // development={true}

            apiEndpoint={API_URI}

            logErrors={logErrors}
        />
    );
}


export default Image;
