import React, {
    useContext,
} from 'react';

import {
    StyledImage,
} from './styled';

import Context from '../../services/utilities/context';



const Image: React.FC<{}> = () => {
    const context = useContext(Context);
    if (!context) {
        return (<></>);
    }

    const {
        src,
        alt,
        imageStyle,
        handleLoadedImage,

        imageColorsInvert,
        imageColorsContrast,
        imageColorsHue,
        imageColorsSaturation,
        imageColorsBrightness,
    } = context;

    return (
        <StyledImage>
            <img
                src={src}
                alt={alt}
                style={{
                    ...imageStyle,
                    filter: `
                        invert(${imageColorsInvert ? 1 : 0})
                        contrast(${imageColorsContrast}%)
                        hue-rotate(${imageColorsHue}deg)
                        saturate(${imageColorsSaturation}%)
                        brightness(${imageColorsBrightness}%)
                    `,
                }}
                onLoad={handleLoadedImage}
            />
        </StyledImage>
    );
}


export default Image;
