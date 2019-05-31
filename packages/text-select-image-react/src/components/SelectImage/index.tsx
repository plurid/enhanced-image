import React, { Component } from 'react';

import { StyledSelectImage } from './styled';

import Context from '../../context';

import TextImage from '../TextImage';



class SelectImage extends Component<any, any> {
    static contextType = Context;

    public render() {
        console.log('RENDER SelectImage');
        // console.log(this.context);
        const {
            imageText,
        } = this.context;
        console.log('imageText', imageText);

        let renderImageText;
        if (imageText) {
            renderImageText = imageText.map((text: any) => {
                return (
                    <TextImage
                        key={text.id}
                        text={text}
                    />
                );
            });
        } else {
            return null;
        }

        return (
            <StyledSelectImage>
                {renderImageText}
            </StyledSelectImage>
        );
    }
}


export default SelectImage;
