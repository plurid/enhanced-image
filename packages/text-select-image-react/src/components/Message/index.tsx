import React, { Component } from 'react';

import {
    StyledMessage,
} from './styled';

import Context from '../../context';



class Message extends Component<any, any> {
    static contextType = Context;

    public render() {
        const {
        } = this.context;

        const {
            text
        } = this.props;

        return (
            <StyledMessage>
                {text}
            </StyledMessage>
        );
    }
}


export default Message;
