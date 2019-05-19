import React, { Component } from 'react';

import {
    StyledTextSelectImageButtonCheckmark,
} from './styled';



interface ITextSelectImageButtonCheckmarkProps {
    checked: boolean;
    text: string;
    toggle: (event: any) => void;
    theme: any;
}


class TextSelectImageButtonCheckmark extends Component<
    ITextSelectImageButtonCheckmarkProps, any
> {
    public render() {
        const {
            checked,
            text,
            toggle,
            theme,
        } = this.props;

        return (
            <StyledTextSelectImageButtonCheckmark
                onClick={toggle}
                theme={theme}
            >
                <span>
                    {text}
                </span>

                <span
                    className={
                        checked
                            ? 'enhanced-image-button-checkbox enhanced-image-button-checkbox-fill'
                            : 'enhanced-image-button-checkbox'
                    }
                />
            </StyledTextSelectImageButtonCheckmark>
        );
    }
}


export default TextSelectImageButtonCheckmark;
