import React, { Component } from 'react';

import {
    StyledTextImageEditorButtonsColors,
    StyledTextImageEditorButtonColors,
} from './styled';



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
                <StyledTextImageEditorButtonColors
                    theme={theme}
                    color="black"
                    colorValue={colorValue}
                    onClick={changeValue.bind(this, 'color', 'black')}
                />
                <StyledTextImageEditorButtonColors
                    theme={theme}
                    color="red"
                    colorValue={colorValue}
                    onClick={changeValue.bind(this, 'color', 'red')}
                />
                <StyledTextImageEditorButtonColors
                    theme={theme}
                    color="white"
                    colorValue={colorValue}
                    onClick={changeValue.bind(this, 'color', 'white')}
                />
            </StyledTextImageEditorButtonsColors>
        );
    }
}


export default TextImageEditorButtonsColors;
