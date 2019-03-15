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
    @Prop() editable: boolean;
    @Prop() imageWidth: number;

    render() {
        const { imageText } = this.selectText;

        return (
            <div>
                {imageText.map(text => {
                    return (
                        <text-image
                            textSelectImage={this.textSelectImage}
                            text={text}
                            editable={this.editable}
                            imageWidth={this.imageWidth}
                        />
                    );
                })}
            </div>
        );
    }
}
