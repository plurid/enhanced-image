import { Component, Prop } from '@stencil/core';

import { ITextSelectImageData, ITextImage } from '../../interfaces/image-text';



@Component({
    tag: 'select-image',
    styleUrl: 'select-image.css',
    shadow: true,
})
export class SelectImage {
    private div!: HTMLDivElement;

    @Prop() private selectText: ITextSelectImageData;
    @Prop() private editable: boolean;
    @Prop() private imageWidth: number;
    @Prop() private imageHeight: number;

    @Prop() private updateText: (id: string, text: ITextImage) => void;
    @Prop() private duplicateText: (id: string) => void;
    @Prop() private deleteText: (id: string) => void;

    public render() {
        // console.log('select-image :: this.selectText', this.selectText);
        const { imageText } = this.selectText;

        return (
            <div
                ref={(el) => this.div = el as HTMLDivElement}
            >
                {imageText.map(text => {
                    return (
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

    private removeText = (id: string) => {
        const el = this.div.querySelector(`text-image[text-id=${id}]`);
        this.div.removeChild(el);
        this.deleteText(id);
    }
}
