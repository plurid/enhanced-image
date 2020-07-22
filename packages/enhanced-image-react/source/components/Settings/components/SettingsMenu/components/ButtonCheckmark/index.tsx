/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';


/** internal */
import {
    StyledButtonCheckmark,
    StyledButtonCheckmarkCheckbox,
} from './styled';
/** [END] imports */



/** [START] component */
export interface ButtonCheckmarkProperties {
    theme: Theme;
    text: string;
    checked: boolean;
    toggle: () => void;
}

const ButtonCheckmark: React.FC<ButtonCheckmarkProperties> = (
    properties,
) => {
    /** properties */
    const {
        theme,
        text,
        checked,
        toggle,
    } = properties;


    /** render */
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
/** [END] component */
