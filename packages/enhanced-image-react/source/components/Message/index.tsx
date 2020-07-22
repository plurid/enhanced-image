/** [START] imports */
/** libraries */
import React from 'react';


/** internal */
import {
    StyledMessage,
} from './styled';
/** [END] imports */



/** [START] component */
export interface MessageProperties {
    text: string;
}

const Message: React.FC<MessageProperties> = (
    properties,
) => {
    /** properties */
    const {
        text,
    } = properties;


    /** render */
    return (
        <StyledMessage>
            {text}
        </StyledMessage>
    );
}


export default Message;
/** [END] component */
