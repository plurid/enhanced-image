import { Component, Prop, State } from '@stencil/core';

import {
    DEFAULT_INVERT,
    DEFAULT_CONTRAST,
    DEFAULT_HUE,
    DEFAULT_SATURATION,
    DEFAULT_BRIGHTNESS,
} from '../../utils/defaults';



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


    @State() invert: number = DEFAULT_INVERT;
    @State() contrastValue: number = DEFAULT_CONTRAST;
    @State() hueValue: number = DEFAULT_HUE;
    @State() saturationValue: number = DEFAULT_SATURATION;
    @State() brightnessValue: number = DEFAULT_BRIGHTNESS;


    /**
     *
     */
    invertColors = () => {
        if ( this.invert == 1 ) {
            this.invert = 0;
        } else {
            this.invert = 1;
        }
    }

    /**
     *
     */
    setSliderValue = (name: string, value: number) => {
        const sliderValue = `${name}Value`;
        this[sliderValue] = value;
    }

    render() {
        return (
            <div class="enhanced-image-container">
                <enhanced-image-settings-button
                    class="enhanced-image-settings-button"
                    src={this.src}
                    invertColors={this.invertColors}
                    setSliderValue={this.setSliderValue}
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
