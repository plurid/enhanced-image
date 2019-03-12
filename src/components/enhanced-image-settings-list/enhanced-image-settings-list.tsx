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
import bottomleftIcon from '../../assets/bottomleft-icon.svg';
import bottomrightIcon from '../../assets/bottomright-icon.svg';
import topleftIcon from '../../assets/topleft-icon.svg';
import toprightIcon from '../../assets/topright-icon.svg';



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

    @Prop() location: string;
    @Prop() setLocation: (location: string) => void;

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
            this.colorsInvert();
        }
        this.setSliderDefaults();
    }

    aboutEnhancedImage = () => {
        const aboutURL = "https://github.com/plurid/enhanced-image-html"
        window.open(aboutURL, '_blank');
    }

    render() {
        return (
            <div class={`enhanced-image-settings-list enhanced-image-settings-list-${this.location}`}>
                <ul>
                    {/* <li>
                        <enhanced-image-button-checkmark
                            toggle={this.colorsInvert}
                            text={'Text Select'}
                            checked={this.colorsInverted}
                        />
                    </li>

                    <hr class="enhanced-image-hr"/> */}

                    <li>
                        <enhanced-image-button-checkmark
                            toggle={this.colorsInvert}
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
                            atClick={this.resetToDefaults}
                            icon={resetIcon}
                            text={'Reset to Defaults'}
                        />
                    </li>

                    <hr class="enhanced-image-hr"/>

                    <li>
                        <enhanced-image-button-item
                            atClick={this.fullscreen}
                            icon={fullscreenIcon}
                            text={this.fullscreenToggled ? 'Exit Fullscreen' : 'View Fullscreen'}
                        />
                    </li>
                    <li onMouseEnter={this.saveImage.bind(this, this.download)}>
                        <a ref={(el) => this.saveButton = el as HTMLAnchorElement}>
                            <enhanced-image-button-item
                                atClick={() => {}}
                                icon={saveIcon}
                                text={'Save Image'}
                            />
                        </a>
                    </li>
                    <li class="enhanced-image-button-default enhanced-image-location">
                        <span>Location</span>
                        <span class="enhanced-image-location-spans">
                            <span
                                class={`enhanced-image-location-span ${this.location === 'topleft' ? 'enhanced-image-location-span-active' : ''}`}
                                innerHTML={topleftIcon}
                                onClick={this.setLocation.bind(this, 'topleft')}
                            />
                            <span
                                class={`enhanced-image-location-span ${this.location === 'topright' ? 'enhanced-image-location-span-active' : ''}`}
                                innerHTML={toprightIcon}
                                onClick={this.setLocation.bind(this, 'topright')}
                            />
                            <span
                                class={`enhanced-image-location-span ${this.location === 'bottomleft' ? 'enhanced-image-location-span-active' : ''}`}
                                innerHTML={bottomleftIcon}
                                onClick={this.setLocation.bind(this, 'bottomleft')}
                            />
                            <span
                                class={`enhanced-image-location-span ${this.location === 'bottomright' ? 'enhanced-image-location-span-active' : ''}`}
                                innerHTML={bottomrightIcon}
                                onClick={this.setLocation.bind(this, 'bottomright')}
                            />
                        </span>
                    </li>

                    <hr class="enhanced-image-hr" />

                    <li>
                        <enhanced-image-button-item
                            atClick={this.aboutEnhancedImage}
                            icon={aboutIcon}
                            text={'About Enhanced Image'}
                        />
                    </li>
                </ul>
            </div>
        );
    }
}
