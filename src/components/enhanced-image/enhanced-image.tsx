import { Component, Prop, State, Element, Listen } from '@stencil/core';

import {
    SLIDER_DEFAULTS,
    FULLSCREEN_STYLES,
} from '../../utils/defaults';
import { styleStringToObject } from '../../utils/styleString';




@Component({
    tag: 'enhanced-image',
    styleUrl: 'enhanced-image.css',
    shadow: true
})
export class EnhancedImage {
    @Element() element: HTMLElement;

    @Prop() src: string;
    @Prop() styling: string;

    @Prop() invert: string;
    @Prop() contrast: string;
    @Prop() hue: string;
    @Prop() saturation: string;
    @Prop() lightness: string;
    // @Prop() settingsPosition: string;


    @State() invertValue: number = SLIDER_DEFAULTS.invert;
    @State() contrastValue: number = SLIDER_DEFAULTS.contrast;
    @State() hueValue: number = SLIDER_DEFAULTS.hue;
    @State() saturationValue: number = SLIDER_DEFAULTS.saturation;
    @State() brightnessValue: number = SLIDER_DEFAULTS.brightness;
    @State() fullscreenToggled: boolean = false;
    @State() fullscreenStyles: object = {};

    private styled: any;

    componentWillLoad() {
        this.styled = this.styling ? styleStringToObject(this.styling) : {};

        this.invert ? this.invertValue = parseInt(this.invert) : null;
        this.contrast ? this.contrastValue = parseInt(this.contrast) : null;
        this.hue ? this.hueValue = parseInt(this.hue) : null;
        this.saturation ? this.saturationValue = parseInt(this.saturation) : null;
        this.lightness ? this.brightnessValue = parseInt(this.lightness) : null;
    }

    /**
     *
     */
    invertColors = () => {
        if ( this.invertValue == 1 ) {
            this.invertValue = 0;
        } else {
            this.invertValue = 1;
        }
    }

    /**
     *
     */
    setSliderValue = (name: string, value: number) => {
        const sliderValue = `${name}Value`;
        this[sliderValue] = value;
    }

    @Listen('window:fullscreenchange')
    exitFullscreenHandler() {
        if (!(document as any).webkitIsFullScreen) {
            this.fullscreenStyles = {};
            this.fullscreenToggled = false;
        }
    }

    fullscreen = () => {
        if (!this.fullscreenToggled) {
            this.element.requestFullscreen();
            this.fullscreenStyles = FULLSCREEN_STYLES;
        } else {
            document.exitFullscreen();
            this.fullscreenStyles = {};
        }
        this.fullscreenToggled = !this.fullscreenToggled;
    }

    render() {
        return (
            <div style={ {...this.styled, ...this.fullscreenStyles} } class="enhanced-image-container">
                <enhanced-image-settings
                    class="enhanced-image-settings-button"
                    src={this.src}
                    invertColors={this.invertColors}
                    setSliderValue={this.setSliderValue}
                    fullscreen={this.fullscreen}
                    fullscreenToggled={this.fullscreenToggled}
                    invert={this.invertValue}
                    contrast={this.contrastValue}
                    hue={this.hueValue}
                    saturation={this.saturationValue}
                    brightness={this.brightnessValue}
                />
                <img src={this.src}
                    style={{
                        filter: `
                            invert(${this.invertValue})
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
