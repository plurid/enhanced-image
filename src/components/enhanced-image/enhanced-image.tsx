import { Component, Prop, State, Element } from '@stencil/core';

import { SLIDER_DEFAULTS } from '../../utils/defaults';



@Component({
    tag: 'enhanced-image',
    styleUrl: 'enhanced-image.css',
    shadow: true
})
export class EnhancedImage {
    @Element() element: HTMLElement;

    /**
    * The source of the image
    */
    @Prop() src: string;

    /**
    * The position of the settings button
    */
    @Prop() settingsPosition: string;


    @State() invert: number = SLIDER_DEFAULTS.invert;
    @State() contrastValue: number = SLIDER_DEFAULTS.contrast;
    @State() hueValue: number = SLIDER_DEFAULTS.hue;
    @State() saturationValue: number = SLIDER_DEFAULTS.saturation;
    @State() brightnessValue: number = SLIDER_DEFAULTS.brightness;


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
                <enhanced-image-settings
                    class="enhanced-image-settings-button"
                    src={this.src}
                    invertColors={this.invertColors}
                    setSliderValue={this.setSliderValue}
                    imageRef={this.element}
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
