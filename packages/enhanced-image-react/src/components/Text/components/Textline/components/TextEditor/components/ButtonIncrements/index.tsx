import React, { Component } from 'react';

import {
    StyledTextVideoEditorButtonIncrement,
    StyledTextVideoEditorButtonIncrementIcon,
    StyledTextVideoEditorButtonIncrements,
    StyledTextVideoEditorButtonIncrementButton,
    StyledTextVideoEditorButtonIncrementsUnit,
} from './styled';



const STEP = 1;
const UP_ARROW = (<span>&#x25b2;</span>);
const DOWN_ARROW = (<span>&#x25bc;</span>);


class TextVideoEditorButtonIncrements extends Component<any, any> {
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
            <StyledTextVideoEditorButtonIncrement
                theme={theme}
            >
                <StyledTextVideoEditorButtonIncrementIcon
                    theme={theme}
                >
                    {icon}
                </StyledTextVideoEditorButtonIncrementIcon>

                <StyledTextVideoEditorButtonIncrements
                    theme={theme}
                >
                    <StyledTextVideoEditorButtonIncrementButton
                        theme={theme}
                        onClick={changeValue.bind(this, type, this.round(value + stepValue))}
                    >
                        {UP_ARROW}
                    </StyledTextVideoEditorButtonIncrementButton>

                    <StyledTextVideoEditorButtonIncrementButton
                        theme={theme}
                        onClick={changeValue.bind(this, type, this.round(value - stepValue))}
                    >
                        {DOWN_ARROW}
                    </StyledTextVideoEditorButtonIncrementButton>
                </StyledTextVideoEditorButtonIncrements>

                <input
                    type="number"
                    value={value.toFixed(1)}
                    step={stepValue}
                    onChange={this.inputChange}
                />

                <StyledTextVideoEditorButtonIncrementsUnit>
                    {unit || 'px'}
                </StyledTextVideoEditorButtonIncrementsUnit>
            </StyledTextVideoEditorButtonIncrement>
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


export default TextVideoEditorButtonIncrements;
