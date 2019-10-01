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

import client from '../../services/graphql/client';

import {
    EXTRACT_TEXT_WITH_API_KEY,
    EXTRACT_TEXT_WITH_USER_TOKEN,
    EXTRACT_TEXT_WITH_DEPICT_IMAGE_ID,
} from '../../services/graphql/mutate';

import themes, { Theme } from '@plurid/utilities.themes';

// test data import
import TEST_DATA from '../../__specs-data__/data';


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
        depictImageID,
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

    const [imageSHA, setImageSHA] = useState('');

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
                    alwaysShow: false,

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


    const getTextWithApiKey = async () => {
        // console.log(TEST_DATA);
        // const query = await graphqlClient.current.query({
        //     query: QUERY,
        // });

        const response = {
            status: false,
            imageText: [],
            error: REQUEST_ERRORS.BAD_REQUEST,
        }
        return response;
    }

    const getTextWithUserToken = async () => {

        const response = {
            status: false,
            imageText: [],
            error: REQUEST_ERRORS.BAD_REQUEST,
        }
        return response;
    }

    const getTextWithDepictImageID = async () => {

        const response = {
            status: false,
            imageText: [],
            error: REQUEST_ERRORS.BAD_REQUEST,
        }
        return response;
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

        if (depictImageID) {
            const response = await getTextWithDepictImageID();
            return response;
        }

        // const response = {
        //     status: true,
        //     imageText: TEST_DATA,
        //     error: '',
        // }
        // return response;
        const response = {
            status: false,
            imageText: [],
            error: REQUEST_ERRORS.BAD_REQUEST,
        }
        return response;
    }

    const getText = async () => {
        setShowSpinner(true);
        setMessage('Fetching Text');

        const { status, imageText, error } = await handleGetText();

        if (status) {
            setShowSpinner(false);
            setMessageTimed('Text Rendered', 2000);
            setImageText(imageText);
        }

        if (error) {
            setShowSpinner(false);
            setMessageTimed('Something Went Wrong. Please Try Again', 3000);
        }
    }


    const extractTextWithApiKey = async () => {
        const input = {
            apiKey,
            imageSrc: src,
        };
        const query = await graphqlClient.current.query({
            query: EXTRACT_TEXT_WITH_API_KEY,
            variables: {
                input,
            },
        });

        const data = query.data.extractTextWithApiKey;

        if (data.status) {
            const response = {
                status: true,
                imageText: data.imageText,
            };
            return response;
        }

        const response = {
            status: false,
            imageText: [],
            error: REQUEST_ERRORS.BAD_REQUEST,
        }
        return response;
    }

    const extractTextWithUserToken = async () => {
        const input = {
            userToken,
            imageSrc: src,
        };
        const query = await graphqlClient.current.query({
            query: EXTRACT_TEXT_WITH_USER_TOKEN,
            variables: {
                input,
            },
        });

        const data = query.data.extractTextWithUserToken;

        if (data.status) {
            const response = {
                status: true,
                imageText: data.imageText,
            };
            return response;
        }

        const response = {
            status: false,
            imageText: [],
            error: REQUEST_ERRORS.BAD_REQUEST,
        }
        return response;
    }

    const extractTextWithDepictImageID = async () => {
        const input = {
            depictImageID,
            imageSrc: src,
        };
        const query = await graphqlClient.current.query({
            query: EXTRACT_TEXT_WITH_DEPICT_IMAGE_ID,
            variables: {
                input,
            },
        });

        const data = query.data.extractTextWithDepictImageID;

        if (data.status) {
            const response = {
                status: true,
                imageText: data.imageText,
            };
            return response;
        }

        const response = {
            status: false,
            imageText: [],
            error: REQUEST_ERRORS.BAD_REQUEST,
        }
        return response;
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

        if (depictImageID) {
            const response = await extractTextWithDepictImageID();
            return response;
        }

        const response = {
            status: false,
            imageText: [],
            error: REQUEST_ERRORS.BAD_REQUEST,
        }
        return response;
    }

    const extractText = async () => {
        setShowSpinner(true);
        setMessage('Extracting Text');

        const { status, imageText, error } = await handleExtractText();

        if (status) {
            setShowSpinner(false);
            setMessageTimed('Text Extracted and Rendered', 2000);
            setImageText(imageText);
        }

        if (error) {
            setShowSpinner(false);
            setMessageTimed('Something Went Wrong. Please Try Again', 3000);
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
    }

    const viewFullscreen = () => {

    }

    const shareImage = () => {
        const enhanced = '/';
        const imageLink = imageSHA + enhanced;
        const url = DEPICT_DOMAIN + imageLink;
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
        depictImageID,

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
