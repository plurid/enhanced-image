import React, { Component } from 'react';

import {
    StyledTextSelectImageButtonCheckmark,
    StyledTextSelectImageButtonCheckmarkCheckbox,
} from './styled';



interface ITextSelectImageButtonCheckmarkProps {
    checked: boolean | undefined;
    text: string;
    toggle: () => void | undefined;
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
