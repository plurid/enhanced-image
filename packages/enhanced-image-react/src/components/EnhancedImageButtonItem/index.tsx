import React, { Component } from 'react';

import {
    StyledEnhancedImageButtonItem,
    StyledEnhancedImageButtonItemIcon,
} from './styled';

import {
    EnhancedImageButtonItemProperties,
    EnhancedImageButtonItemState,
} from './interfaces';



class EnhancedImageButtonItem extends Component<
    EnhancedImageButtonItemProperties, EnhancedImageButtonItemState
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
