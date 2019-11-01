import React from 'react';

import { StyledButtonToggle } from './styled';

import { Theme } from '@plurid/plurid-themes';



interface ButtonToggleProperties {
    theme: Theme;
    toggled: boolean;
    toggle: () => void;
    icon: JSX.Element;
}

const ButtonToggle: React.FC<ButtonToggleProperties> = (properties) => {
    const {
        theme,
        toggled,
        toggle,
        icon,
    } = properties;

    return (
        <StyledButtonToggle
            theme={theme}
            toggled={toggled}
            onClick={toggle}
        >
            {icon}
        </StyledButtonToggle>
    );
}


export default ButtonToggle;
