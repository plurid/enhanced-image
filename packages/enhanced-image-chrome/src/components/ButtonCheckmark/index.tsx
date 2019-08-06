import React, { Component } from 'react';

import {
    StyledButtonCheckmark,
    StyledButtonCheckmarkCheckbox,
} from './styled';



interface IButtonCheckmarkProps {
    checked: boolean;
    text: string;
    toggle: () => void;
    theme: any;
}


class ButtonCheckmark extends Component<
    IButtonCheckmarkProps, any
> {
    public render() {
        const {
            text,
            toggle,
            checked,
            theme,
        } = this.props;

        return (
            <StyledButtonCheckmark
                onClick={toggle}
            >
                <div>
                    {text}
                </div>

                <StyledButtonCheckmarkCheckbox
                    theme={theme}
                    isChecked={checked}
                />
            </StyledButtonCheckmark>
        );
    }
}


export default ButtonCheckmark;
