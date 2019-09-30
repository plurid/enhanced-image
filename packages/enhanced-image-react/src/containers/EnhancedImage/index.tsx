import React, {
    useState,
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
} from '../../data/interfaces';

import {
    PLURID_API_ENDPOINT,
} from '../../data/constants';

import {
    initialImageDimensions,
} from '../../data/constants/initializers';

import Image from '../../components/Image';

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

    const _theme: Theme = theme && themes[theme]
        ? themes[theme]
        : themes.plurid;
    const _alt = alt || '';
    const _about = about === undefined ? true : about;
    const _imageStyle = imageStyle ? imageStyle : {};

    const _apiEndpoint = apiEndpoint ? apiEndpoint : PLURID_API_ENDPOINT;

    const [loadedImage, setLoadedImage] = useState(false);
    const [imageDimensions, setImageDimensions] = useState<ImageDimensions>(initialImageDimensions);

    const handleLoadedImage = async (loadedImage: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const image: HTMLImageElement = (loadedImage as any).target;

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

    // const handleLoadedVideo = async (video: any) => {

    //     setLoadedVideo(true);

    //     const videoDuration = video.target.duration;
    //     setVideoDuration(videoDuration);

    //     setLoopVideoEnd(videoDuration);
    //     setMicroviewVideoEnd(videoDuration);
    // }

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
    };

    return (
        <Context.Provider
            value={context}
        >
            <StyledEnhancedImage
                theme={context.theme}
            >
                <Image />
            </StyledEnhancedImage>
        </Context.Provider>
    );
}


export default EnhancedImage;
