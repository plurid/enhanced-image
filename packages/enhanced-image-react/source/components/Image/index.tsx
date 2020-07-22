import React, {
    useContext,
    useRef,
    useState,
    useEffect,
} from 'react';

import {
    StyledImage,
} from './styled';

import {
    IMAGE_BACKGROUNDS,
} from '../../data/constants';

import {
    useTransform,
} from '../../services/hooks';

import Context from '../../services/utilities/context';



const Image: React.FC<{}> = () => {
    /** context */
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

        imageTopologyOverflow,
        flipVertical,
        flipHorizontal,
        imageTopologyRotate,
        imageTopologyScale,

        imageCoordinateX,
        imageCoordinateY,
    } = context;


    /** references */
    const image = useRef<HTMLImageElement>(null);


    /** state */
    const transform = useTransform(
        flipVertical,
        flipHorizontal,
        imageTopologyRotate,
        imageTopologyScale,
        imageCoordinateX,
        imageCoordinateY,
    );
    const [
        filter,
        setFilter,
    ] = useState('');
    const [
        resolvedImageBackground,
        setResolvedImageBackground,
    ] = useState(IMAGE_BACKGROUNDS.TRANSPARENT);


    /** effects */
    /** Handle colors. */
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

    /** Handle background. */
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

    /** Handle already loaded image. */
    useEffect(() => {
        if (image.current?.complete) {
            handleLoadedImage(image.current);
        }
    }, []);


    /** render */
    return (
        <StyledImage
            topologyOverflow={imageTopologyOverflow}
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
                ref={image}
                onLoad={(
                    event: React.SyntheticEvent<HTMLImageElement, Event>,
                ) => {
                    const image = event.currentTarget;
                    handleLoadedImage(image);
                }}
            />
        </StyledImage>
    );
}


export default Image;
