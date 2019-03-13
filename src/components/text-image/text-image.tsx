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
        console.log('text', this.text);

        return (
            <div>TextImage Works</div>
        );
    }
}
