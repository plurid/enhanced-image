/** [START] imports */
/** libraries */
import React, {
    useContext,
} from 'react';


/** external */
import {
    ImageText,
} from '../../../../data/interfaces';

import {
    Context,
} from '../../../../services/utilities';


/** internal */
import {
    StyledTextarea,
} from './styled';
/** [START] imports */



/** [START] component */
export interface TextareaProperties {
    data: ImageText;
}

const Textarea: React.FC<TextareaProperties> = () => {
    /** context */
    const context = useContext(Context);
    if (!context) {
        return (<></>);
    }

    /**
     * FUTURE: render the text in a multi-line div, with per-character styling
     */

    /** render */
    return (
        <StyledTextarea>
        </StyledTextarea>
    );
}


export default Textarea;
/** [END] component */
