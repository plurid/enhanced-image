import React from 'react';

import {
    StyledButtonIncrement,
    StyledButtonIncrementIcon,
    StyledButtonIncrements,
    StyledButtonIncrementButton,
    StyledButtonIncrementsUnit,
} from './styled';

import { Theme } from '@plurid/utilities.themes';



const STEP = 1;
const UP_ARROW = (<span>&#x25b2;</span>);
const DOWN_ARROW = (<span>&#x25bc;</span>);

interface ButtonIncrementsProperties {
    theme: Theme;
    transparentUI: boolean;
    icon: JSX.Element;
    type: string;
    value: number;
    changeValue: any;
    step?: number;
    unit?: string;
}

const ButtonIncrements: React.FC<ButtonIncrementsProperties> = (properties) => {
    const {
        theme,
        transparentUI,
        icon,
        type,
        value,
        changeValue,
        step,
        unit,
    } = properties;

    const stepValue = step || STEP;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        changeValue(type, parseFloat(value));
    }

    return (
        <StyledButtonIncrement
            theme={theme}
            transparentUI={transparentUI}
        >
            <StyledButtonIncrementIcon
                theme={theme}
                transparentUI={transparentUI}
            >
                {icon}
            </StyledButtonIncrementIcon>

            <StyledButtonIncrements
                theme={theme}
                transparentUI={transparentUI}
            >
                <StyledButtonIncrementButton
                    theme={theme}
                    transparentUI={transparentUI}
                    onClick={() => changeValue(type, value + stepValue)}
                >
                    {UP_ARROW}
                </StyledButtonIncrementButton>

                <StyledButtonIncrementButton
                    theme={theme}
                    transparentUI={transparentUI}
                    onClick={() => changeValue(type, value - stepValue)}
                >
                    {DOWN_ARROW}
                </StyledButtonIncrementButton>
            </StyledButtonIncrements>

            <input
                type="number"
                value={parseFloat(value.toFixed(1))}
                step={stepValue}
                onChange={handleChange}
            />

            <StyledButtonIncrementsUnit>
                {unit || 'px'}
            </StyledButtonIncrementsUnit>
        </StyledButtonIncrement>
    );
}

export default ButtonIncrements;



// // class TextVideoEditorButtonIncrements extends Component<any, any> {
// //     public render() {
// //         const {
// //             icon,
// //             unit,
// //             value,
// //             changeValue,
// //             type,
// //             step,
// //             theme,
// //             transparentUI,
// //         } = this.props;

// //         const stepValue = step || STEP;

// //         console.log('value aaaa', value);
// //         console.log('value stepValue', stepValue);

// //         return (
// //             <StyledTextVideoEditorButtonIncrement
// //                 theme={theme}
// //                 transparentUI={transparentUI}
// //             >

// //             </StyledTextVideoEditorButtonIncrement>
// //         );
// //     }

// //     private round = (val: number) => {
// //         return Math.round(val * 100) / 100;
// //     }
// // }
