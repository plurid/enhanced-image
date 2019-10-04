import React from 'react';

import {
    StyledButtonsColors,
    StyledButtonColors,
} from './styled';

import { Theme } from '@plurid/utilities.themes';



const colors = [
    'black', 'red', 'white',
];

interface ButtonsColorsProperties {
    theme: Theme,
    selectedColor: string,
    changeValue: (type: string, value: string) => void;
}

const ButtonsColors: React.FC<ButtonsColorsProperties> = (properties) => {
    const {
        theme,
        selectedColor,
        changeValue,
    } = properties;

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
