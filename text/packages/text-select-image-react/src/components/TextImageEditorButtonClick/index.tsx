import React, { Component } from 'react';

import { StyledTextImageEditorButtonClick } from './styled';



interface TextImageEditorButtonClickProps {
    icon: JSX.Element;
    theme: any;
    atClick: () => void;
}


class TextImageEditorButtonClick extends Component<
    TextImageEditorButtonClickProps, any
> {
    public render() {
        const {
            icon,
            theme,
            atClick,
        } = this.props;

        return (
            <StyledTextImageEditorButtonClick
                theme={theme}
                onClick={atClick}
            >
                {icon}
            </StyledTextImageEditorButtonClick>
        );
    }
}


export default TextImageEditorButtonClick;
