import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    StyledInputText,
} from './styled';



export interface InputTextProps {
    theme: Theme;
    value: string;
    atChange: any;
    placeholder?: string;
    password?: boolean;
}

const InputText: React.FC<InputTextProps> = (
    properties,
) => {
    /** properties */
    const {
        theme,
        value,
        atChange,
        password,
        placeholder,
    } = properties;


    /** render */
    return (
        <StyledInputText
            theme={theme}
        >
            <input
                type={password ? 'password' : 'text'}
                value={value}
                onChange={atChange}
                placeholder={placeholder ? placeholder : ''}
                spellCheck={false}
                autoCapitalize="false"
                autoComplete="false"
                autoCorrect="false"
            />
        </StyledInputText>
    );
}


export default InputText;
