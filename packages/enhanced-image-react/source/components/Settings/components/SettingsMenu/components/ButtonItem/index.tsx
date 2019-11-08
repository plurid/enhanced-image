import React from 'react';

import {
    StyledButtonItem,
    StyledButtonItemIcon,
} from './styled';

import { Theme } from '@plurid/utilities.themes';



interface ButtonItemProperties {
    theme: Theme;
    icon: JSX.Element;
    text: string;
    atClick: (event: any) => void;
}

const ButtonItem: React.FC<ButtonItemProperties> = (properties) => {
    const {
        theme,
        icon,
        text,
        atClick,
    } = properties;

    return (
        <StyledButtonItem
            onClick={atClick}
        >
            <StyledButtonItemIcon
                theme={theme}
            >
                {icon}
            </StyledButtonItemIcon>

            <div>
                {text}
            </div>
        </StyledButtonItem>
    );
}


export default ButtonItem;
