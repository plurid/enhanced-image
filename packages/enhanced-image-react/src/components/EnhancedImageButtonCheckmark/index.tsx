import React, { Component } from 'react';

import {
    StyledEnhancedImageButtonCheckmark,
    StyledEnhancedImageButtonCheckmarkCheckbox,
} from './styled';

import {
    EnhancedImageButtonCheckmarkProperties,
    EnhancedImageButtonCheckmarkState,
} from './interfaces';



class EnhancedImageButtonCheckmark extends Component<
    EnhancedImageButtonCheckmarkProperties, EnhancedImageButtonCheckmarkState
> {
    public render() {
        const {
            text,
            toggle,
            checked,
            theme,
        } = this.props;

        return (
            <StyledEnhancedImageButtonCheckmark
                onClick={toggle}
            >
                <div>
                    {text}
                </div>

                <StyledEnhancedImageButtonCheckmarkCheckbox
                    theme={theme}
                    isChecked={checked}
                />
            </StyledEnhancedImageButtonCheckmark>
        );
    }
}


export default EnhancedImageButtonCheckmark;
