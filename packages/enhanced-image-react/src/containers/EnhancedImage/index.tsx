import React from 'react';

import {
    StyledEnhancedImage,
    StyledImageContainer,
} from './styled';

import {
    EnhancedImageProperties,
} from '../../data/interfaces';

import themes from '@plurid/utilities.themes';



const EnhancedImage: React.FC<EnhancedImageProperties> = (properties) => {
    const {
        src,
        alt,

        imageStyle,
    } = properties;

    const theme = themes.plurid;

    return (
        <StyledEnhancedImage
            theme={theme}
        >
            <StyledImageContainer>
                <img
                    src={src}
                    alt={alt || 'Image'}
                    // onLoad={this.handleLoadedImage}
                    style={{...imageStyle}}
                    // data-depict={true}
                />
            </StyledImageContainer>
        </StyledEnhancedImage>
    );
}


export default EnhancedImage;
