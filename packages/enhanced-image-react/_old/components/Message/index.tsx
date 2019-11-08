import React, { Component } from 'react';

import {
    StyledMessage,
} from './styled';

import Context from '../../context';



interface MessageProperties {
    text: string;
    link: string | undefined;
}

class Message extends Component<MessageProperties, {}> {
    static contextType = Context;

    public render() {
        const {
        } = this.context;

        const {
            text,
            link,
        } = this.props;

        const message = link
            ? (
                <>
                    {text}
                    <br />
                    <a
                        href={`https://${link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {link}
                    </a>.
                </>
            ) : (
                <>
                    {text}
                </>
            );

        return (
            <StyledMessage
                link={link}
            >
                {message}
            </StyledMessage>
        );
    }
}


export default Message;
