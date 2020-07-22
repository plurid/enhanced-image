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

    // const {
    // } = context;


    /** properties */
    const {
        data,
    } = properties;


    /** render */
    return (
        <StyledRadial>
            Radial
        </StyledRadial>
    );
}


export default Radial;
/** [END] component */
