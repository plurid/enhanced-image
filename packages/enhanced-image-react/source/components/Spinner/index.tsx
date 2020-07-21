import React from 'react';

import {
    StyledSpinner,
    StyledLoader
} from './styled';



const Spinner: React.FC<any> = () => {
    /** render */
    return (
        <StyledSpinner>
            <StyledLoader />
        </StyledSpinner>
    );
}


export default Spinner;
