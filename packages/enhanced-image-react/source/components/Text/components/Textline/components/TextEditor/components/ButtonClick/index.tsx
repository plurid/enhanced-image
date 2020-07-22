import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    StyledButtonClick,
} from './styled';



export interface ButtonClickProperties {
    icon: JSX.Element;
    theme: Theme;
    atClick: () => void;
}

const ButtonClick: React.FC<ButtonClickProperties> = (
    properties,
) => {
    const {
        icon,
        theme,
        atClick,
    } = properties;

    return (
        <StyledButtonClick
            theme={theme}
            onClick={atClick}
        >
            {icon}
        </StyledButtonClick>
    );
}


export default ButtonClick;
