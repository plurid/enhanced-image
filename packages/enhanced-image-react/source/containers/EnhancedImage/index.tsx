import React, {
    useState,
    useRef,
    useEffect,
} from 'react';

import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

import themes, {
    Theme,
} from '@plurid/plurid-themes';

import {
    uuid,
} from '@plurid/plurid-functions';

import './styles.css';
import {
    StyledEnhancedImage,
} from './styled';

import logic from '../../logic';

import Context from '../../services/utilities/context';

import Image from '../../components/Image';
import Text from '../../components/Text';
import Settings from '../../components/Settings';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';

import {
    EnhancedImageProperties,
    Context as IContext,
    ImageDimensions,
    ImageBoxDimensions,
    ImageText,
    ImageColorsData,
} from '../../data/interfaces';

import {
    PLURID_API_ENDPOINT,
    SLIDER_VALUE_DEFAULTS,
    ABOUT_URL,
    DEPICT_DOMAIN,
    REQUEST_ERRORS,
    MESSAGE_TYPES,

    IMAGE_TYPES,
} from '../../data/constants';

import {
    initialImageDimensions,
    initialImageBoxDimensions,
    initialPreviousImageColors,
} from '../../data/constants/initializers';

import {
    getVersionById,
    updateVersion,
    imageURLFromSrc,
} from '../../services/utilities/imageText';

import {
    loadImage,
    dataURIToBlob,
} from '../../services/utilities/image';

import client from '../../services/graphql/client';



