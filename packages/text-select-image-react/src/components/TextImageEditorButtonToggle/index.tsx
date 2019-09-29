import React, { Component } from 'react';

import { StyledTextImageEditorButtonToggle } from './styled';



interface TextImageEditorButtonToggleProps {
    icon: JSX.Element;
    theme: any;
    toggled: boolean;
    toggle: () => void;
}


class TextImageEditorButtonToggle extends Component<
    TextImageEditorButtonToggleProps, any
> {
    public render() {
        const {
            icon,
            theme,
            toggle,
            toggled,
        } = this.props;

        return (
            <StyledTextImageEditorButtonToggle
                theme={theme}
                toggled={toggled}
                onClick={toggle}
            >
                {icon}
            </StyledTextImageEditorButtonToggle>
        );
    }
}


export default TextImageEditorButtonToggle;
