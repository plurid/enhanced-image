import { Component, Prop } from '@stencil/core';



@Component({
    tag: 'enhanced-image',
    styleUrl: 'enhanced-image.css',
    shadow: true
})
export class EnhancedImage {
    /**
    * The source of the image
    */
    @Prop() src: string;

    render() {
        return (
            <div>
                Image src is {this.src}
                <div>
                    <img src={this.src} height="500" />
                </div>
            </div>
        );
    }
}
