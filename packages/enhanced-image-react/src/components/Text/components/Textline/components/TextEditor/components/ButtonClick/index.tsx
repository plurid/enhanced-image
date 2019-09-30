import React, { Component } from 'react';

import { StyledTextVideoEditorButtonClick } from './styled';



interface TextVideoEditorButtonClickProps {
    icon: JSX.Element;
    theme: any;
    atClick: () => void;
}


class TextVideoEditorButtonClick extends Component<
    TextVideoEditorButtonClickProps, any
> {
    public render() {
        const {
            icon,
            theme,
            atClick,
        } = this.props;

        return (
            <StyledTextVideoEditorButtonClick
                theme={theme}
                onClick={atClick}
            >
                {icon}
            </StyledTextVideoEditorButtonClick>
        );
    }
}


export default TextVideoEditorButtonClick;
