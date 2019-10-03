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
} from '../../services/utilities/imageText';

import client from '../../services/graphql/client';
import {
    GET_TEXT_WITH_API_KEY,
    GET_TEXT_WITH_USER_TOKEN,
    GET_TEXT_WITH_IMAGE_ID,
} from '../../services/graphql/query';
import {
    EXTRACT_TEXT_WITH_API_KEY,
    EXTRACT_TEXT_WITH_USER_TOKEN,
    EXTRACT_TEXT_WITH_IMAGE_ID,
} from '../../services/graphql/mutate';

import themes, { Theme } from '@plurid/utilities.themes';



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

    const saveText = async () => {

    }

    // GET TEXT
    const getTextWithApiKey = async () => {
        try {
            const input = {
                imageURL: src,
                apiKey,
            };
            const query = await graphqlClient.current.query({
                query: GET_TEXT_WITH_API_KEY,
                variables: {
                    input,
                },
            });
            // console.log(query);

            const data = query.data.enhancedImageGetTextWithApiKey;

            if (!data.status) {
                const response = {
                    status: false,
                    imageData: {},
                    error: REQUEST_ERRORS.BAD_REQUEST,
                }
                return response;
            }

            const {
                imageData,
            } = data;

            const response = {
                status: true,
                imageData,
                error: undefined,
            };
            return response;
        } catch (error) {
            const response = {
                status: false,
                imageData: {},
                error: REQUEST_ERRORS.BAD_REQUEST,
            }
            return response;
        }
    }

    const getTextWithUserToken = async () => {
        try {
            const input = {
                imageURL: src,
                userToken,
            };
            const query = await graphqlClient.current.query({
                query: GET_TEXT_WITH_USER_TOKEN,
                variables: {
                    input,
                },
            });

            const data = query.data.enhancedImageGetTextWithUserToken;

            if (!data.status) {
                const response = {
                    status: false,
                    imageData: {},
                    error: REQUEST_ERRORS.BAD_REQUEST,
                }
                return response;
            }

            const {
                imageData,
            } = data;

            const response = {
                status: true,
                imageData,
                error: undefined,
            };
            return response;
        } catch (error) {
            const response = {
                status: false,
                imageData: {},
                error: REQUEST_ERRORS.BAD_REQUEST,
            }
            return response;
        }
    }

    const getTextWithImageID = async () => {
        try {
            const input = {
                imageURL: src,
                imageID,
            };
            const query = await graphqlClient.current.query({
                query: GET_TEXT_WITH_IMAGE_ID,
                variables: {
                    input,
                },
            });

            const data = query.data.enhancedImageGetTextWithImageID;

            if (!data.status) {
                const response = {
                    status: false,
                    imageData: {},
                    error: REQUEST_ERRORS.BAD_REQUEST,
                }
                return response;
            }

            const {
                imageData,
            } = data;

            const response = {
                status: true,
                imageData,
                error: undefined,
            };
            return response;
        } catch (error) {
            const response = {
                status: false,
                imageData: {},
                error: REQUEST_ERRORS.BAD_REQUEST,
            }
            return response;
        }
    }

    const handleGetText = async () => {
        if (apiKey) {
            const response = await getTextWithApiKey();
            return response;
        }

        if (userToken) {
            const response = await getTextWithUserToken();
            return response;
        }

        if (imageID) {
            const response = await getTextWithImageID();
            return response;
        }

        const response = {
            status: false,
            imageData: {},
            error: REQUEST_ERRORS.BAD_REQUEST,
        }
        return response;
    }

    const getText = async () => {
        setShowSpinner(true);
        setMessage('Fetching Text');

        const {
            status,
            imageData,
            error,
        } = await handleGetText();

        if (error) {
            setShowSpinner(false);
            setMessageTimed('Something Went Wrong. Please Try Again', 3000);
            return;
        }

        if (status) {
            setShowSpinner(false);
            setMessageTimed('Text Rendered', 2000);
            setDatabaseImageID(imageData.imageID);
            setImageText(imageData.imageText);
            return;
        }
    }

    // EXTRACT TEXT
    const extractTextWithApiKey = async () => {
        try {
            const input = {
                imageURL: src,
                apiKey,
            };
            const mutation = await graphqlClient.current.mutate({
                mutation: EXTRACT_TEXT_WITH_API_KEY,
                variables: {
                    input,
                },
            });
            console.log(mutation);

            const data = mutation.data.enhancedImageExtractTextWithApiKey;

            if (!data.status) {
                const response = {
                    status: false,
                    imageData: {},
                    error: REQUEST_ERRORS.BAD_REQUEST,
                }
                return response;
            }

            const {
                imageData,
            } = data;

            const response = {
                status: true,
                imageData,
                error: undefined,
            };
            return response;
        } catch (error) {
            const response = {
                status: false,
                imageData: {},
                error: REQUEST_ERRORS.BAD_REQUEST,
            }
            return response;
        }
    }

    const extractTextWithUserToken = async () => {
        try {
            const input = {
                imageURL: src,
                userToken,
            };
            const mutation = await graphqlClient.current.mutate({
                mutation: EXTRACT_TEXT_WITH_USER_TOKEN,
                variables: {
                    input,
                },
            });

            const data = mutation.data.enhancedImageExtractTextWithUserToken;

            if (!data.status) {
                const response = {
                    status: false,
                    imageData: {},
                    error: REQUEST_ERRORS.BAD_REQUEST,
                }
                return response;
            }

            const {
                imageData,
            } = data;

            const response = {
                status: true,
                imageData,
                error: undefined,
            };
            return response;
        } catch (error) {
            const response = {
                status: false,
                imageData: {},
                error: REQUEST_ERRORS.BAD_REQUEST,
            }
            return response;
        }
    }

    const extractTextWithImageID = async () => {
        try {
            const input = {
                imageURL: src,
                imageID,
            };
            const mutation = await graphqlClient.current.mutate({
                mutation: EXTRACT_TEXT_WITH_IMAGE_ID,
                variables: {
                    input,
                },
            });

            const data = mutation.data.enhancedImageExtractTextWithImageID;

            if (!data.status) {
                const response = {
                    status: false,
                    imageData: {},
                    error: REQUEST_ERRORS.BAD_REQUEST,
                }
                return response;
            }

            const {
                imageData,
            } = data;

            const response = {
                status: true,
                imageData,
                error: undefined,
            };
            return response;
        } catch (error) {
            const response = {
                status: false,
                imageData: {},
                error: REQUEST_ERRORS.BAD_REQUEST,
            }
            return response;
        }
    }

    const handleExtractText = async () => {
        if (apiKey) {
            const response = await extractTextWithApiKey();
            return response;
        }

        if (userToken) {
            const response = await extractTextWithUserToken();
            return response;
        }

        if (imageID) {
            const response = await extractTextWithImageID();
            return response;
        }

        const response = {
            status: false,
            imageData: {},
            error: REQUEST_ERRORS.BAD_REQUEST,
        }
        return response;
    }

    const extractText = async () => {
        setShowSpinner(true);
        setMessage('Extracting Text');

        const {
            status,
            imageData,
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
            setDatabaseImageID(imageData.imageID);
            setImageText(imageData.imageText);
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
