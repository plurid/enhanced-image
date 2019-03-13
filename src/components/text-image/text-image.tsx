import { Component, Prop } from '@stencil/core';

import { ITextImage } from '../../interfaces/image-text';



@Component({
    tag: 'text-image',
    styleUrl: 'text-image.css',
    shadow: true
})
export class TextImage {
    @Prop() text: ITextImage;

    render() {
        const text = this.text;
        console.log('text', this.text);

        return (
            <span
                class="text-image-span"
                style={{
                    top: text.yCoord + 'px',
                    left: text.xCoord + 'px',
                    // color: text.color,
                    fontFamily: text.fontFamily,
                    fontSize: text.fontSize + 'px',
                    fontWeight: text.fontWeight + '',
                    letterSpacing: text.letterSpacing + 'px',
                }}
            >
                {text.content}
            </span>
        );
    }
}
