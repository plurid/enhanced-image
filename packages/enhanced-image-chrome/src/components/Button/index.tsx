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
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
}


const Button: React.FC<ButtonProps> = (props) => {
    const {
        theme,
        text,
        atClick,
        disabled,
        loading,
        loadingText,
    } = props;

    const [disabledButton, setDisabledButton] = useState(disabled ? disabled : false);
    const [loadingButton, setLoadingButton] = useState(loading ? loading : false);

    const handleClick = () => {
        setDisabledButton(true);
        setLoadingButton(true);
        atClick();
    }

    return (
        <StyledButton
            theme={theme}
        >
           <button
                onClick={handleClick}
                disabled={disabledButton}
           >
               {loadingButton ? loadingText : text}
           </button>
        </StyledButton>
    );
}


export default Button;
