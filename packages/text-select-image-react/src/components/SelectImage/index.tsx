import React, { Component } from 'react';

import { StyledSelectImage } from './styled';

import Context from '../../context';

import TextImage from '../TextImage';



class SelectImage extends Component<any, any> {
    static contextType = Context;

    public render() {
        const {
            selectText,
        } = this.context;

        let renderSelectText;
        if (selectText) {
            const {
                imageText,
            } = selectText;
            renderSelectText = imageText.map((text: any) => {
                return (
                    <TextImage
                        key={text.id}
                        text={text}
                    />
                );
            });
        }

        return (
            <StyledSelectImage>
                {renderSelectText}
            </StyledSelectImage>
        );
    }
}


export default SelectImage;
