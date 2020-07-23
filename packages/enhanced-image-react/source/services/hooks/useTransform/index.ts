/** [START] imports */
/** libraries */
import {
    useState,
    useEffect,
} from 'react';


/** external */
import {
    computeScaleValue,
} from '../../utilities';

/** internal */
/** [END] imports */



/** [START] hook */
const useTransform = (
    flipVertical: boolean,
    flipHorizontal: boolean,
    imageTopologyRotate: number,
    imageTopologyScale: number,
    imageCoordinateX: number,
    imageCoordinateY: number,
) => {
    /** state */
    const [
        transform,
        setTransform,
    ] = useState('');


    /** effects */
    useEffect(() => {
        const scaleValue = computeScaleValue(imageTopologyScale);
        const flipX = flipVertical ? -1 : 1;
        const flipY = flipHorizontal ? -1 : 1;

        const transform = `
            translateX(${imageCoordinateX}px) translateY(${imageCoordinateY}px)
            rotate(${imageTopologyRotate}deg)
            scale(${scaleValue * flipX}, ${scaleValue * flipY})
        `;
        setTransform(transform);
    }, [
        imageCoordinateX,
        imageCoordinateY,
        imageTopologyScale,
        imageTopologyRotate,
        flipVertical,
        flipHorizontal,
    ]);

    return transform;
}


export default useTransform;
/** [END] hook */
