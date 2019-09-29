import React, { Component } from 'react';

import {
    StyledTextSelectImageButtonCheckmark,
    StyledTextSelectImageButtonCheckmarkCheckbox,
} from './styled';



interface ITextSelectImageButtonCheckmarkProps {
    checked: boolean;
    text: string;
    toggle: () => void;
    theme: any;
}


class TextSelectImageButtonCheckmark extends Component<
    ITextSelectImageButtonCheckmarkProps, any
> {
    public render() {
        const {
            text,
            toggle,
            checked,
            theme,
        } = this.props;

        return (
            <StyledTextSelectImageButtonCheckmark
                onClick={toggle}
            >
                <div>
                    {text}
                </div>

                <StyledTextSelectImageButtonCheckmarkCheckbox
                    theme={theme}
                    isChecked={checked}
                />
            </StyledTextSelectImageButtonCheckmark>
        );
    }
}


export default TextSelectImageButtonCheckmark;
