import React, { Component } from 'react';

import {
    StyledSpinner,
    StyledLoader
} from './styled';

import Context from '../../context';



class Spinner extends Component<any, any> {
    static contextType = Context;

    public render() {
        const {
        } = this.context;

        return (
            <StyledSpinner>
                <StyledLoader />
            </StyledSpinner>
        );
    }
}


export default Spinner;
