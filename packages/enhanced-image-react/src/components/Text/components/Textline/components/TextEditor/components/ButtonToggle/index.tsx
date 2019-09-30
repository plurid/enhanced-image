import React, { Component } from 'react';

import { StyledTextVideoEditorButtonToggle } from './styled';



interface TextVideoEditorButtonToggleProps {
    icon: JSX.Element;
    theme: any;
    toggled: boolean;
    toggle: () => void;
}


class ButtonToggle extends Component<
    TextVideoEditorButtonToggleProps, any
> {
    public render() {
        const {
            icon,
            theme,
            toggle,
            toggled,
        } = this.props;

        return (
            <StyledTextVideoEditorButtonToggle
                theme={theme}
                toggled={toggled}
                onClick={toggle}
            >
                {icon}
            </StyledTextVideoEditorButtonToggle>
        );
    }
}


export default ButtonToggle;
