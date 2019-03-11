import { Component, Prop } from '@stencil/core';

import {
    SLIDER_DEFAULTS,
    SLIDER_ITEM_DEFAULTS,
} from '../../utils/defaults';
import { sliders } from '../../data/sliders';
import fullscreenIcon from '../../assets/fullscreen-icon.svg';
import saveIcon from '../../assets/save-icon.svg';
import resetIcon from '../../assets/reset-icon.svg';
import aboutIcon from '../../assets/about-icon.svg';



@Component({
    tag: 'enhanced-image-settings-list',
    styleUrl: 'enhanced-image-settings-list.css',
    shadow: true
})
export class EnhancedImageSettingsList {
    saveButton!: HTMLAnchorElement;

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

    @Prop() fullscreen: any;
    @Prop() fullscreenToggled: any;

    @Prop() saveImage: any;

    setSliderDefaults = () => {
        this.setSlider('contrast', SLIDER_DEFAULTS.contrast);
        this.setSlider('hue', SLIDER_DEFAULTS.hue);
        this.setSlider('saturation', SLIDER_DEFAULTS.saturation);
        this.setSlider('brightness', SLIDER_DEFAULTS.brightness);
    }

    download = (image: any, imageName: string) => {
        this.saveButton.href = URL.createObjectURL(image);;
        this.saveButton.download = imageName;
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
                                    min={slider.min || SLIDER_ITEM_DEFAULTS.min}
                                    max={slider.max || SLIDER_ITEM_DEFAULTS.max}
                                    valueSign={slider.valueSign || SLIDER_ITEM_DEFAULTS.valueSign}
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
                            icon={fullscreenIcon}
                            text={this.fullscreenToggled ? 'Exit Fullscreen' : 'View Fullscreen'}
                        />
                    </li>
                    <li onMouseEnter={this.saveImage.bind(this, this.download)}>
                        <a ref={(el) => this.saveButton = el as HTMLAnchorElement}>
                            <enhanced-image-button-item
                                onClick={() => {}}
                                icon={saveIcon}
                                text={'Save Image'}
                            />
                        </a>
                    </li>
                    <li>
                        <enhanced-image-button-item
                            onClick={this.resetToDefaults}
                            icon={resetIcon}
                            text={'Reset to Defaults'}
                        />
                    </li>
                    <li>
                        <enhanced-image-button-item
                            onClick={this.aboutEnhancedImage}
                            icon={aboutIcon}
                            text={'About Enhanced Image'}
                        />
                    </li>
                </ul>
            </div>
        );
    }
}
