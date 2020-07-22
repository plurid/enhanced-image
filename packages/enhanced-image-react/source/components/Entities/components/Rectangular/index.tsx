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

    // const {
    // } = context;


    /** properties */
    const {
        data,
    } = properties;


    /** render */
    return (
        <StyledRectangular>
            Rectangular
        </StyledRectangular>
    );
}


export default Rectangular;
/** [END] component */
