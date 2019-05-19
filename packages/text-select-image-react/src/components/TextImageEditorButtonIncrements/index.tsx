import React, { Component } from 'react';

import { StyledTextImageEditorButtonIncrements } from './styled';



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
            <StyledTextImageEditorButtonIncrements
                theme={theme}
            >
                <span className="text-image-editor-button">
                    <span
                        className="text-image-editor-button-icon"
                    >
                        {icon}
                    </span>
                    <span className="text-image-editor-button-increments">
                        <span
                            className="text-image-editor-button-increment-button text-image-editor-button-increment-up"
                            // onClick={changeValue.bind(this, type, this.round(value + stepValue))}
                        >
                            {UP_ARROW}
                        </span>
                        <span
                            className="text-image-editor-button-increment-button text-image-editor-button-increment-down"
                            // onClick={changeValue.bind(this, type, this.round(value - stepValue))}
                        >
                            {DOWN_ARROW}
                        </span>
                    </span>

                    <input
                        type="number"
                        value={value}
                        step={stepValue}
                        onInput={this.inputChange}
                    />

                    <span className="text-image-editor-button-increments-unit">
                        {unit || 'px'}
                    </span>
                </span>
            </StyledTextImageEditorButtonIncrements>
        );
    }

    private inputChange = (e: any) => {
        const {
            type,
            changeValue,
        } = this.props;

        const value = e.target.value;
        changeValue(type, value);
    }

    private round = (val: number) => {
        return Math.round(val * 100) / 100;
    }
}


export default TextImageEditorButtonIncrements;
