import React from 'react';

import {
    StyledInputText,
} from './styled';



interface InputTextProps {
    theme: any;
    value: string;
    atChange: any;
    placeholder?: string;
    password?: boolean;
}


const InputText: React.FC<InputTextProps> = (props) => {
    const {
        theme,
        value,
        atChange,
        password,
        placeholder,
    } = props;

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
