/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';


/** internal */
import {
    StyledButtonsColors,
    StyledButtonColors,
} from './styled';
/** [END] imports */



/** [START] component data */
const colors = [
    'black', 'red', 'white',
];
/** [END] component data */


/** [START] component */
export interface ButtonsColorsProperties {
    theme: Theme,
    selectedColor: string,
    changeValue: (
        type: string,
        value: string,
    ) => void;
}

const ButtonsColors: React.FC<ButtonsColorsProperties> = (
    properties,
) => {
    /** properties */
    const {
        theme,
        selectedColor,
        changeValue,
    } = properties;


    /** render */
    return (
        <StyledButtonsColors
            theme={theme}
        >
            {colors.map(color => {
                return (
                    <StyledButtonColors
                        key={color}
                        theme={theme}
                        color={color}
                        selected={color === selectedColor}
                        onClick={() => changeValue('color', color)}
                    />
                );
            })}
        </StyledButtonsColors>
    );
}


export default ButtonsColors;
/** [END] component */
