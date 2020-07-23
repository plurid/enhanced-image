/** [START] imports */
/** libraries */
import React, {
    useState,
    useRef,
    useEffect,
} from 'react';

import {
    ApolloClient,
    NormalizedCacheObject,
} from '@apollo/client';

import themes, {
    Theme,
} from '@plurid/plurid-themes';

import {
    uuid,
    objects,
} from '@plurid/plurid-functions';

import {
    useDebouncedCallback,
} from '@plurid/plurid-functions-react';


/** external */
import logic from '../../logic';

import Image from '../../components/Image';
import Text from '../../components/Text';
import Entities from '../../components/Entities';
import Settings from '../../components/Settings';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';

import {
    EnhancedImageProperties,
    Context as IContext,
    ImageDimensions,
    ImageBoxDimensions,
    ImageText,
    ImageEntity,
    ImageEntityRectangular,
    ImageColorsData,
    ActionDetail,
    ImageEntityType,
} from '../../data/interfaces';

import {
    TextlineTransview,
    TextlineTransviewData,
} from '../../data/interfaces/text';

import {
    PLURID_API_ENDPOINT,
    SLIDER_VALUE_DEFAULTS,
    ABOUT_URL,
    DEPICT_DOMAIN,
    REQUEST_ERRORS,
    MESSAGE_TYPES,

    IMAGE_TYPES,

    ENHANCED_IMAGE_ACTION,

    emptyImageEntityRectangular,
    baseEntitiesData,
} from '../../data/constants';

import {
    initialImageDimensions,
    initialImageBoxDimensions,
    initialPreviousImageColors,
} from '../../data/constants/initializers';

import {
    Context,

    /** imageText */
    getImmutableTextline,
    getVersionById,
    updateVersion,
    imageURLFromSrc,

    /** image */
    loadImage,
    dataURIToBlob,
} from '../../services/utilities';

import client from '../../services/graphql/client';


/** internal */
import {
    StyledEnhancedImage,
} from './styled';
/** [END] imports */



