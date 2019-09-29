import React, { Component } from 'react';

import {
    StyledEnhancedImageButtonItem,
    StyledEnhancedImageButtonItemIcon,
} from './styled';



// interface IEnhancedImageButtonItemProps {
//     icon: JSX.Element;
//     text: string;
//     atClick: (event: any) => void;
//     theme: any;
// }


class EnhancedImageButtonItem extends Component<
    // IEnhancedImageButtonItemProps, any
    any, any
> {
    public render() {
        const {
            icon,
            text,
            atClick,
            theme,
        } = this.props;

        return (
            <StyledEnhancedImageButtonItem
                onClick={atClick}
            >
                <StyledEnhancedImageButtonItemIcon
                    theme={theme}
                >
                    {icon}
                </StyledEnhancedImageButtonItemIcon>

                <div>
                    {text}
                </div>
            </StyledEnhancedImageButtonItem>
        );
    }
}


export default EnhancedImageButtonItem;
