import React from 'react';

import {
    StyledEnhancedImage,
} from './styled';



interface EnhancedImageProperties {
}

const EnhancedImage: React.FC<EnhancedImageProperties> = () => {
    return (
        <StyledEnhancedImage>
            enhanced image
        </StyledEnhancedImage>
    );
}


export default EnhancedImage;
