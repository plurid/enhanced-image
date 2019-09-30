import React from 'react';

import './styles.css';
import {
    StyledEnhancedImage,
    StyledImageContainer,
} from './styled';

import Context from '../../services/utilities/context';

import {
    EnhancedImageProperties,
    Context as IContext,
} from '../../data/interfaces';

import {
    PLURID_API_ENDPOINT,
} from '../../data/constants';

import Image from '../../components/Image';

import themes, { Theme } from '@plurid/utilities.themes';



const EnhancedImage: React.FC<EnhancedImageProperties> = (properties) => {
    const {
        src,
        srcset,
        alt,

        theme,
        height,
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
    const _height = height || 500;
    const _about = about === undefined ? true : about;
    const _imageStyle = imageStyle ? imageStyle : {};

    const _apiEndpoint = apiEndpoint ? apiEndpoint : PLURID_API_ENDPOINT;

    const handleLoadedImage = () => {
    }

    const context: IContext = {
        src,
        srcset,
        alt: _alt,

        theme: _theme,
        height: _height,
        about: _about,
        imageStyle: _imageStyle,

        apiEndpoint: _apiEndpoint,
        apiKey,
        userToken,
        depictImageID,

        handleLoadedImage,
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
