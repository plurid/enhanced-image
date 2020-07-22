/** [START] imports */
/** libraries */
import React from 'react';


/** internal */
import {
    StyledSpinner,
    StyledLoader
} from './styled';
/** [END] imports */



/** [START] component */
const Spinner: React.FC<any> = () => {
    /** render */
    return (
        <StyledSpinner>
            <StyledLoader />
        </StyledSpinner>
    );
}


export default Spinner;
/** [END] component */
