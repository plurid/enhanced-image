import { Component, Prop } from '@stencil/core';

import { ITextSelectImageData, ITextImage } from '../../interfaces/image-text';



@Component({
    tag: 'select-image',
    styleUrl: 'select-image.css',
    shadow: true
})
export class SelectImage {
    div!: HTMLDivElement;

    @Prop() selectText: ITextSelectImageData;
    @Prop() editable: boolean;
    @Prop() imageWidth: number;
    @Prop() imageHeight: number;

    @Prop() updateText: (id: string, text: ITextImage) => void;
    @Prop() duplicateText: (id: string) => void;
    @Prop() deleteText: (id: string) => void;

    removeText = (id: string) => {
        const el = this.div.querySelector(`text-image[text-id=${id}]`);
        this.div.removeChild(el);
        console.log(el);

        this.deleteText(id);
    }

    render() {
        console.log('select-image :: this.selectText', this.selectText);
        const { imageText } = this.selectText;

        return (
            <div
                ref={(el) => this.div = el as HTMLDivElement}
            >
                {imageText.map(text => {
                    return (
                        // <div onClick={this.deleteText.bind(this, text.id)}>{text.id}</div>
                        <text-image
                            key={text.id}

                            editable={this.editable}

                            textId={text.id}
                            textImage={text}
                            imageText={imageText}

                            updateText={this.updateText}
                            duplicateText={this.duplicateText}
                            removeText={this.removeText}

                            imageWidth={this.imageWidth}
                            imageHeight={this.imageHeight}
                        />
                    );
                })}
            </div>
        );
    }
}
