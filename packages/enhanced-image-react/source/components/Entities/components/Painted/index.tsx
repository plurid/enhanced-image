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

    // const {
    // } = context;


    /** properties */
    const {
        data,
    } = properties;


    /** render */
    return (
        <StyledPainted>
            Painted
        </StyledPainted>
    );
}


export default Painted;
/** [END] component */
