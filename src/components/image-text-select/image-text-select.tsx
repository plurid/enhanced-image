import { Component, Prop } from '@stencil/core';



@Component({
    tag: 'image-text-select',
    styleUrl: 'image-text-select.css',
    shadow: false
})
export class ImageTextSelect {
    @Prop() src: string;
    @Prop() alt: string;

    render() {
        return (
            <img src={this.src} alt={this.alt || ''} />
        );
    }
}
