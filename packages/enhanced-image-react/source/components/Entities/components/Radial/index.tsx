/** [START] imports */
/** libraries */
import React, {
    useContext,
} from 'react';


/** external */
import {
    ImageEntityRadial,
} from '../../../../data/interfaces';

import {
    Context,
} from '../../../../services/utilities';


/** internal */
import {
    StyledRadial,
} from './styled';
/** [END] imports */



/** [START] component */
export interface RadialProperties {
    data: ImageEntityRadial;
}

const Radial: React.FC<RadialProperties> = (
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
        radius,
        position,
    } = data.data;

    const absoluteRadius = radius * imageBoxDimensions.width / 100;

    const absoluteWidth = absoluteRadius + 'px';
    const absoluteHeight = absoluteRadius + 'px';

    const absoluteX = position.x * imageBoxDimensions.width / 100 + 'px';
    const absoluteY = position.y * imageBoxDimensions.height / 100 + 'px';


    /** render */
    return (
        <StyledRadial
            style={{
                top: absoluteY,
                left: absoluteX,
                width: absoluteWidth,
                height: absoluteHeight,
                borderRadius: absoluteRadius / 2 + 'px',
                backgroundColor: color,
            }}
        />
    );
}


export default Radial;
/** [END] component */
