import React from 'react';

import {
    StyledMessage,
} from './styled';



interface MessageProperties {
    text: string;
}

const Message: React.FC<MessageProperties> = (properties) => {
    const {
        text,
    } = properties;

    return (
        <StyledMessage>
            {text}
        </StyledMessage>
    );
}


export default Message;
