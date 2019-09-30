import React, {
    useState,
    useRef,
} from 'react';

import './styles.css';
import {
    StyledEnhancedImage,
    StyledImageContainer,
} from './styled';

import Context from '../../services/utilities/context';

import {
    EnhancedImageProperties,
    Context as IContext,
    ImageDimensions,
    ImageText,
} from '../../data/interfaces';

import {
    PLURID_API_ENDPOINT,
} from '../../data/constants';

import {
    initialImageDimensions,
} from '../../data/constants/initializers';

import Image from '../../components/Image';
import Text from '../../components/Text';
import Settings from '../../components/Settings';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';

import themes, { Theme } from '@plurid/utilities.themes';



const EnhancedImage: React.FC<EnhancedImageProperties> = (properties) => {
    const {
        src,
        srcset,
        alt,

        theme,
        about,

        imageStyle,

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

    const _theme: Theme = theme && themes[theme]
        ? themes[theme]
        : themes.plurid;
    const _alt = alt || '';
    const _about = about === undefined ? true : about;
    const _imageStyle = imageStyle ? imageStyle : {};

    const _apiEndpoint = apiEndpoint ? apiEndpoint : PLURID_API_ENDPOINT;

    const [loadedImage, setLoadedImage] = useState(false);
    const [imageDimensions, setImageDimensions] = useState<ImageDimensions>(initialImageDimensions);

    const [showSpinner, setShowSpinner] = useState(false);
    const [message, setMessage] = useState('');

    const [showSettingsButton, setShowSettingsButton] = useState(false);
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);

    const [editableText, setEditableText] = useState(false);

    const [imageText, setImageText] = useState<ImageText[]>([]);

    const [imageColorsInvert, setImageColorsInvert] = useState(false);
    const [imageColorsContrast, setImageColorsContrast] = useState(100);
    const [imageColorsHue, setImageColorsHue] = useState(0);
    const [imageColorsSaturation, setImageColorsSaturation] = useState(100);
    const [imageColorsBrightness, setImageColorsBrightness] = useState(100);

    const [toggledDefaults, toggleDefaults] = useState(false);

    const imageContainer = useRef<HTMLDivElement>(null);

    const handleLoadedImage = async (
        loadedImage: React.SyntheticEvent<HTMLImageElement, Event>
    ) => {
        const image = loadedImage.currentTarget;

        if (atLoad) {
            await atLoad(image);
        }

        const {
            width,
            height,
        } = image;

        const imageDimensions: ImageDimensions = {
            width,
            height,
        };
        setImageDimensions(imageDimensions);

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

    }

    const saveText = async () => {

    }

    const getText = async () => {

    }

    const extractText = async () => {

    }

    const transviewText = async () => {

    }

    const saveImage = async () => {

    }

    const generateImage = async () => {

    }

    const colorizeImage = async () => {

    }

    const context: IContext = {
        src,
        srcset,
        alt: _alt,

        theme: _theme,
        about: _about,
        imageStyle: _imageStyle,

        apiEndpoint: _apiEndpoint,
        apiKey,
        userToken,
        depictImageID,

        handleLoadedImage,
        loadedImage,

        imageDimensions,

        setMessage,
        setMessageTimed,
        setShowSpinner,

        showSettingsButton,
        setShowSettingsButton,

        showSettingsMenu,
        setShowSettingsMenu,

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

        toggledDefaults,
        toggleDefaults,
    };

    return (
        <Context.Provider
            value={context}
        >
            <StyledEnhancedImage
                theme={context.theme}
                onMouseEnter={() => setShowSettingsButton(true)}
                onMouseLeave={() => setShowSettingsButton(false)}
                onMouseMove={() => !showSettingsButton ? setShowSettingsButton(true) : null}
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
    );
}


export default EnhancedImage;
