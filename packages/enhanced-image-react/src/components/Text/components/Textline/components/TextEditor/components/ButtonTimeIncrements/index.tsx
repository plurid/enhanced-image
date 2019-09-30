import React, { Component } from 'react';

import {
    StyledTextVideoEditorButtonIncrement,
    StyledTextVideoEditorButtonIncrementIcon,
    StyledTextVideoEditorButtonIncrements,
    StyledTextVideoEditorButtonIncrementButton,
    StyledTextVideoEditorButtonIncrementsInputs,
} from './styled';



const STEP = 1;
const UP_ARROW = (<span>&#x25b2;</span>);
const DOWN_ARROW = (<span>&#x25bc;</span>);


class TextVideoEditorButtonTimeIncrements extends Component<any, any> {
    public render() {
        const {
            icon,
            time,
            changeValue,
            type,
            step,
            theme,
            iconAfter,
        } = this.props;

        const stepValue = step || STEP;

        const Icon = (
            <StyledTextVideoEditorButtonIncrementIcon
                theme={theme}
            >
                {icon}
            </StyledTextVideoEditorButtonIncrementIcon>
        )

        // console.log('AA', time);
        const {
            hours,
            minutes,
            seconds,
        } = this.parseTime(time);

        return (
            <StyledTextVideoEditorButtonIncrement
                theme={theme}
            >
                {!iconAfter && Icon}

                <StyledTextVideoEditorButtonIncrements
                    theme={theme}
                >
                    <StyledTextVideoEditorButtonIncrementButton
                        theme={theme}
                        onClick={changeValue.bind(this, type, this.round(time + stepValue))}
                    >
                        {UP_ARROW}
                    </StyledTextVideoEditorButtonIncrementButton>

                    <StyledTextVideoEditorButtonIncrementButton
                        theme={theme}
                        onClick={changeValue.bind(this, type, this.round(time - stepValue))}
                    >
                        {DOWN_ARROW}
                    </StyledTextVideoEditorButtonIncrementButton>
                </StyledTextVideoEditorButtonIncrements>

                <StyledTextVideoEditorButtonIncrementsInputs
                    theme={theme}
                >
                    <input
                        type="number"
                        value={hours}
                        step={1}
                        onChange={this.inputChange.bind(this, 'hours')}
                    />
                    :
                    <input
                        type="number"
                        value={minutes}
                        step={1}
                        onChange={this.inputChange.bind(this, 'minutes')}
                    />
                    :
                    <input
                        type="number"
                        value={seconds}
                        step={1}
                        onChange={this.inputChange.bind(this, 'seconds')}
                    />
                </StyledTextVideoEditorButtonIncrementsInputs>

                {iconAfter && Icon}
            </StyledTextVideoEditorButtonIncrement>
        );
    }

    private inputChange = (kind: string, e: any) => {
        const value = e.target.value;

        const {
            type,
            changeValue,
            time,
        } = this.props;

        const {
            hours,
            minutes,
            seconds,
        } = this.parseTime(time);

        let newTime = 0;
        let val;
        if (value === '') {
            val = 0
        } else {
            val = parseInt(value);
        }

        switch(kind) {
            case 'hours':
                newTime = val * 3600 + minutes * 60 + seconds;
                // console.log('hours', value, newTime);
                break;
            case 'minutes':
                newTime = hours * 3600 + val * 60 + seconds;
                // console.log('minutes', value, newTime);
                break;
            case 'seconds':
                newTime = hours * 3600 + minutes * 60 + val;
                // console.log('seconds', value, newTime);
                break;
        }

        // console.log(newTime);
        // console.log(value);
        changeValue(type, newTime);
    }

    private round = (val: number) => {
        return Math.round(val * 100) / 100;
    }

    private parseTime = (time: number) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time - 3600 * hours) / 60);
        const seconds = Math.floor(time - (3600 * hours + 60 * minutes));

        return {
            hours,
            minutes,
            seconds,
        }
    }
}


export default TextVideoEditorButtonTimeIncrements;
