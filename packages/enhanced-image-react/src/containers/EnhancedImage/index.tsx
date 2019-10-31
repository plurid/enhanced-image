import React, {
    useState,
    useRef,
    useEffect,
} from 'react';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import './styles.css';
import {
    StyledEnhancedImage,
} from './styled';

import Context from '../../services/utilities/context';

import {
    EnhancedImageProperties,
    Context as IContext,
    ImageDimensions,
    ImageBoxDimensions,
    ImageText,
} from '../../data/interfaces';

import {
    PLURID_API_ENDPOINT,
    SLIDER_VALUE_DEFAULTS,
    ABOUT_URL,
    DEPICT_DOMAIN,
    REQUEST_ERRORS,
    MESSAGE_TYPES,
} from '../../data/constants';

import {
    initialImageDimensions,
    initialImageBoxDimensions,
    initialPreviousImageColors,
} from '../../data/constants/initializers';

import Image from '../../components/Image';
import Text from '../../components/Text';
import Settings from '../../components/Settings';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';

import uuid from '../../services/utilities/uuid';

import {
    getVersionById,
    updateVersion,
    imageURLFromSrc,
} from '../../services/utilities/imageText';

import client from '../../services/graphql/client';

import themes, {
    Theme,
} from '@plurid/plurid-themes';

import logic from '../../logic';



