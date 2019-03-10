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
    @State() contrastValue: number = 0;
    @State() hueValue: number = 0;
    @State() saturationValue: number = 0;
    @State() brightnessValue: number = 0;


    invertColors = () => {
        if ( this.invert == 1 ) {
            this.invert = 0;
        } else {
            this.invert = 1;
        }
    }

    contrast = (value: number) => {
        this.contrastValue = value;
    }

    hue = (value: number) => {
        console.log(value);
        this.hueValue = value;
    }

    saturation = (value: number) => {
        this.saturationValue = value;
    }

    brightness = (value: number) => {
        this.brightnessValue = value;
    }

    render() {
        return (
            <div class="enhanced-image-container">
                <enhanced-image-settings-button
                    class="enhanced-image-settings-button"
                    invertColors={this.invertColors}
                    contrast={this.contrast}
                    hue={this.hue}
                    saturation={this.saturation}
                    brightness={this.brightness}
                />
                <img src={this.src}
                    style={{
                        filter: `
                            invert(${this.invert})
                            contrast(${this.contrastValue}%)
                            hue-rotate(${this.hueValue}deg)
                            saturate(${this.saturationValue}%)
                            brightness(${this.brightnessValue}%)
                        `,
                    }}
                    class="enhanced-image"
                />
            </div>
        );
    }
}
