import { Component, Prop } from '@stencil/core';

import { ITextSelectImageData } from '../../interfaces/image-text';



@Component({
    tag: 'select-image',
    styleUrl: 'select-image.css',
    shadow: true
})
export class SelectImage {
    @Prop() textSelectImage: any;
    @Prop() selectText: ITextSelectImageData;

    render() {
        const { imageText } = this.selectText;
        // console.log('selectText', this.selectText);

        return (
            <div>
                {imageText.map(text => {
                    return (
                        <text-image
                            textSelectImage={this.textSelectImage}
                            text={text}
                        />
                    );
                })}
            </div>
        );
    }
}
