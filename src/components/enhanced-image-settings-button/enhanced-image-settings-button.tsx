import { Component, Prop, State } from '@stencil/core';

import settingsIcon from '../../assets/settings-icon.svg';


const DEFAULT_CONTRAST = 100;
const DEFAULT_HUE = 0;
const DEFAULT_SATURATION = 100;
const DEFAULT_BRIGHTNESS = 100;


@Component({
    tag: 'enhanced-image-settings-button',
    styleUrl: 'enhanced-image-settings-button.css',
    shadow: true
})
export class EnhancedImageSettingsButton {
    /**
     * The source of the image
     */
    @Prop() src: string;

    /**
     * The source of the image
     */
    @Prop() invertColors: any;
    @Prop() contrast: any;
    @Prop() hue: any;
    @Prop() saturation: any;
    @Prop() brightness: any;

    @State() clicked: boolean = false;
    @State() colorsInverted: boolean = false;
    @State() contrastSliderValue: number = DEFAULT_CONTRAST;
    @State() hueSliderValue: number = DEFAULT_HUE;
    @State() saturationSliderValue: number = DEFAULT_SATURATION;
    @State() brightnessSliderValue: number = DEFAULT_BRIGHTNESS;

    click = () => {
        this.clicked = !this.clicked;
    }

    componentDidLoad() {
        this.contrast(this.contrastSliderValue);
        this.hue(this.hueSliderValue);
        this.saturation(this.saturationSliderValue);
        this.brightness(this.brightnessSliderValue);
    }

    colorsInvert = () => {
        this.invertColors();
        this.colorsInverted = !this.colorsInverted;
    }

    handleChange = (event: any) => {
        const name = event.target.name;
        const sliderValue = `${name}SliderValue`;
        const value = event.target.value;
        this[name](value);
        this[sliderValue] = value;
    }

    resetDefault = () => {
        if (this.colorsInverted) {
            this.colorsInverted = false;
            this.invertColors();
        }

        this.contrast(DEFAULT_CONTRAST);
        this.contrastSliderValue = DEFAULT_CONTRAST;

        this.hue(DEFAULT_HUE);
        this.hueSliderValue = DEFAULT_HUE;

        this.saturation(DEFAULT_SATURATION);
        this.saturationSliderValue = DEFAULT_SATURATION;

        this.brightness(DEFAULT_BRIGHTNESS);
        this.brightnessSliderValue = DEFAULT_BRIGHTNESS;
    }

    render() {
        if (!this.clicked) {
            return (
                <div onClick={this.click} class="enhanced-image-settings-button" innerHTML={settingsIcon} />
            );
        } else {
            return (
                <div class="enhanced-image-settings-button-container">
                    <div onClick={this.click} class="enhanced-image-settings-button" innerHTML={settingsIcon} />
                    <div class="enhanced-image-settings-list">
                        <ul>
                            <li class="enhanced-image-settings-list-button" onClick={this.colorsInvert}>
                                Invert Colors
                                <span class="slider-value">
                                    <span class={ this.colorsInverted ? 'checkbox checkbox-fill' : 'checkbox' }></span>
                                </span>
                            </li>
                            <li>
                                <div>
                                    Contrast
                                    <span class="slider-value">
                                        {this.contrastSliderValue}
                                    </span>
                                </div>
                                <div class="slidecontainer">
                                    <input
                                        class="slider"
                                        type="range"
                                        min="0"
                                        max="200"
                                        name="contrast"
                                        value={this.contrastSliderValue}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </li>
                            <li>
                                <div>
                                    Hue Rotate
                                    <span class="slider-value">
                                        {this.hueSliderValue}
                                    </span>
                                </div>
                                <div class="slidecontainer">
                                    <input
                                        class="slider"
                                        type="range"
                                        min="0"
                                        max="360"
                                        name="hue"
                                        value={this.hueSliderValue}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </li>
                            <li>
                                <div>
                                    Saturation
                                    <span class="slider-value">
                                        {this.saturationSliderValue}
                                    </span>
                                </div>
                                <div class="slidecontainer">
                                    <input
                                        class="slider"
                                        type="range"
                                        min="0"
                                        max="200"
                                        name="saturation"
                                        value={this.saturationSliderValue}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </li>
                            <li>
                                <div>
                                    Lightness
                                    <span class="slider-value">
                                        {this.brightnessSliderValue}
                                    </span>
                                </div>
                                <div class="slidecontainer">
                                    <input
                                        class="slider"
                                        type="range"
                                        min="0"
                                        max="200"
                                        name="brightness"
                                        value={this.brightnessSliderValue}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </li>
                            <li class="enhanced-image-settings-list-button" onClick={this.resetDefault}>
                                Reset to Default
                            </li>
                        </ul>
                    </div>
                </div>
            );
        }
    }
}
