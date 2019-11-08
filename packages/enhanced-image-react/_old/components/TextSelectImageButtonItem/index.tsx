import React, { Component } from 'react';

import {
    StyledTextSelectImageButtonItem,
    StyledTextSelectImageButtonItemIcon,
} from './styled';



interface ITextSelectImageButtonItemProps {
    icon: JSX.Element;
    text: string;
    atClick: (event: any) => void;
    theme: any;
}


class TextSelectImageButtonItem extends Component<
    ITextSelectImageButtonItemProps, any
> {
    public render() {
        const {
            icon,
            text,
            atClick,
            theme,
        } = this.props;

        return (
            <StyledTextSelectImageButtonItem
                onClick={atClick}
            >
                <StyledTextSelectImageButtonItemIcon
                    theme={theme}
                >
                    {icon}
                </StyledTextSelectImageButtonItemIcon>

                <div>
                    {text}
                </div>
            </StyledTextSelectImageButtonItem>
        );
    }
}


export default TextSelectImageButtonItem;
