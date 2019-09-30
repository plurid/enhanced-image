import React, { Component } from 'react';

import {
    StyledTextVideoEditorButtonsColors,
    StyledTextVideoEditorButtonColors,
} from './styled';



const COLOR = 'color';
const colors = [
    'black', 'red', 'white',
];


class TextVideoEditorButtonsColors extends Component<any, any> {
    public render() {
        const {
            theme,
            colorValue,
            changeValue,
        } = this.props;

        return (
            <StyledTextVideoEditorButtonsColors
                theme={theme}
            >
                {colors.map(color => {
                    return (
                        <StyledTextVideoEditorButtonColors
                            key={color}
                            theme={theme}
                            color={color}
                            colorValue={colorValue}
                            onClick={changeValue.bind(this, COLOR, color)}
                        />
                    );
                })}
            </StyledTextVideoEditorButtonsColors>
        );
    }
}


export default TextVideoEditorButtonsColors;
