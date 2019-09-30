import React from 'react';

import {
    StyledEnhancedImage,
} from './styled';

import {
    EnhancedImageProperties,
} from '../../data/interfaces';



const EnhancedImage: React.FC<EnhancedImageProperties> = () => {
    return (
        <StyledEnhancedImage>
            enhanced image
        </StyledEnhancedImage>
    );
}


export default EnhancedImage;
