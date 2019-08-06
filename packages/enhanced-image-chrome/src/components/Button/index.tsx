import React, {
    useState,
} from 'react';

import {
    StyledButton,
} from './styled';



interface ButtonProps {
    theme: any;
    text: string;
    atClick: any;
    loading?: boolean;
    loadingText?: string;
}


const Button: React.FC<ButtonProps> = (props) => {
    const {
        theme,
        text,
        atClick,
        loading,
        loadingText,
    } = props;

    const handleClick = () => {
        atClick();
    }

    return (
        <StyledButton
            theme={theme}
        >
           <button
                onClick={handleClick}
                disabled={loading}
           >
               {loading ? loadingText : text}
           </button>
        </StyledButton>
    );
}


export default Button;
