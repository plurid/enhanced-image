import React, { Component } from 'react';

import {
    StyledTextImageEditorButtonsColors,
    StyledTextImageEditorButtonColors,
} from './styled';



const COLOR = 'color';
const colors = [
    'black', 'red', 'white',
];


class TextImageEditorButtonsColors extends Component<any, any> {
    public render() {
        const {
            theme,
            colorValue,
            changeValue,
        } = this.props;

        return (
            <StyledTextImageEditorButtonsColors
                theme={theme}
            >
                {colors.map(color => {
                    return (
                        <StyledTextImageEditorButtonColors
                            key={color}
                            theme={theme}
                            color={color}
                            colorValue={colorValue}
                            onClick={changeValue.bind(this, COLOR, color)}
                        />
                    );
                })}
            </StyledTextImageEditorButtonsColors>
        );
    }
}


export default TextImageEditorButtonsColors;
