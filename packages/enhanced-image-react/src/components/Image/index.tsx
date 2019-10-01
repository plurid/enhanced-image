import React, {
    useContext,
    useState,
    useEffect,
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

        flipVertical,
        flipHorizontal,
    } = context;

    const [filter, setFilter] = useState('');
    const [transform, setTransform] = useState('');

    useEffect(() => {
        const filter = `
            invert(${imageColorsInvert ? 1 : 0})
            contrast(${imageColorsContrast}%)
            hue-rotate(${imageColorsHue}deg)
            saturate(${imageColorsSaturation}%)
            brightness(${imageColorsBrightness}%)
        `;
        setFilter(filter);
    }, [
        imageColorsInvert,
        imageColorsContrast,
        imageColorsHue,
        imageColorsSaturation,
        imageColorsBrightness,
    ]);

    useEffect(() => {
        const transform = `${flipVertical ? 'scaleX(-1)': ''} ${flipHorizontal ? 'scaleY(-1' : ''}`;
        setTransform(transform);
    }, [
        flipVertical,
        flipHorizontal,
    ]);

    return (
        <StyledImage>
            <img
                src={src}
                alt={alt}
                style={{
                    ...imageStyle,
                    filter,
                    transform,
                }}
                onLoad={handleLoadedImage}
            />
        </StyledImage>
    );
}


export default Image;
