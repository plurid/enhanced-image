import React, {
    // useState,
    // useEffect,
} from 'react';

import {
    StyledButtonSwitch,
    StyledSwitch,
} from './styled';



interface ButtonSwitchProps {
    checked: boolean;
    toggle: any;
    text?: string;
    theme: any;
}


const ButtonSwitch: React.FC<ButtonSwitchProps> = (props) => {

    const {
        checked,
        toggle,
        text,
        theme,
    } = props;

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
