import React, { Component } from 'react';

import {
    StyledTextImageEditorButtonIncrement,
    StyledTextImageEditorButtonIncrementIcon,
    StyledTextImageEditorButtonIncrements,
    StyledTextImageEditorButtonIncrementButton,
    StyledTextImageEditorButtonIncrementsUnit,
} from './styled';



const STEP = 1;
const UP_ARROW = (<span>&#x25b2;</span>);
const DOWN_ARROW = (<span>&#x25bc;</span>);


class TextImageEditorButtonIncrements extends Component<any, any> {
    public render() {
        const {
            icon,
            unit,
            value,
            changeValue,
            type,
            step,
            theme,
        } = this.props;

        const stepValue = step || STEP;

        return (
            <StyledTextImageEditorButtonIncrement
                theme={theme}
            >
                <StyledTextImageEditorButtonIncrementIcon
                    theme={theme}
                >
                    {icon}
                </StyledTextImageEditorButtonIncrementIcon>

                <StyledTextImageEditorButtonIncrements
                    theme={theme}
                >
                    <StyledTextImageEditorButtonIncrementButton
                        theme={theme}
                        onClick={changeValue.bind(this, type, this.round(value + stepValue))}
                    >
                        {UP_ARROW}
                    </StyledTextImageEditorButtonIncrementButton>

                    <StyledTextImageEditorButtonIncrementButton
                        theme={theme}
                        onClick={changeValue.bind(this, type, this.round(value - stepValue))}
                    >
                        {DOWN_ARROW}
                    </StyledTextImageEditorButtonIncrementButton>
                </StyledTextImageEditorButtonIncrements>

                <input
                    type="number"
                    value={value}
                    step={stepValue}
                    onChange={this.inputChange}
                />

                <StyledTextImageEditorButtonIncrementsUnit>
                    {unit || 'px'}
                </StyledTextImageEditorButtonIncrementsUnit>
            </StyledTextImageEditorButtonIncrement>
        );
    }

    private inputChange = (e: any) => {
        const {
            type,
            changeValue,
        } = this.props;

        const value = e.target.value;
        changeValue(type, parseFloat(value));
    }

    private round = (val: number) => {
        return Math.round(val * 100) / 100;
    }
}


export default TextImageEditorButtonIncrements;
