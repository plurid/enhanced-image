import { Component, Prop, State } from '@stencil/core';

import settingsIcon from '../../assets/settings-icon.svg';
import {
    DEFAULT_CONTRAST,
    DEFAULT_HUE,
    DEFAULT_SATURATION,
    DEFAULT_BRIGHTNESS,
    SLIDER_NAMES,
} from '../../utils/defaults';



@Component({
    tag: 'enhanced-image-settings-button',
    styleUrl: 'enhanced-image-settings-button.css',
    shadow: true
})
export class EnhancedImageSettingsButton {
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


    @State() clicked: boolean = false;
    @State() colorsInverted: boolean = false;
    @State() contrastSliderValue: number = DEFAULT_CONTRAST;
    @State() hueSliderValue: number = DEFAULT_HUE;
    @State() saturationSliderValue: number = DEFAULT_SATURATION;
    @State() brightnessSliderValue: number = DEFAULT_BRIGHTNESS;

    click = () => {
        this.clicked = !this.clicked;
    }

    colorsInvert = () => {
        this.invertColors();
        this.colorsInverted = !this.colorsInverted;
    }

    handleSliderInput = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setSlider(name, value);
    }

    saveImage = () => {
        console.log('save image', this.src);
    }

    setSlider = (name: string, value: number) => {
        const sliderValue = `${name}SliderValue`;
        this.setSliderValue(name, value);
        this[sliderValue] = value;
    }

    setSliderDefaults = () => {
        this.setSlider('contrast', DEFAULT_CONTRAST);
        this.setSlider('hue', DEFAULT_HUE);
        this.setSlider('saturation', DEFAULT_SATURATION);
        this.setSlider('brightness', DEFAULT_BRIGHTNESS);
    }

    resetDefaultAll = () => {
        if (this.colorsInverted) {
            this.colorsInverted = false;
            this.invertColors();
        }
        this.setSliderDefaults();
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
                                    {SLIDER_NAMES.contrast}
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
                                        onInput={this.handleSliderInput}
                                        onDblClick={this.setSlider.bind(this, 'contrast', DEFAULT_CONTRAST)}
                                    />
                                </div>
                            </li>
                            <li>
                                <div>
                                    {SLIDER_NAMES.hue}
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
                                        onInput={this.handleSliderInput}
                                        onDblClick={this.setSlider.bind(this, 'hue', DEFAULT_HUE)}
                                    />
                                </div>
                            </li>
                            <li>
                                <div>
                                    {SLIDER_NAMES.saturation}
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
                                        onInput={this.handleSliderInput}
                                        onDblClick={this.setSlider.bind(this, 'saturation', DEFAULT_SATURATION)}
                                    />
                                </div>
                            </li>
                            <li>
                                <div>
                                    {SLIDER_NAMES.brightness}
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
                                        onInput={this.handleSliderInput}
                                        onDblClick={this.setSlider.bind(this, 'brightness', DEFAULT_BRIGHTNESS)}
                                    />
                                </div>
                            </li>
                            <li class="enhanced-image-settings-list-button" onClick={this.saveImage}>
                                Save Image
                            </li>
                            <li class="enhanced-image-settings-list-button" onClick={this.resetDefaultAll}>
                                Reset to Default
                            </li>
                        </ul>
                    </div>
                </div>
            );
        }
    }
}
