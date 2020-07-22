/** [START] imports */
/** libraries */
import React, {
    useContext,
} from 'react';


/** external */
import {
    ImageEntityRectangular,
} from '../../../../data/interfaces';

import {
    Context,
} from '../../../../services/utilities';


/** internal */
import {
    StyledRectangular,
} from './styled';
/** [END] imports */



/** [START] component */
export interface RectangularProperties {
    data: ImageEntityRectangular;
}

const Rectangular: React.FC<RectangularProperties> = (
    properties,
) => {
    /** context */
    const context = useContext(Context);
    if (!context) {
        return (<></>);
    }

    const {
        imageBoxDimensions,
    } = context;


    /** properties */
    const {
        data,
    } = properties;

    const {
        color,
        height,
        width,
        position,
    } = data.data;

    const absoluteWidth = width * imageBoxDimensions.width / 100 + 'px';
    const absoluteHeight = height * imageBoxDimensions.height / 100 + 'px';

    const absoluteX = position.x * imageBoxDimensions.width / 100 + 'px';
    const absoluteY = position.y * imageBoxDimensions.height / 100 + 'px';


    /** render */
    return (
        <StyledRectangular
            style={{
                top: absoluteY,
                left: absoluteX,
                width: absoluteWidth,
                height: absoluteHeight,
                backgroundColor: color,
            }}
        />
    );
}


export default Rectangular;
/** [END] component */
