import { Component, Prop } from '@stencil/core';

import { ITextSelectImageData, ITextImage } from '../../interfaces/image-text';



@Component({
    tag: 'select-image',
    styleUrl: 'select-image.css',
    shadow: true
})
export class SelectImage {
    @Prop() selectText: ITextSelectImageData;
    @Prop() editable: boolean;
    @Prop() imageWidth: number;
    @Prop() imageHeight: number;

    @Prop() updateText: (id: string, text: ITextImage) => void;
    @Prop() duplicateText: (id: string) => void;
    @Prop() deleteText: (id: string) => void;

    render() {
        console.log('select-image :: this.selectText', this.selectText);
        const { imageText } = this.selectText;

        return (
            <div>
                {imageText.map(text => {
                    return (
                        <div onClick={this.duplicateText.bind(this, text.id)}>{text.id}</div>
                        // <text-image
                        //     editable={this.editable}

                        //     textId={text.id}
                        //     imageText={imageText}

                        //     updateText={this.updateText}
                        //     duplicateText={this.duplicateText}
                        //     deleteText={this.deleteText}

                        //     imageWidth={this.imageWidth}
                        //     imageHeight={this.imageHeight}
                        // />
                    );
                })}
            </div>
        );
    }
}
