/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';


/** internal */
import {
    StyledButtonItem,
    StyledButtonItemIcon,
} from './styled';
/** [END] imports */



/** [START] component */
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
/** [END] component */
