import React from 'react';

import {
    StyledButtonInline,
} from './styled';



interface ButtonInlineProps {
    theme: any;
    atClick?: any;
    styles?: any;
}


const ButtonInline: React.FC<ButtonInlineProps> = (props) => {
    const {
        atClick,
        theme,
        styles,
    } = props;

    return (
        <StyledButtonInline
            theme={theme}
            onClick={atClick ? atClick : undefined}
            style={styles ? {...styles} : {}}
        >
            {props.children}
        </StyledButtonInline>
    );
}


export default ButtonInline;
