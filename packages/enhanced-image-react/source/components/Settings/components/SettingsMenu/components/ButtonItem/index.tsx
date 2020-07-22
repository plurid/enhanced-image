import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    StyledButtonItem,
    StyledButtonItemIcon,
} from './styled';



export interface ButtonItemProperties {
    theme: Theme;
    icon: JSX.Element;
    text: string;
    atClick: (
        event: any,
    ) => void;
}

const ButtonItem: React.FC<ButtonItemProperties> = (
    properties,
) => {
    /** properties */
    const {
        theme,
        icon,
        text,
        atClick,
    } = properties;


    /** render */
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
