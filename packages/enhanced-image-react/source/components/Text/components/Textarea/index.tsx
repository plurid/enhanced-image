import React, {
    useContext,
} from 'react';

import {
    StyledTextarea,
} from './styled';

import {
    ImageText,
} from '../../../../data/interfaces';

import Context from '../../../../services/utilities/context';



interface TextareaProperties {
    data: ImageText;
}

const Textarea: React.FC<TextareaProperties> = () => {
    const context = useContext(Context);
    if (!context) {
        return (<></>);
    }

    /**
     * FUTURE: render the text in a multi-line div, with per-character styling
     */

    return (
        <StyledTextarea>
        </StyledTextarea>
    );
}


export default Textarea;
