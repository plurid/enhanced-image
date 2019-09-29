import React, { Component } from 'react';

import {
    StyledEnhancedImageButtonCheckmark,
    StyledEnhancedImageButtonCheckmarkCheckbox,
} from './styled';



interface IEnhancedImageButtonCheckmarkProps {
    checked: boolean;
    text: string;
    toggle: () => void;
    theme: any;
}


class EnhancedImageButtonCheckmark extends Component<
    IEnhancedImageButtonCheckmarkProps, any
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
