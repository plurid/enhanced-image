/** [START] imports */
/** libraries */
import React, {
    useContext,
} from 'react';


/** external */
import {
    ImageEntityPainted,
} from '../../../../data/interfaces';

import {
    Context,
} from '../../../../services/utilities';


/** internal */
import {
    StyledPainted,
} from './styled';
/** [END] imports */



/** [START] component */
export interface PaintedProperties {
    data: ImageEntityPainted;
}

const Painted: React.FC<PaintedProperties> = (
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
        position,
    } = data.data;

    const absoluteX = position.x * imageBoxDimensions.width / 100 + 'px';
    const absoluteY = position.y * imageBoxDimensions.height / 100 + 'px';


    /** render */
    return (
        <StyledPainted
            style={{
                top: absoluteY,
                left: absoluteX,
            }}
        >
            <canvas

            />
        </StyledPainted>
    );
}


export default Painted;
/** [END] component */
