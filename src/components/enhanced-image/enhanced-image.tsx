import { Component, Prop, State } from '@stencil/core';



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

    /**
    * The position of the settings button
    */
    @Prop() settingsPosition: string;

    @State() invert: number = 0;


    invertColors = () => {
        if ( this.invert == 1 ) {
            this.invert = 0;
        } else {
            this.invert = 1;
        }
    }

    render() {
        return (
            <div class="enhanced-image-container">
                <enhanced-image-settings-button
                    class="enhanced-image-settings-button"
                    invertColors={this.invertColors}
                />
                <img src={this.src}
                    style={{ filter: `invert(${this.invert})` }}
                    class="enhanced-image"
                />
            </div>
        );
    }
}
