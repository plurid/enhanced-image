import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    StyledButtonSwitch,
    StyledSwitch,
} from './styled';



export interface ButtonSwitchProperties {
    checked: boolean;
    toggle: any;
    text?: string;
    theme: Theme;
}

const ButtonSwitch: React.FC<ButtonSwitchProperties> = (
    properties,
) => {
    /** properties */
    const {
        checked,
        toggle,
        text,
        theme,
    } = properties;


    /** render */
    return (
        <StyledButtonSwitch>
            {text && (
                <div style={{marginRight: '10px'}}>
                    {text}
                </div>
            )}

            <div>
                <StyledSwitch
                    theme={theme}
                >
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={toggle}
                    />
                    <span className="slider round" />
                </StyledSwitch>
            </div>
        </StyledButtonSwitch>
    );
}


export default ButtonSwitch;
