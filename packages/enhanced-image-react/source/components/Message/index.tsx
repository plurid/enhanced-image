import React from 'react';

import {
    StyledMessage,
} from './styled';



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
