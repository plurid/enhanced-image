import React, { Component } from 'react';

import { StyledSelectImage } from './styled';

import Context from '../../context';

import TextImage from '../TextImage';



class SelectImage extends Component<any, any> {
    static contextType = Context;

    public render() {
        // console.log('RENDER SelectImage');
        const {
            imageText,
        } = this.context;
        console.log('imageText in SelectImage', imageText);

        let renderImageText = (<></>);
        if (typeof imageText === 'object' && imageText.length > 0) {
            renderImageText = imageText.map((text: any) => {
                return (
                    <TextImage
                        key={text.currentVersionId}
                        text={text}
                    />
                );
            });
        }

        return (
            <StyledSelectImage>
                {renderImageText}
            </StyledSelectImage>
        );
    }
}


export default SelectImage;