/** [START] component */
const EnhancedImage: React.FC<EnhancedImageProperties> = (
    properties,
) => {
    /** properties */
    const {
        src,
        srcset,
        alt,

        logErrors,

        imageStyle,
        theme,
        transparentUI,
        about,
        generator,

        atLoad,
        atColorsChange,

        apiEndpoint,

        apiKey,
        ownerToken,
        imageID,

        sendMessage,
        preloadedData,
        timedNotification,

        getTextOnLoad,

        initialColors,

        development,
        silent,
        settingsDrawers,
        textDrawer,
        topologyDrawer,
        variaDrawer,
    } = properties;

    if (!src) {
        return (
            <div>
                add the src property to display the image
            </div>
        );
    }

    const _alt = alt || '';
    const _imageStyle = imageStyle ? imageStyle : {};
    const _theme: Theme = theme && themes[theme]
        ? themes[theme]
        : themes.plurid;
    const _transparentUI = transparentUI === undefined ? true : transparentUI;
    const _about = about === undefined ? true : about;
    const _generator = generator === undefined ? false : generator;

    const _apiEndpoint = apiEndpoint ? apiEndpoint : PLURID_API_ENDPOINT;

    const _development = development ?? false;
    const _silent = silent ?? false;
    const _settingsDrawers = settingsDrawers ?? ['ALL'];
    const _textDrawer = textDrawer ?? ['ALL'];
    const _topologyDrawer = topologyDrawer ?? ['ALL'];
    const _variaDrawer = variaDrawer ?? ['ALL'];


    /** references */
    const componentIsMounted = useRef(true);
    const messageTimer = useRef<any>(null);

    const graphqlClient= useRef<ApolloClient<NormalizedCacheObject>>(client(_apiEndpoint));

    const imageContainer = useRef<HTMLDivElement>(null);
    const transviews = useRef<Map<string, ImageText[]>>(new Map());


    /** state */
    const [imageType, setImageType] = useState('');

    const [imageBackground, setImageBackground] = useState(0);

    const [loadedImage, setLoadedImage] = useState(false);
    const [imageDimensions, setImageDimensions] = useState<ImageDimensions>(initialImageDimensions);
    const [imageBoxDimensions, setImageBoxDimensions] = useState<ImageBoxDimensions>(initialImageBoxDimensions);

    const [showSpinner, setShowSpinner] = useState(false);
    const [message, setMessage] = useState('');

    const [showSettingsButton, setShowSettingsButton] = useState(false);
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);

    const [expandTextDrawer, setExpandTextDrawer] = useState(false);
    const [expandColorDrawer, setExpandColorDrawer] = useState(false);
    const [expandTopologyDrawer, setExpandTopologyDrawer] = useState(false);
    const [expandEntitiesDrawer, setExpandEntitiesDrawer] = useState(false);
    const [expandVariaDrawer, setExpandVariaDrawer] = useState(false);

    const [editableText, setEditableText] = useState(false);
    const [revealedText, setRevealedText] = useState(false);

    const [editableEntities, setEditableEntities] = useState(false);
    const [revealedEntities, setRevealedEntities] = useState(false);

    const [showTransviewSettings, setShowTransviewSettings] = useState(false);
    const [transviewActive, setTransviewActive] = useState(false);
    const [transviewSourceLanguage, setTransviewSourceLanguage] = useState('Auto-Detect');
    const [transviewTargetLanguage, setTransviewTargetLanguage] = useState('Select');

    const [saveImageHref, setSaveImageHref] = useState('');
    const [saveImageDownload, setSaveImageDownload] = useState('');

    const [imageText, setImageText] = useState<ImageText[]>([]);
    const [imageEntities, setImageEntities] = useState<ImageEntity[]>([]);

    const [deletedTexts, setDeletedTexts] = useState<string[]>([]);

    const [imageColorsInvert, setImageColorsInvert] = useState(!!initialColors?.invert || !!SLIDER_VALUE_DEFAULTS.Invert);
    const [imageColorsContrast, setImageColorsContrast] = useState(initialColors?.contrast || SLIDER_VALUE_DEFAULTS.Contrast);
    const [imageColorsHue, setImageColorsHue] = useState(initialColors?.hue || SLIDER_VALUE_DEFAULTS.Hue);
    const [imageColorsSaturation, setImageColorsSaturation] = useState(initialColors?.saturation || SLIDER_VALUE_DEFAULTS.Saturation);
    const [imageColorsBrightness, setImageColorsBrightness] = useState(initialColors?.brightness || SLIDER_VALUE_DEFAULTS.Brightness);

    const [defaultsToggled, setDefaultsToggled] = useState(false);

    const [previousImageColors, setPreviousImageColors] = useState(initialPreviousImageColors);

    const [imageTopologyOverflow, setImageTopologyOverflow] = useState(false);
    const [flipVertical, setFlipVertical] = useState(false);
    const [flipHorizontal, setFlipHorizontal] = useState(false);
    const [imageTopologyDrag, setImageTopologyDrag] = useState(false);
    const [imageTopologyDragging, setImageTopologyDragging] = useState(false);
    const [imageTopologyX, setImageTopologyX] = useState(0);
    const [imageTopologyY, setImageTopologyY] = useState(0);
    const [imageCoordinateX, setImageCoordinateX] = useState(0);
    const [imageCoordinateY, setImageCoordinateY] = useState(0);
    const [imageTopologyRotate, setImageTopologyRotate] = useState(0);
    const [imageTopologyScale, setImageTopologyScale] = useState(0);

    const [databaseImageID, setDatabaseImageID] = useState('');


    /** handlers */
    /** GENERAL */
    const handleLoadedImage = async (
        image: EventTarget & HTMLImageElement,
    ) => {
        if (atLoad) {
            await atLoad(image);
        }

        const dimensions = image.getBoundingClientRect();
        const {
            width,
            height,
        } = dimensions;

        const imageDimensions: ImageDimensions = {
            width,
            height,
        };
        setImageDimensions(imageDimensions);

        const imageBoxDimensions: ImageBoxDimensions = {
            width,
            height,
            top: 0,
            left: 0,
        };
        setImageBoxDimensions(imageBoxDimensions);

        setLoadedImage(true);
    }

    const setMessageTimed = (
        message: string,
        time: number
    ) => {
        setMessage(message);
        messageTimer.current = setTimeout(() => {
            if (componentIsMounted.current) {
                setMessage('');
            }
        }, time);
    }

    const addText = () => {
        setMessageTimed('Added New Text', 1500);

        const newTextID = 'eit_' + uuid.generate();
        const newTextVersionID = 'eiv_' + uuid.generate();

        const newText: ImageText = {
            id: newTextID,
            currentVersionId: newTextVersionID,
            versions: [
                {
                    id: newTextVersionID,
                    type: 'TEXTLINE',

                    position: {
                        x: 5,
                        y: 9,
                    },

                    transform: {
                        perspective: 0,
                        rx: 0,
                        ry: 0,
                        rz: 0,
                        sx: 0,
                        sy: 0,
                    },

                    viewable: false,

                    color: 'white',

                    font: {
                        weight: 'normal',
                        style: 'normal',
                        family: 'Arial',
                        size: 4.5,
                        letterSpacing: 0,
                        wordSpacing: 0,
                        lineHeight: 0,
                    },

                    content: 'New Text',
                    transview: {
                        active: 'SOURCE',
                        data: [],
                    },

                    link: {
                        active: false,
                        to: '',
                    },

                    action: {
                        active: false,
                        type: '',
                    },
                },
            ],
        };

        const updatedTexts = [...imageText, newText];
        setImageText(updatedTexts);
    }

    const handleResize = useDebouncedCallback(() => {
        if (!imageContainer.current) {
            return;
        }

        const dimensions = imageContainer.current.getBoundingClientRect();
        const {
            width,
            height,
        } = dimensions;

        const imageDimensions: ImageDimensions = {
            width,
            height,
        };
        setImageDimensions(imageDimensions);

        const imageBoxDimensions: ImageBoxDimensions = {
            width,
            height,
            top: 0,
            left: 0,
        };
        setImageBoxDimensions(imageBoxDimensions);
    }, 150);

    const handleMouseDown = (
        event: any,
    ) => {
        if (imageTopologyDrag) {
            setImageTopologyDragging(true);

            const pageX = event.pageX;
            const pageY = event.pageY;

            setImageTopologyX(pageX);
            setImageTopologyY(pageY);
        }
    }

    const updateTopologyLocation = (
        x: number,
        y: number,
    ) => {
        setImageCoordinateX(imageCoordinateX + x);
        setImageCoordinateY(imageCoordinateY + y);
    }



    /** GET TEXT */
    const getTextWithApiKey = async (
        apiKey: string,
    ) => {
        const input = {
            imageURL: imageURLFromSrc(src),
            apiKey,
        };

        if (sendMessage) {
            sendMessage({
                type: MESSAGE_TYPES.GET_TEXT_WITH_API_KEY,
                input,
            });

            const response = {
                status: false,
                error: REQUEST_ERRORS.SENT_MESSAGE,
                data: undefined,
            };
            return response;
        }

        const response = await logic.text.get.withAPIKey(
            input,
            graphqlClient.current,
        );
        return response;
    }

    const getTextWithOwnerToken = async (
        ownerToken: string,
    ) => {
        const input = {
            imageURL: imageURLFromSrc(src),
            ownerToken,
        };

        if (sendMessage) {
            sendMessage({
                type: MESSAGE_TYPES.GET_TEXT_WITH_OWNER_TOKEN,
                input,
            });

            const response = {
                status: false,
                error: REQUEST_ERRORS.SENT_MESSAGE,
                data: undefined,
            };
            return response;
        }

        const response = await logic.text.get.withOwnerToken(
            input,
            graphqlClient.current,
        );
        return response;
    }

    const getTextWithImageID = async (
        imageID: string,
    ) => {
        const input = {
            imageURL: imageURLFromSrc(src),
            imageID,
        };

        if (sendMessage) {
            sendMessage({
                type: MESSAGE_TYPES.GET_TEXT_WITH_IMAGE_ID,
                input,
            });

            const response = {
                status: false,
                error: REQUEST_ERRORS.SENT_MESSAGE,
                data: undefined,
            };
            return response;
        }

        const response = await logic.text.get.withImageID(
            input,
            graphqlClient.current,
        );
        return response;
    }

    const handleGetText = async () => {
        if (apiKey) {
            return await getTextWithApiKey(apiKey);
        }

        if (ownerToken) {
            return await getTextWithOwnerToken(ownerToken);
        }

        if (imageID) {
            return await getTextWithImageID(imageID);
        }

        const response = {
            status: false,
            data: {},
            error: REQUEST_ERRORS.BAD_REQUEST,
        };
        return response;
    }

    const getText = async () => {
        if (preloadedData) {
            setMessageTimed('Preloaded Text Rendered.', 4000);
            return;
        }

        setShowSpinner(true);
        setMessage('Fetching Text.');

        const {
            status,
            data,
            error,
        } = await handleGetText();

        if (!componentIsMounted.current) {
            return;
        }

        if (error) {
            if (logErrors && error !== REQUEST_ERRORS.SENT_MESSAGE) {
                console.log(error);
            }

            if (error === REQUEST_ERRORS.NOT_AUTHORIZED) {
                setShowSpinner(false);
                setMessageTimed('Access Not Allowed. Please Check Your Account.', 4000);
                return;
            }

            if (error === REQUEST_ERRORS.NOT_FOUND) {
                setShowSpinner(false);
                setMessageTimed('Image Not Found. Extract or Add the Text.', 4000);
                return;
            }

            if (error === REQUEST_ERRORS.SENT_MESSAGE) {
                setShowSpinner(false);
                setMessage('Fetching Text.');
                return;
            }

            setShowSpinner(false);
            setMessageTimed('Something Went Wrong. Please Try Again.', 3000);
            return;
        }

        if (status) {
            setShowSpinner(false);

            if (data.imageText.length !== 0) {
                setMessageTimed('Rendered Text', 2000);
            } else {
                setMessageTimed('No Image Text Found.', 2000);
            }

            setDatabaseImageID(data.imageID);
            setImageText(data.imageText);
            return;
        }
    }



    /** EXTRACT TEXT */
    const extractTextWithApiKey = async (
        apiKey: string,
    ) => {
        const input = {
            imageURL: imageURLFromSrc(src),
            apiKey,
        };

        if (sendMessage) {
            sendMessage({
                type: MESSAGE_TYPES.EXTRACT_TEXT_WITH_API_KEY,
                input,
            });

            const response = {
                status: false,
                error: REQUEST_ERRORS.SENT_MESSAGE,
                data: undefined,
            }
            return response;
        }

        const response = await logic.text.extract.withAPIKey(
            input,
            graphqlClient.current,
        );
        return response;
    }

    const extractTextWithOwnerToken = async (
        ownerToken: string,
    ) => {
        const input = {
            imageURL: imageURLFromSrc(src),
            ownerToken,
        };

        if (sendMessage) {
            sendMessage({
                type: MESSAGE_TYPES.EXTRACT_TEXT_WITH_OWNER_TOKEN,
                input,
            });

            const response = {
                status: false,
                error: REQUEST_ERRORS.SENT_MESSAGE,
                data: undefined,
            }
            return response;
        }

        const response = await logic.text.extract.withOwnerToken(
            input,
            graphqlClient.current,
        );
        return response;
    }

    const extractTextWithImageID = async (
        imageID: string,
    ) => {
        const input = {
            imageURL: imageURLFromSrc(src),
            imageID,
        };

        if (sendMessage) {
            sendMessage({
                type: MESSAGE_TYPES.EXTRACT_TEXT_WITH_IMAGE_ID,
                input,
            });

            const response = {
                status: false,
                error: REQUEST_ERRORS.SENT_MESSAGE,
                data: undefined,
            }
            return response;
        }

        const response = await logic.text.extract.withImageID(
            input,
            graphqlClient.current,
        );
        return response;
    }

    const handleExtractText = async () => {
        if (apiKey) {
            return await extractTextWithApiKey(apiKey);
        }

        if (ownerToken) {
            return await extractTextWithOwnerToken(ownerToken);
        }

        if (imageID) {
            return await extractTextWithImageID(imageID);
        }

        const response = {
            status: false,
            error: REQUEST_ERRORS.BAD_REQUEST,
            data: undefined,
        }
        return response;
    }

    const extractText = async () => {
        if (preloadedData) {
            setMessageTimed('Preloaded Text Rendered.', 4000);
            return;
        }

        setShowSpinner(true);
        setMessage('Extracting Text.');

        const {
            status,
            data,
            error,
        } = await handleExtractText();

        if (error) {
            if (logErrors && error !== REQUEST_ERRORS.SENT_MESSAGE) {
                console.log(error);
            }

            if (error === REQUEST_ERRORS.NOT_AUTHORIZED) {
                setShowSpinner(false);
                setMessageTimed('Access Not Allowed. Please Check Your Account.', 4000);
                return;
            }

            if (error === REQUEST_ERRORS.SENT_MESSAGE) {
                setShowSpinner(false);
                setMessage('Extracting Text.');
                return;
            }

            setShowSpinner(false);
            setMessageTimed('Something Went Wrong. Please Try Again.', 3000);
            return;
        }

        if (status) {
            setShowSpinner(false);
            setMessageTimed('Text Extracted and Rendered.', 2000);
            setDatabaseImageID(data.imageID);
            setImageText(data.imageText);
            return;
        }
    }



    /** SAVE TEXT */
    const saveTextWithApiKey = async (
        apiKey: string,
    ) => {
        const input = {
            apiKey,
            imageURL: imageURLFromSrc(src),
            imageID: databaseImageID || '',
            imageText,
            deletedTexts,
        };

        if (sendMessage) {
            sendMessage({
                type: MESSAGE_TYPES.SAVE_TEXT_WITH_API_KEY,
                input,
            });

            const response = {
                status: false,
                error: REQUEST_ERRORS.SENT_MESSAGE,
                data: undefined,
            };
            return response;
        }

        const response = await logic.text.save.withAPIKey(
            input,
            graphqlClient.current,
        );
        return response;
    }

    const saveTextWithOwnerToken = async (
        ownerToken: string,
    ) => {
        const input = {
            ownerToken,
            imageURL: imageURLFromSrc(src),
            imageID: databaseImageID || '',
            imageText,
            deletedTexts,
        };

        if (sendMessage) {
            sendMessage({
                type: MESSAGE_TYPES.SAVE_TEXT_WITH_OWNER_TOKEN,
                input,
            });

            const response = {
                status: false,
                error: REQUEST_ERRORS.SENT_MESSAGE,
                data: undefined,
            };
            return response;
        }

        const response = await logic.text.save.withOwnerToken(
            input,
            graphqlClient.current,
        );
        return response;
    }

    const saveTextWithImageID = async (
        imageID: string,
    ) => {
        const input = {
            imageID,
            imageURL: imageURLFromSrc(src),
            imageText,
            deletedTexts,
        };

        if (sendMessage) {
            sendMessage({
                type: MESSAGE_TYPES.SAVE_TEXT_WITH_IMAGE_ID,
                input,
            });

            const response = {
                status: false,
                error: REQUEST_ERRORS.SENT_MESSAGE,
                data: undefined,
            };
            return response;
        }

        const response = await logic.text.save.withImageID(
            input,
            graphqlClient.current,
        );
        return response;
    }

    const handleSaveText = async () => {
        if (apiKey) {
            return await saveTextWithApiKey(apiKey);
        }

        if (ownerToken) {
            return await saveTextWithOwnerToken(ownerToken);
        }

        if (imageID) {
            return await saveTextWithImageID(imageID);
        }

        const response = {
            status: false,
            error: REQUEST_ERRORS.BAD_REQUEST,
            data: undefined,
        };
        return response;
    }

    const saveText = async () => {
        setShowSpinner(true);
        setMessage('Saving Text.');

        const {
            status,
            error,
            data,
        } = await handleSaveText();

        if (error) {
            if (logErrors && error !== REQUEST_ERRORS.SENT_MESSAGE) {
                console.log(error);
            }

            if (error === REQUEST_ERRORS.SENT_MESSAGE) {
                setShowSpinner(false);
                setMessageTimed('Saving Text.', 4000);
                return;
            }

            setShowSpinner(false);
            setMessageTimed('Something Went Wrong. Please Try Again.', 3000);
            return;
        }

        if (status) {
            setShowSpinner(false);
            setMessageTimed('Text Saved.', 2000);
            setDatabaseImageID(data.imageID);
            setImageText(data.imageText);
            return;
        }
    }



    /** TRANSVIEW TEXT */
    const transviewTextWithApiKey = async (
        apiKey: string,
    ) => {
        const input = {
            apiKey,
            imageURL: imageURLFromSrc(src),
            imageID: databaseImageID || '',
            source: transviewSourceLanguage,
            target: transviewTargetLanguage,
        };

        if (sendMessage) {
            sendMessage({
                type: MESSAGE_TYPES.TRANSVIEW_TEXT_WITH_API_KEY,
                input,
            });

            const response = {
                status: false,
                error: REQUEST_ERRORS.SENT_MESSAGE,
                data: undefined,
            };
            return response;
        }

        const response = await logic.text.transview.withAPIKey(
            input,
            graphqlClient.current,
        );
        return response;
    }

    const transviewTextWithOwnerToken = async (
        ownerToken: string,
    ) => {
        const input = {
            ownerToken,
            imageURL: imageURLFromSrc(src),
            imageID: databaseImageID || '',
            source: transviewSourceLanguage,
            target: transviewTargetLanguage,
        };

        if (sendMessage) {
            sendMessage({
                type: MESSAGE_TYPES.TRANSVIEW_TEXT_WITH_OWNER_TOKEN,
                input,
            });

            const response = {
                status: false,
                error: REQUEST_ERRORS.SENT_MESSAGE,
                data: undefined,
            };
            return response;
        }

        const response = await logic.text.transview.withOwnerToken(
            input,
            graphqlClient.current,
        );
        return response;
    }

    const transviewTextWithImageID = async (
        imageID: string,
    ) => {
        const input = {
            imageID,
            imageURL: imageURLFromSrc(src),
            source: transviewSourceLanguage,
            target: transviewTargetLanguage,
        };

        if (sendMessage) {
            sendMessage({
                type: MESSAGE_TYPES.TRANSVIEW_TEXT_WITH_IMAGE_ID,
                input,
            });

            const response = {
                status: false,
                error: REQUEST_ERRORS.SENT_MESSAGE,
                data: undefined,
            };
            return response;
        }

        const response = await logic.text.transview.withImageID(
            input,
            graphqlClient.current,
        );
        return response;
    }

    const handleTransviewText = async () => {
        if (apiKey) {
            return await transviewTextWithApiKey(apiKey);
        }

        if (ownerToken) {
            return await transviewTextWithOwnerToken(ownerToken);
        }

        if (imageID) {
            return await transviewTextWithImageID(imageID);
        }

        const response = {
            status: false,
            error: REQUEST_ERRORS.BAD_REQUEST,
            data: undefined,
        };
        return response;
    }

    const transviewText = async () => {
        setShowSpinner(true);
        setMessage('Transviewing Text.');

        const {
            status,
            error,
            data,
        } = await handleTransviewText();

        if (error) {
            if (logErrors && error !== REQUEST_ERRORS.SENT_MESSAGE) {
                console.log(error);
            }

            if (error === REQUEST_ERRORS.SENT_MESSAGE) {
                setShowSpinner(false);
                setMessageTimed('Transviewing Text.', 4000);
                return;
            }

            setShowSpinner(false);
            setMessageTimed('Something Went Wrong. Please Try Again.', 3000);
            return;
        }

        if (status) {
            setShowSpinner(false);
            setMessageTimed('Text Transviewed.', 2000);
            setDatabaseImageID(data.imageID);
            setImageText(data.imageText);
            return;
        }
    }


    const addTransviewLanguage = (
        textID: string,
        language: string,
    ) => {
        const updatedImageText = imageText.map(text => {
            if (text.id !== textID) {
                return text;
            }

            const currentVersion = getVersionById(text);
            if (!currentVersion) {
                return text;
            }

            if (currentVersion.type !== 'TEXTLINE') {
                /**
                 * TODO
                 * implement for 'TEXTAREA
                 */
                return text;
            }

            const transviewLanguage: TextlineTransviewData = {
                backgrounded: false,
                language,
                content: currentVersion.content,
            };

            currentVersion.transview.data.push(transviewLanguage);

            const updatedText = updateVersion(text, currentVersion);
            return updatedText;
        });

        setImageText(updatedImageText);
    }

    const removeTransviewLanguage = (
        textID: string,
        language: string,
    ) => {
        const updatedImageText = imageText.map(text => {
            if (text.id !== textID) {
                return text;
            }

            const currentVersion = getVersionById(text);
            if (!currentVersion) {
                return text;
            }

            if (currentVersion.type !== 'TEXTLINE') {
                /**
                 * TODO
                 * implement for 'TEXTAREA
                 */
                return text;
            }

            const transviews = currentVersion.transview.data.filter(data => data.language !== language);

            currentVersion.transview.data = [
                ...transviews,
            ];

            const updatedText = updateVersion(text, currentVersion);
            return updatedText;
        });

        setImageText(updatedImageText);
    }

    const setActiveTransview = (
        textID: string,
        language: string,
    ) => {
        const updatedImageText = imageText.map(text => {
            if (text.id !== textID) {
                return text;
            }

            const currentVersion = getVersionById(text);
            if (!currentVersion) {
                return text;
            }

            if (currentVersion.type !== 'TEXTLINE') {
                /**
                 * TODO
                 * implement for 'TEXTAREA
                 */
                return text;
            }

            currentVersion.transview.active = language;

            const updatedText = updateVersion(text, currentVersion);
            return updatedText;
        });

        setImageText(updatedImageText);
    }

    const toggleBackgroundedTransview = (
        textID: string,
        language: string,
    ) => {
        const updatedImageText = imageText.map(text => {
            if (text.id !== textID) {
                return text;
            }

            const currentVersion = getVersionById(text);
            if (!currentVersion) {
                return text;
            }

            if (currentVersion.type !== 'TEXTLINE') {
                /**
                 * TODO
                 * implement for 'TEXTAREA
                 */
                return text;
            }

            const transviews = currentVersion.transview.data.map(data => {
                if (data.language !== language) {
                    return data;
                }

                const newTransview: TextlineTransviewData = {
                    ...data,
                    backgrounded: !data.backgrounded,
                };

                return newTransview;
            });

            currentVersion.transview.data = [
                ...transviews,
            ];

            const updatedText = updateVersion(text, currentVersion);
            return updatedText;
        });

        setImageText(updatedImageText);
    }



    /** ACTION */
    const emitAction = (
        type: string,
        textID: string,
    ) => {
        const text = imageText.find(item => item.id === textID);

        if (!text) {
            return;
        }

        const detail: ActionDetail = {
            type,
            text,
        };

        const event = new CustomEvent(
            ENHANCED_IMAGE_ACTION,
            {
                detail,
            },
        );

        window.dispatchEvent(event);
    }


    /** TEXT */
    const downloadText = () => {
        const stringifiedText = JSON.stringify(imageText, null, 4);

        const imageName = imageID || databaseImageID || 'eit-' + src;
        const filename = imageName + '.json';

        const element = document.createElement('a');
        element.setAttribute(
            'href',
            'data:text/plain;charset=utf-8,' + encodeURIComponent(stringifiedText),
        );
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    const saveImage = async () => {
        const imageName = src;
        const image: any = await loadImage(src);

        const width = image.naturalWidth;
        const height = image.naturalHeight;

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const context: any = canvas.getContext('2d');
        context.filter = `
            invert(${imageColorsInvert ? 100 : 0}%)
            contrast(${imageColorsContrast}%)
            hue-rotate(${imageColorsHue}deg)
            saturate(${imageColorsSaturation}%)
            brightness(${imageColorsBrightness}%)
        `;
        if (flipVertical) {
            context.translate(canvas.width, 0);
            context.scale(-1, 1);
        }
        if (flipHorizontal) {
            context.translate(0, canvas.height);
            context.scale(1, -1);
        }
        context.drawImage(image, 0, 0, width, height);

        const imageDataType = imageType.toLowerCase() || 'png';
        const imageData = canvas.toDataURL(`image/${imageDataType}`);
        const blob = dataURIToBlob(imageData);

        setSaveImageHref(URL.createObjectURL(blob));
        setSaveImageDownload(imageName);
    }

    const generateImage = async () => {

    }

    const colorizeImage = async () => {

    }

    const cycleImageBackground = () => {
        if (imageBackground === 0) {
            setImageBackground(1);
        }
        if (imageBackground === 1) {
            setImageBackground(2);
        }
        if (imageBackground > 1) {
            setImageBackground(0);
        }
    }

    const resetDefaultsColor = () => {
        setImageColorsInvert(!!SLIDER_VALUE_DEFAULTS.Invert);
        setImageColorsContrast(SLIDER_VALUE_DEFAULTS.Contrast);
        setImageColorsHue(SLIDER_VALUE_DEFAULTS.Hue);
        setImageColorsSaturation(SLIDER_VALUE_DEFAULTS.Saturation);
        setImageColorsBrightness(SLIDER_VALUE_DEFAULTS.Brightness);
        setImageBackground(0);

        if (defaultsToggled) {
            setDefaultsToggled(false);
        }
    }

    const resetDefaultsTopology = () => {
        setImageTopologyOverflow(false);
        setFlipVertical(false);
        setFlipHorizontal(false);
        setImageTopologyDrag(false);
        setImageTopologyRotate(0);
        setImageTopologyScale(0);
        setImageTopologyX(0);
        setImageTopologyY(0);
        setImageCoordinateX(0);
        setImageCoordinateY(0);
    }

    const viewFullscreen = () => {
        if (
            imageContainer.current
            && !document.fullscreenElement
        ) {
            imageContainer.current.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    const shareImage = () => {
        const invertString = imageColorsInvert
            ? 'I100'
            : '';
        const contrastString = imageColorsContrast !== SLIDER_VALUE_DEFAULTS.Contrast
            ? `C${imageColorsContrast}`
            : '';
        const hueString = imageColorsHue !== SLIDER_VALUE_DEFAULTS.Hue
            ? `H${imageColorsHue}`
            : '';
        const saturationString = imageColorsSaturation !== SLIDER_VALUE_DEFAULTS.Saturation
            ? `S${imageColorsSaturation}`
            : '';
        const brightnessString = imageColorsBrightness !== SLIDER_VALUE_DEFAULTS.Brightness
            ? `B${imageColorsBrightness}`
            : '';
        const enhancedString = '/' + invertString + contrastString + hueString + saturationString + brightnessString;

        const imagePath = '/' + databaseImageID.slice(0, 16) + enhancedString;
        const url = DEPICT_DOMAIN + imagePath;
        window.open(url, '_blank');
    }

    const viewAbout = () => {
        window.open(ABOUT_URL, '_blank');
    }

    const toggleDefaults = () => {
        if (defaultsToggled) {
            setImageBackground(previousImageColors.background);
            setImageColorsInvert(!!previousImageColors.invert);
            setImageColorsContrast(previousImageColors.contrast);
            setImageColorsHue(previousImageColors.hue);
            setImageColorsSaturation(previousImageColors.saturation);
            setImageColorsBrightness(previousImageColors.brightness);

            setDefaultsToggled(false);
        } else {
            const previousColorValues = {
                background: imageBackground,
                invert: imageColorsInvert ? 1 : 0,
                contrast: imageColorsContrast,
                hue: imageColorsHue,
                saturation: imageColorsSaturation,
                brightness: imageColorsBrightness,
            };

            setPreviousImageColors(previousColorValues);
            resetDefaultsColor();
            setDefaultsToggled(true);
        }
    }


    const updateVersionContent = (
        textID: string,
        value: string,
    ) => {
        const updatedImageText = imageText.map(text => {
            if (text.id === textID) {
                const currentVersion = getVersionById(text);

                if (!currentVersion) {
                    return { ...text };
                }

                if (currentVersion.type !== 'TEXTLINE') {
                    /**
                     * TODO
                     * handle 'TEXTAREA'
                     */
                    return { ...text };
                }

                const {
                    active,
                    data,
                } = currentVersion.transview;

                /** Handle source */
                if (active === 'SOURCE') {
                    currentVersion.content = value;
                    const updatedText = updateVersion(text, currentVersion);
                    return {
                        ...updatedText,
                    };
                }

                /** Handle transview */
                const transviewData = data.map(data => {
                    if (data.language !== active) {
                        return data;
                    }

                    return {
                        ...data,
                        content: value,
                    };
                });

                currentVersion.transview.data = [
                    ...transviewData,
                ];
                const updatedText = updateVersion(text, currentVersion);
                return {
                    ...updatedText,
                };
            }

            return { ...text };
        });

        setImageText([...updatedImageText]);
    }

    const toggleVersionViewable = (
        textID: string,
    ) => {
        const updatedImageText = imageText.map(text => {
            if (text.id === textID) {
                const currentVersion = getVersionById(text);
                if (currentVersion) {
                    const updatedVersion = { ...currentVersion };
                    updatedVersion.viewable = !currentVersion.viewable;
                    const updatedText = updateVersion(text, updatedVersion);
                    return updatedText;
                }
            }

            return text;
        });

        setImageText(updatedImageText);
    }

    const duplicateTextItem = (
        versionID: string,
    ) => {
        const imgText = imageText.find(imgText => imgText.id === versionID);

        if (imgText) {
            const currentVersion = getVersionById(imgText);
            if (currentVersion && currentVersion.type === 'TEXTLINE') {
                const version = getImmutableTextline(currentVersion);

                const currentVersionId = 'eiv_' + uuid.generate();
                version.id = currentVersionId;
                version.position.y = currentVersion.position.y < 85
                    ? currentVersion.position.y + 10
                    : currentVersion.position.y - 10;

                const id = 'eit_' + uuid.generate();
                const updatedImgText: ImageText = {
                    id,
                    currentVersionId,
                    versions: [version],
                };

                const updatedImageText = [
                    ...imageText,
                    updatedImgText,
                ];
                setImageText(updatedImageText);
            }
        }
    }

    const deleteTextItem = (
        textID: string,
    ) => {
        const updatedImageText = imageText.filter(text => {
            if (text.id === textID) {
                setDeletedTexts(deletedTexts => [...deletedTexts, textID]);
                return false;
            }

            return text;
        });

        setImageText(updatedImageText);
    }

    const updateTextCoordinates = (
        versionID: string,
        coordinates: any,
    ) => {
        const updatedImageText = imageText.map(text => {
            if (text.id === versionID) {
                const currentVersion = getVersionById(text);
                if (currentVersion) {
                    const updatedVersion = { ...currentVersion };
                    updatedVersion.position.x = coordinates.x;
                    updatedVersion.position.y = coordinates.y;
                    const updatedText = updateVersion(text, updatedVersion);
                    return { ...updatedText };
                }

                return { ...text };
            }

            return { ...text };
        });

        setImageText([...updatedImageText]);
    }

    const updateTextItemField = (
        versionID: string,
        type: string,
        value: number | string | boolean,
    ) => {
        const updatedImageText = imageText.map(text => {
            if (text.id === versionID) {
                const currentVersion = getVersionById(text);

                if (currentVersion) {
                    const updatedVersion = objects.updateNested(
                        currentVersion,
                        type,
                        value,
                    );

                    if (!updatedVersion) {
                        return {
                            ...text,
                        };
                    }

                    const updatedText = updateVersion(text, updatedVersion);
                    return {
                        ...updatedText,
                    };
                }

                return {
                    ...text,
                };
            }

            return {
                ...text,
            };
        });

        setImageText([
            ...updatedImageText,
        ]);
    }



    /** ENTITIES */
    const addEntity = () => {
        setMessageTimed('Added New Entity', 1500);

        const newEntityID = 'eie_' + uuid.generate();

        const newEntity: ImageEntityRectangular = {
            ...emptyImageEntityRectangular,
            id: newEntityID,
        };

        const updatedEntities = [
            ...imageEntities,
            newEntity,
        ];

        setImageEntities(updatedEntities);
    }

    const convertEntity = (
        id: string,
        to: ImageEntityType,
    ) => {
        /**
         * TODO:
         * consider the position, color, and more before and after conversion
         */

        const entity = imageEntities.find(entity => entity.id === id);

        if (!entity) {
            return;
        }

        const previousEntityData = entity.data;
        const toEntityData = baseEntitiesData[to];

        /** HACK: as ImageEntity */
        const updatedEntity: any = {
            ...entity,
            type: to,
            data: {
                ...toEntityData,
                position: {
                    ...previousEntityData.position,
                },
                viewable: previousEntityData.viewable,
                action: {
                    ...previousEntityData.action,
                },
                border: {
                    ...previousEntityData.border,
                },
                highlight: previousEntityData.highlight,
                customStyle: previousEntityData.customStyle,
                opacity: previousEntityData.opacity,
                annotation: previousEntityData.annotation,
                labels: [
                    ...previousEntityData.labels,
                ],
            },
        };

        const updatedEntities: ImageEntity[] = imageEntities.map(entity => {
            if (entity.id !== id) {
                return {
                    ...entity,
                };
            }

            return {
                ...updatedEntity,
            };
        });

        setImageEntities(updatedEntities);
    }


    /** effects */
    /** Defaults Colors */
    useEffect(() => {
        if (defaultsToggled) {
            if (
                imageColorsInvert !== false
                || imageColorsContrast !== SLIDER_VALUE_DEFAULTS.Contrast
                || imageColorsHue !== SLIDER_VALUE_DEFAULTS.Hue
                || imageColorsSaturation !== SLIDER_VALUE_DEFAULTS.Saturation
                || imageColorsBrightness !== SLIDER_VALUE_DEFAULTS.Brightness
            ) {
                setDefaultsToggled(false);
            }
        }
    }, [
        imageColorsInvert,
        imageColorsContrast,
        imageColorsHue,
        imageColorsSaturation,
        imageColorsBrightness,
    ]);

    /** Handle Colors Change */
    useEffect(() => {
        if (atColorsChange) {
            const data: ImageColorsData = {
                invert: imageColorsInvert ? 1 : 0,
                contrast: imageColorsContrast,
                hue: imageColorsHue,
                saturation: imageColorsSaturation,
                brightness: imageColorsBrightness,
            };
            atColorsChange(data);
        }
    }, [
        imageColorsInvert,
        imageColorsContrast,
        imageColorsHue,
        imageColorsSaturation,
        imageColorsBrightness,
    ]);

    /** Preloaded Data. */
    useEffect(() => {
        if (preloadedData) {
            setImageText(preloadedData.imageText);
            setDatabaseImageID(preloadedData.imageID);
            setMessageTimed('Rendered Text.', 3000);
        }
    }, [
        preloadedData,
    ]);

    /** Message Timed. */
    useEffect(() => {
        if (timedNotification) {
            const {
                text,
                time,
            } = timedNotification;

            if (text) {
                setMessageTimed(text, time);
            }
        }
    }, [
        timedNotification,
    ]);

    /** Handle Timeouts */
    useEffect(() => {
        return () => {
            if (messageTimer.current) {
                clearTimeout(messageTimer.current);
            }
        }
    }, []);

    /** Image Type. */
    useEffect(() => {
        if (/\.png/.test(src)) {
            setImageType(IMAGE_TYPES.PNG);
        }
        if (/\.jpe?g/.test(src)) {
            setImageType(IMAGE_TYPES.JPG);
        }
        if (/\.webp/.test(src)) {
            setImageType(IMAGE_TYPES.WEBP);
        }
        if (/\.gif/.test(src)) {
            setImageType(IMAGE_TYPES.GIF);
        }
    }, [
        src,
    ]);

    /** Get Text on Load. */
    useEffect(() => {
        if (getTextOnLoad) {
            getText();
        }
    }, [
        getTextOnLoad,
    ]);

    /** Handle transview. */
    useEffect(() => {
        if (transviewActive) {
            const existingTransview = transviews.current.get(transviewTargetLanguage);

            if (!existingTransview) {
                setShowSpinner(true);
                setMessageTimed(
                    'Fetching Transviewed Text.',
                    4000
                );

                // TODO
                // get transview from server given the imageID and the
                return;
            }

            // TODO
            // transview already exists locally

            // set the source in transviews
            transviews.current.set('Source', imageText);

            // render the transview
            setImageText(existingTransview);

            setMessageTimed(
                'Transviewed Text Rendered.',
                4000
            );
            return;
        }

        const sourceText = transviews.current.get('Source');

        if (!sourceText) {
            return;
        }

        setMessageTimed(
            'Source Text Rendered.',
            4000
        );
        setImageText(sourceText);
    }, [
        transviewActive,
        transviewSourceLanguage,
        transviewTargetLanguage,
    ]);

    /** Handle Component Mounted */
    useEffect(() => {
        return () => {
            componentIsMounted.current = false
        }
    }, []);

    /** Handle Window Resize */
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);


    /**
     * Handle dragging (mouseup).
     */
    useEffect(() => {
        const handleMouseUp = () => {
            if (imageTopologyDrag) {
                setImageTopologyDragging(false);
            }
        }

        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
        }
    }, [
        imageTopologyDrag,
        imageTopologyDragging,
    ]);

    /**
     * Handle dragging (movemove).
     */
    useEffect(() => {
        const handleMouseMove = (event: any) => {
            if (!imageTopologyDragging) {
                return;
            }

            event.preventDefault();

            const pageX = event.pageX;
            const pageY = event.pageY;

            const differenceX = pageX - imageTopologyX;
            const differenceY = pageY - imageTopologyY;

            updateTopologyLocation(
                differenceX,
                differenceY,
            );
        }

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        }
    }, [
        imageTopologyDragging,
        imageTopologyDrag,
        imageTopologyX,
        imageTopologyY,
    ]);



    /** context */
    const context: IContext = {
        src,
        srcset,
        alt: _alt,

        imageStyle: _imageStyle,
        theme: _theme,
        transparentUI: _transparentUI,
        about: _about,
        generator: _generator,
        development: _development,
        silent: _silent,
        settingsDrawers: _settingsDrawers,
        textDrawer: _textDrawer,
        topologyDrawer: _topologyDrawer,
        variaDrawer: _variaDrawer,

        apiEndpoint: _apiEndpoint,
        apiKey,
        ownerToken,
        imageID,

        databaseImageID,

        handleLoadedImage,
        loadedImage,

        imageType,

        imageBackground,
        cycleImageBackground,

        imageDimensions,
        imageBoxDimensions,

        setMessage,
        setMessageTimed,
        setShowSpinner,

        showSettingsButton,
        setShowSettingsButton,

        showSettingsMenu,
        setShowSettingsMenu,

        expandTextDrawer,
        setExpandTextDrawer,
        expandColorDrawer,
        setExpandColorDrawer,
        expandTopologyDrawer,
        setExpandTopologyDrawer,
        expandEntitiesDrawer,
        setExpandEntitiesDrawer,
        expandVariaDrawer,
        setExpandVariaDrawer,

        editableText,
        setEditableText,
        revealedText,
        setRevealedText,

        editableEntities,
        setEditableEntities,
        revealedEntities,
        setRevealedEntities,

        showTransviewSettings,
        setShowTransviewSettings,
        transviewActive,
        setTransviewActive,
        transviewSourceLanguage,
        setTransviewSourceLanguage,
        transviewTargetLanguage,
        setTransviewTargetLanguage,

        imageText,
        imageEntities,

        addTransviewLanguage,
        removeTransviewLanguage,
        setActiveTransview,
        toggleBackgroundedTransview,

        emitAction,

        addText,
        saveText,

        getText,
        extractText,
        downloadText,
        transviewText,

        saveImage,
        saveImageHref,
        saveImageDownload,

        generateImage,
        colorizeImage,

        imageColorsInvert,
        setImageColorsInvert,
        imageColorsContrast,
        setImageColorsContrast,
        imageColorsHue,
        setImageColorsHue,
        imageColorsSaturation,
        setImageColorsSaturation,
        imageColorsBrightness,
        setImageColorsBrightness,

        defaultsToggled,
        toggleDefaults,
        resetDefaultsColor,

        imageTopologyOverflow,
        setImageTopologyOverflow,
        flipVertical,
        setFlipVertical,
        flipHorizontal,
        setFlipHorizontal,
        imageTopologyDrag,
        setImageTopologyDrag,
        imageTopologyRotate,
        setImageTopologyRotate,
        imageTopologyScale,
        setImageTopologyScale,
        resetDefaultsTopology,

        imageCoordinateX,
        imageCoordinateY,

        viewFullscreen,
        shareImage,
        viewAbout,

        updateVersionContent,
        toggleVersionViewable,
        duplicateTextItem,
        deleteTextItem,
        updateTextCoordinates,
        updateTextItemField,


        /** entities */
        addEntity,
        convertEntity,
    };


    /** render */
    return (
        <Context.Provider
            value={context}
        >
            <StyledEnhancedImage
                theme={context.theme}
                topologyOverflow={imageTopologyOverflow}
                topologyDrag={imageTopologyDrag}
                topologyDragging={imageTopologyDragging}
                onMouseDown={(event) => handleMouseDown(event)}
                onMouseEnter={() => setShowSettingsButton(true)}
                onMouseLeave={() => setShowSettingsButton(false)}
                onMouseMove={() => !showSettingsButton
                    ? setShowSettingsButton(true)
                    : null
                }
                ref={imageContainer}
            >
                <Image />

                {loadedImage && (
                    <Text />
                )}

                {loadedImage && (
                    <Entities />
                )}

                {loadedImage
                && showSettingsButton
                && !silent
                && (
                    <Settings />
                )}

                {message
                && !silent
                && (
                    <Message
                        text={message}
                    />
                )}

                {showSpinner
                && !silent
                && (
                    <Spinner />
                )}
            </StyledEnhancedImage>
        </Context.Provider>
    );
}


export default EnhancedImage;
/** [END] component */