const EnhancedImage: React.FC<EnhancedImageProperties> = (properties) => {
    const {
        src,
        srcset,
        alt,

        imageStyle,
        theme,
        transparentUI,
        about,

        atLoad,

        apiEndpoint,

        apiKey,
        userToken,
        imageID,

        sendMessage,
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

    const _apiEndpoint = apiEndpoint ? apiEndpoint : PLURID_API_ENDPOINT;

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

    const [imageText, setImageText] = useState<ImageText[]>([]);

    const [imageColorsInvert, setImageColorsInvert] = useState(!!SLIDER_VALUE_DEFAULTS.Invert);
    const [imageColorsContrast, setImageColorsContrast] = useState(SLIDER_VALUE_DEFAULTS.Contrast);
    const [imageColorsHue, setImageColorsHue] = useState(SLIDER_VALUE_DEFAULTS.Hue);
    const [imageColorsSaturation, setImageColorsSaturation] = useState(SLIDER_VALUE_DEFAULTS.Saturation);
    const [imageColorsBrightness, setImageColorsBrightness] = useState(SLIDER_VALUE_DEFAULTS.Brightness);

    const [defaultsToggled, setDefaultsToggled] = useState(false);

    const [previousImageColors, setPreviousImageColors] = useState(initialPreviousImageColors);

    const [flipVertical, setFlipVertical] = useState(false);
    const [flipHorizontal, setFlipHorizontal] = useState(false);

    const [databaseImageID, setDatabaseImageID] = useState('');

    const graphqlClient= useRef<ApolloClient<unknown>>(client(_apiEndpoint));

    const imageContainer = useRef<HTMLDivElement>(null);

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
        setTimeout(() => {
            setMessage('');
        }, time);
    }

    const addText = () => {
        setMessageTimed('Added New Text', 1500);

        const newTextID = uuid();
        const newTextVersionID = uuid();

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



    // GET TEXT
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
                data: {},
                error: REQUEST_ERRORS.BAD_REQUEST,
            }
            return response;
        }

        const response = await logic.getTextWithAPIKey(
            input,
            graphqlClient.current,
        );
        return response;
    }

    const getTextWithUserToken = async (
        userToken: string,
    ) => {
        const input = {
            imageURL: imageURLFromSrc(src),
            userToken,
        };

        if (sendMessage) {
            sendMessage({
                type: MESSAGE_TYPES.GET_TEXT_WITH_USER_TOKEN,
                input,
            });
        }

        const response = await logic.getTextWithUserToken(
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

        if (userToken) {
            return await getTextWithUserToken(userToken);
        }

        if (imageID) {
            return await getTextWithImageID(imageID);
        }

        const response = {
            status: false,
            data: {},
            error: REQUEST_ERRORS.BAD_REQUEST,
        }
        return response;
    }

    const getText = async () => {
        setShowSpinner(true);
        setMessage('Fetching Text');

        const {
            status,
            data,
            error,
        } = await handleGetText();

        if (error) {
            if (error === REQUEST_ERRORS.NOT_FOUND) {
                setShowSpinner(false);
                setMessageTimed('Image Not Found. Extract or Add the Text.', 4000);
                return;
            }
            setShowSpinner(false);
            setMessageTimed('Something Went Wrong. Please Try Again', 3000);
            return;
        }

        if (status) {
            setShowSpinner(false);
            setMessageTimed('Text Rendered', 2000);
            setDatabaseImageID(data.imageID);
            setImageText(data.imageText);
            return;
        }
    }



    // EXTRACT TEXT
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
        }

        const response = await logic.extractTextWithAPIKey(
            input,
            graphqlClient.current,
        );
        return response;
    }

    const extractTextWithUserToken = async (
        userToken: string,
    ) => {
        const input = {
            imageURL: imageURLFromSrc(src),
            userToken,
        };

        if (sendMessage) {
            sendMessage({
                type: MESSAGE_TYPES.EXTRACT_TEXT_WITH_USER_TOKEN,
                input,
            });
        }

        const response = await logic.extractTextWithUserToken(
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

        if (userToken) {
            return await extractTextWithUserToken(userToken);
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
        setMessage('Extracting Text');

        const {
            status,
            data,
            error,
        } = await handleExtractText();

        if (error) {
            setShowSpinner(false);
            setMessageTimed('Something Went Wrong. Please Try Again', 3000);
            return;
        }

        if (status) {
            setShowSpinner(false);
            setMessageTimed('Text Extracted and Rendered', 2000);
            setDatabaseImageID(data.imageID);
            setImageText(data.imageText);
            return;
        }
    }



    // SAVE TEXT
    const saveTextWithApiKey = async (
        apiKey: string,
    ) => {
        const input = {
            apiKey,
            imageURL: imageURLFromSrc(src),
            imageID: imageID || '',
            imageText,
        };

        if (sendMessage) {
            sendMessage({
                type: 'SAVE_TEXT_WITH_API_KEY',
                input,
            });
        }

        const response = await logic.saveTextWithAPIKey(
            input,
            graphqlClient.current,
        );
        return response;
    }

    const saveTextWithUserToken = async (
        userToken: string,
    ) => {
        const input = {
            userToken,
            imageURL: imageURLFromSrc(src),
            imageID: imageID || '',
            imageText,
        };

        if (sendMessage) {
            sendMessage({
                type: 'SAVE_TEXT_WITH_USER_TOKEN',
                input,
            });
        }

        const response = await logic.saveTextWithUserToken(
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
        };

        if (sendMessage) {
            sendMessage({
                type: 'SAVE_TEXT_WITH_IMAGE_ID',
                input,
            });
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

        if (userToken) {
            return await saveTextWithUserToken(userToken);
        }

        if (imageID) {
            return await saveTextWithImageID(imageID);
        }

        const response = {
            status: false,
            error: REQUEST_ERRORS.BAD_REQUEST,
            data: undefined,
        }
        return response;
    }

    const saveText = async () => {
        setShowSpinner(true);
        setMessage('Saving Text');

        const {
            status,
            error,
            data,
        } = await handleSaveText();

        if (error) {
            setShowSpinner(false);
            setMessageTimed('Something Went Wrong. Please Try Again', 3000);
            return;
        }

        if (status) {
            setShowSpinner(false);
            setMessageTimed('Text Saved', 2000);
            setDatabaseImageID(data.imageID);
            setImageText(data.imageText);
            return;
        }
    }



    const transviewText = async () => {

    }

    const saveImage = async () => {

    }

    const generateImage = async () => {

    }

    const colorizeImage = async () => {

    }

    const resetToDefaults = () => {
        setImageColorsInvert(!!SLIDER_VALUE_DEFAULTS.Invert);
        setImageColorsContrast(SLIDER_VALUE_DEFAULTS.Contrast);
        setImageColorsHue(SLIDER_VALUE_DEFAULTS.Hue);
        setImageColorsSaturation(SLIDER_VALUE_DEFAULTS.Saturation);
        setImageColorsBrightness(SLIDER_VALUE_DEFAULTS.Brightness);

        if (defaultsToggled) {
            setDefaultsToggled(false);
        }
    }

    const viewFullscreen = () => {

    }

    const shareImage = () => {
        const enhanced = '';
        const imageLocation = '/' + databaseImageID.slice(0, 16) + enhanced;
        const url = DEPICT_DOMAIN + imageLocation;
        window.open(url, '_blank');
    }

    const viewAbout = () => {
        window.open(ABOUT_URL, '_blank');
    }

    const toggleDefaults = () => {
        if (defaultsToggled) {
            setImageColorsInvert(!!previousImageColors.invert);
            setImageColorsContrast(previousImageColors.contrast);
            setImageColorsHue(previousImageColors.hue);
            setImageColorsSaturation(previousImageColors.saturation);
            setImageColorsBrightness(previousImageColors.brightness);

            setDefaultsToggled(false);
        } else {
            const previousColorValues = {
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


    const updateVersionContent = (versionID: string, value: string) => {
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

    const toggleVersionViewable = (versionID: string) => {
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

    const duplicateTextItem = (versionID: string) => {
        const imgText = imageText.find(imgText => imgText.id === versionID);

        if (imgText) {
            const currentVersion = getVersionById(imgText);
            if (currentVersion) {
                const version = { ...currentVersion };
                const currentVersionId = uuid();
                version.id = currentVersionId;
                version.yCoordPercentage = currentVersion.yCoordPercentage < 85
                    ? currentVersion.yCoordPercentage + 10
                    : currentVersion.yCoordPercentage - 10;

                const id = uuid();
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

    const deleteTextItem = (versionID: string) => {
        const updatedImageText = imageText.filter(text => {
            if (text.id === versionID) {
                return false;
            }

            return text;
        });

        setImageText(updatedImageText);
    }

    const updateTextCoordinates = (versionID: string, coordinates: any) => {
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
                    updatedVersion[type] = value;
                    const updatedText = updateVersion(text, updatedVersion);
                    return { ...updatedText };
                }

                return { ...text };
            }

            return { ...text };
        });

        setImageText([...updatedImageText]);
    }

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

    const context: IContext = {
        src,
        srcset,
        alt: _alt,

        imageStyle: _imageStyle,
        theme: _theme,
        transparentUI: _transparentUI,
        about: _about,

        apiEndpoint: _apiEndpoint,
        apiKey,
        userToken,
        imageID,

        databaseImageID,

        handleLoadedImage,
        loadedImage,

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
        transviewText,

        saveImage,

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

    return (
        <ApolloProvider
            client={graphqlClient.current}
        >
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

                    {loadedImage && showSettingsButton && (
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
        </ApolloProvider>
    );
}


export default EnhancedImage;
