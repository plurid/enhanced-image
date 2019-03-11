import { Component, Prop } from '@stencil/core';

import { SLIDER_DEFAULTS } from '../../utils/defaults';
import { sliders } from '../../data/sliders';



@Component({
    tag: 'enhanced-image-settings-list',
    styleUrl: 'enhanced-image-settings-list.css',
    shadow: true
})
export class EnhancedImageSettingsList {
    /**
     * The source of the image.
     */
    @Prop() src: string;

    /**
     * Invert the colors.
     */
    @Prop() invertColors: any;

    /**
     * Set the value of the sliders.
     */
    @Prop() setSliderValue: any;

    @Prop() colorsInvert: any;
    @Prop() colorsInverted: any;

    @Prop() contrastSliderValue: any;
    @Prop() hueSliderValue: any;
    @Prop() saturationSliderValue: any;
    @Prop() brightnessSliderValue: any;

    @Prop() handleSliderInput: any;
    @Prop() setSlider: any;

    @Prop() imageRef: any;
    @Prop() fullscreenToggled: any;

    @Prop() saveImage: any;


    fullscreen = () => {
        if (!this.fullscreenToggled) {
            this.imageRef.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        this.fullscreenToggled = !this.fullscreenToggled;
    }

    setSliderDefaults = () => {
        this.setSlider('contrast', SLIDER_DEFAULTS.contrast);
        this.setSlider('hue', SLIDER_DEFAULTS.hue);
        this.setSlider('saturation', SLIDER_DEFAULTS.saturation);
        this.setSlider('brightness', SLIDER_DEFAULTS.brightness);
    }

    resetToDefaults = () => {
        if (this.colorsInverted) {
            this.colorsInverted = false;
            this.invertColors();
        }
        this.setSliderDefaults();
    }

    aboutEnhancedImage = () => {
        const aboutURL = "https://github.com/plurid/enhanced-image-html"
        window.open(aboutURL, '_blank');
    }

    render() {
        return (
            <div class="enhanced-image-settings-list">
                <ul>
                    <li>
                        <enhanced-image-button-checkmark
                            onClick={this.colorsInvert}
                            text={'Invert Colors'}
                            checked={this.colorsInverted}
                        />
                    </li>

                    {sliders.map(slider => {
                        const sliderValue = `${slider.type}SliderValue`;

                        return (
                            <li>
                                <enhanced-image-slider-item
                                    type={slider.type}
                                    min={slider.min || 0}
                                    max={slider.max || 100}
                                    sliderValue={this[sliderValue]}
                                    handleSliderInput={this.handleSliderInput}
                                    setSlider={this.setSlider}
                                />
                            </li>
                        );
                    })}

                    <li>
                        <enhanced-image-button-item
                            onClick={this.fullscreen}
                            text={this.fullscreenToggled ? 'Exit Fullscreen' : 'View Fullscreen Image'}
                        />
                    </li>
                    <li>
                        <enhanced-image-button-item
                            onClick={this.saveImage}
                            text={'Save Image'}
                        />
                    </li>
                    <li>
                        <enhanced-image-button-item
                            onClick={this.resetToDefaults}
                            text={'Reset to Defaults'}
                        />
                    </li>
                    <li>
                        <enhanced-image-button-item
                            onClick={this.aboutEnhancedImage}
                            text={'About Enhanced Image'}
                        />
                    </li>
                </ul>
            </div>
        );
    }
}
