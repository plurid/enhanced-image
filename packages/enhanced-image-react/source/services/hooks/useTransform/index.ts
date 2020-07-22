import {
    useState,
    useEffect,
} from 'react';

import {
    computeScaleValue,
} from '../../utilities';



const useTransform = (
    flipVertical: boolean,
    flipHorizontal: boolean,
    imageTopologyRotate: number,
    imageTopologyScale: number,
) => {
    const [transform, setTransform] = useState('');

    useEffect(() => {
        const scaleValue = computeScaleValue(imageTopologyScale);
        const flipX = flipVertical ? -1 : 1;
        const flipY = flipHorizontal ? -1 : 1;

        const transform = `
            rotate(${imageTopologyRotate}deg)
            scale(${scaleValue * flipX}, ${scaleValue * flipY})
        `;
        setTransform(transform);
    }, [
        imageTopologyScale,
        imageTopologyRotate,
        flipVertical,
        flipHorizontal,
    ]);

    return transform;
}


export default useTransform;
