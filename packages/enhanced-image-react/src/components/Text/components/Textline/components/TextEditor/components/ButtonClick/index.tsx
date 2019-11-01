import React from 'react';

import { StyledButtonClick } from './styled';

import { Theme } from '@plurid/plurid-themes';



interface ButtonClickProperties {
    icon: JSX.Element;
    theme: Theme;
    atClick: () => void;
}

const ButtonClick: React.FC<ButtonClickProperties> = (properties) => {
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
