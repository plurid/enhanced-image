import React, {
    useContext,
    useState,
    useEffect,
} from 'react';

import {
    StyledImage,
} from './styled';

import Context from '../../services/utilities/context';

import {
    IMAGE_BACKGROUNDS,
} from '../../data/constants';



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

        imageBackground,
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
    const [resolvedImageBackground, setResolvedImageBackground] = useState(IMAGE_BACKGROUNDS.TRANSPARENT);

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

    useEffect(() => {
        switch (imageBackground) {
            case 0:
                setResolvedImageBackground(IMAGE_BACKGROUNDS.TRANSPARENT);
                break;
            case 1:
                setResolvedImageBackground(IMAGE_BACKGROUNDS.WHITE);
                break;
            case 2:
                setResolvedImageBackground(IMAGE_BACKGROUNDS.BLACK);
                break;
            default:
                setResolvedImageBackground(IMAGE_BACKGROUNDS.TRANSPARENT);
        }
    }, [
        imageBackground,
    ]);

    return (
        <StyledImage
        >
            <img
                src={src}
                alt={alt}
                style={{
                    ...imageStyle,
                    filter,
                    transform,
                    background: resolvedImageBackground,
                }}
                onLoad={handleLoadedImage}
            />
        </StyledImage>
    );
}


export default Image;
