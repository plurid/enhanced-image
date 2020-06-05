import React from 'react';

import {
    StyledButtonCheckmark,
    StyledButtonCheckmarkCheckbox,
} from './styled';

import {
    Theme,
} from '@plurid/plurid-themes';



interface ButtonCheckmarkProperties {
    theme: Theme;
    text: string;
    checked: boolean;
    toggle: () => void;
}

const ButtonCheckmark: React.FC<ButtonCheckmarkProperties> = (
    properties,
) => {
    const {
        theme,
        text,
        checked,
        toggle,
    } = properties;

    return (
        <StyledButtonCheckmark
            onClick={toggle}
        >
            <div>
                {text}
            </div>

            <StyledButtonCheckmarkCheckbox
                theme={theme}
                isChecked={checked}
            />
        </StyledButtonCheckmark>
    )
}


export default ButtonCheckmark;
