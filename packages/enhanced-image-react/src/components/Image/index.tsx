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
    } = context;

    return (
        <StyledImage>
            <img
                src={src}
                alt={alt}
                style={{...imageStyle}}
                onLoad={handleLoadedImage}
            />
        </StyledImage>
    );
}


export default Image;