const EnhancedImage: React.FC<EnhancedImageProperties> = (
    properties,
) => {
    /** properties */
    const {
        src,
        srcset,
        alt,

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
        data,
        timedNotification,

        getTextOnLoad,

        initialColors,

        development,
        silent,
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


    /** references */
    const componentIsMounted = useRef(true);
    const messageTimer = useRef<number | null> (null);

    const graphqlClient= useRef<ApolloClient<NormalizedCacheObject>>(client(_apiEndpoint));

    const imageContainer = useRef<HTMLDivElement>(null);


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
    const [expandVariaDrawer, setExpandVariaDrawer] = useState(false);

    const [editableText, setEditableText] = useState(false);

    const [saveImageHref, setSaveImageHref] = useState('');
    const [saveImageDownload, setSaveImageDownload] = useState('');

    const [imageText, setImageText] = useState<ImageText[]>([]);

    const [deletedTexts, setDeletedTexts] = useState<string[]>([]);

    const [imageColorsInvert, setImageColorsInvert] = useState(!!initialColors?.invert || !!SLIDER_VALUE_DEFAULTS.Invert);
    const [imageColorsContrast, setImageColorsContrast] = useState(initialColors?.contrast || SLIDER_VALUE_DEFAULTS.Contrast);
    const [imageColorsHue, setImageColorsHue] = useState(initialColors?.hue || SLIDER_VALUE_DEFAULTS.Hue);
    const [imageColorsSaturation, setImageColorsSaturation] = useState(initialColors?.saturation || SLIDER_VALUE_DEFAULTS.Saturation);
    const [imageColorsBrightness, setImageColorsBrightness] = useState(initialColors?.brightness || SLIDER_VALUE_DEFAULTS.Brightness);

    const [defaultsToggled, setDefaultsToggled] = useState(false);

    const [previousImageColors, setPreviousImageColors] = useState(initialPreviousImageColors);

    const [flipVertical, setFlipVertical] = useState(false);
    const [flipHorizontal, setFlipHorizontal] = useState(false);

    const [databaseImageID, setDatabaseImageID] = useState('');


    /** handlers */
    const handleLoadedImage = async (
        loadedImage: React.SyntheticEvent<HTMLImageElement, Event>
    ) => {
        const image = loadedImage.currentTarget;

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

                    xCoordPercentage: 5,
                    yCoordPercentage: 9,

                    perspective: '',
                    rotation: '',
                    skew: '',

                    viewable: false,

                    color: 'white',

                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    fontFamily: 'Arial',
                    fontSizePercentage: 7,
                    letterSpacingPercentage: 0,
                    wordSpacingPercentage: 0,
                    lineHeightPercentage: 0,

                    content: 'New Text',

                    link: false,
                    linkTo: '',
                },
            ],
        };

        const updatedTexts = [...imageText, newText];
        setImageText(updatedTexts);
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

        const response = await logic.getTextWithAPIKey(
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

        const response = await logic.getTextWithOwnerToken(
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

        const response = await logic.getTextWithImageID(
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

        const response = await logic.extractTextWithAPIKey(
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

        const response = await logic.extractTextWithOwnerToken(
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

        const response = await logic.extractTextWithImageID(
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
        setShowSpinner(true);
        setMessage('Extracting Text.');

        const {
            status,
            data,
            error,
        } = await handleExtractText();

        if (error) {
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

        const response = await logic.saveTextWithAPIKey(
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

        const response = await logic.saveTextWithOwnerToken(
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
                type: MESSAGE_TYPES.EXTRACT_TEXT_WITH_IMAGE_ID,
                input,
            });

            const response = {
                status: false,
                error: REQUEST_ERRORS.SENT_MESSAGE,
                data: undefined,
            };
            return response;
        }

        const response = await logic.saveTextWithImageID(
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

    const transviewText = async () => {

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

    const cycleImageBackground = async () => {
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

    const resetToDefaults = () => {
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
            resetToDefaults();
            setDefaultsToggled(true);
        }
    }


    const updateVersionContent = (
        versionID: string,
        value: string,
    ) => {
        const updatedImageText = imageText.map(text => {
            if (text.id === versionID) {
                const currentVersion = getVersionById(text);
                if (currentVersion) {
                    const updatedVersion = { ...currentVersion };
                    updatedVersion.content = value;
                    const updatedText = updateVersion(text, updatedVersion);
                    return { ...updatedText };
                }

                return { ...text };
            }

            return { ...text };
        });

        setImageText([...updatedImageText]);
    }

    const toggleVersionViewable = (
        versionID: string,
    ) => {
        const updatedImageText = imageText.map(text => {
            if (text.id === versionID) {
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
            if (currentVersion) {
                const version = { ...currentVersion };
                const currentVersionId = uuid.generate();
                version.id = currentVersionId;
                version.yCoordPercentage = currentVersion.yCoordPercentage < 85
                    ? currentVersion.yCoordPercentage + 10
                    : currentVersion.yCoordPercentage - 10;

                const id = uuid.generate();
                const updatedImgText: ImageText = {
                    id,
                    currentVersionId,
                    versions: [version],
                };

                const updatedImageText = [...imageText, updatedImgText];
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
                    updatedVersion.xCoordPercentage = coordinates.x;
                    updatedVersion.yCoordPercentage = coordinates.y;
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
                    const updatedVersion = { ...currentVersion };
                    (updatedVersion as any)[type] = value;
                    const updatedText = updateVersion(text, updatedVersion);
                    return { ...updatedText };
                }

                return { ...text };
            }

            return { ...text };
        });

        setImageText([...updatedImageText]);
    }


    /** effects */
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

    useEffect(() => {
        if (data) {
            // console.log('Data has been set', data);
            setImageText(data.imageText);
            setDatabaseImageID(data.imageID);
            setMessageTimed('Rendered Text.', 3000);
        }
    }, [
        data,
    ]);

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

    useEffect(() => {
        if (getTextOnLoad) {
            getText();
        }
    }, [
        getTextOnLoad,
    ]);

    /** Handle Component Mounted */
    useEffect(() => {
        return () => {
            componentIsMounted.current = false
        }
    }, []);

    /** Handle Timeouts */
    useEffect(() => {
        return () => {
            if (messageTimer.current) {
                clearTimeout(messageTimer.current);
            }
        }
    }, []);

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
        expandVariaDrawer,
        setExpandVariaDrawer,

        editableText,
        setEditableText,

        imageText,

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
        resetToDefaults,

        flipVertical,
        setFlipVertical,
        flipHorizontal,
        setFlipHorizontal,

        viewFullscreen,
        shareImage,
        viewAbout,

        updateVersionContent,
        toggleVersionViewable,
        duplicateTextItem,
        deleteTextItem,
        updateTextCoordinates,
        updateTextItemField,
    };


    /** render */
    return (
        <Context.Provider
            value={context}
        >
            <StyledEnhancedImage
                theme={context.theme}
                onMouseEnter={() => setShowSettingsButton(true)}
                onMouseLeave={() => setShowSettingsButton(false)}
                onMouseMove={() => !showSettingsButton
                    ? setShowSettingsButton(true)
                    : null
                }
                style={{
                    width: imageBoxDimensions.width !== 0 ? imageBoxDimensions.width + 'px' : '',
                    height:  imageBoxDimensions.height !== 0 ? imageBoxDimensions.height + 'px' : '',
                }}
                ref={imageContainer}
            >
                <Image />

                {loadedImage && (
                    <Text />
                )}

                {loadedImage
                && showSettingsButton
                && !silent
                && (
                    <Settings />
                )}

                {message && (
                    <Message
                        text={message}
                    />
                )}

                {showSpinner && (
                    <Spinner />
                )}
            </StyledEnhancedImage>
        </Context.Provider>
    );
}


export default EnhancedImage;
