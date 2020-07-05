import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    StyledSimpleInput,
    StyledInfo,
} from './styled';



export interface SimpleInputProperties {
    /** required */
    value: string;
    valueType: string;
    changeValue: (
        type: string,
        value: string | number | boolean,
    ) => void;
    theme: Theme;
    transparentUI: boolean;


    /** optional */
    text?: string;
    Icon?: React.FC<any>;
    inputWidth?: string;
}

const SimpleInput: React.FC<SimpleInputProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        value,
        valueType,
        changeValue,
        theme,
        transparentUI,

        /** optional */
        text,
        Icon,
        inputWidth,
    } = properties;


    /** handlers */
    const handleInput = (event: any) => {
        changeValue(valueType, event.target.value);
    }


    /** render */
    return (
        <StyledSimpleInput
            theme={theme}
            transparentUI={transparentUI}
            inputWidth={inputWidth || '50px'}
        >
            {text && (
                <StyledInfo>
                    {text}
                </StyledInfo>
            )}

            {Icon && (
                <StyledInfo>
                    <Icon />
                </StyledInfo>
            )}

            <input
                value={value}
                onChange={handleInput}
                onKeyDown={(event) => {
                    event.stopPropagation();
                }}
            />
        </StyledSimpleInput>
    );
}


export default SimpleInput;
