import { Component, Prop, State, Element, Listen, Watch } from '@stencil/core';

import {
    SLIDER_DEFAULTS,
    FULLSCREEN_STYLES,
} from '../../utils/defaults';
import { styleStringToObject } from '../../utils/styleString';



@Component({
    tag: 'enhanced-image',
    styleUrl: 'enhanced-image.css',
    shadow: false
})
export class EnhancedImage {
    @Element() element: HTMLElement;

    @Prop() src: string;
    @Prop() alt: string;
    @Prop() height: string;
    @Prop() width: string;
    @Prop() classes: string;
    @Prop() styling: string;

    @Prop({ mutable: true, reflectToAttr: true }) invert: string;
    @Prop({ mutable: true, reflectToAttr: true }) contrast: string;
    @Prop({ mutable: true, reflectToAttr: true }) hue: string;
    @Prop({ mutable: true, reflectToAttr: true }) saturation: string;
    @Prop({ mutable: true, reflectToAttr: true }) lightness: string;
    @Prop({ mutable: true, reflectToAttr: true }) settingsPosition: string;
    @Prop({ mutable: true, reflectToAttr: true }) textSelect: boolean;


    @State() invertValue: number = SLIDER_DEFAULTS.invert;
    @State() contrastValue: number = SLIDER_DEFAULTS.contrast;
    @State() hueValue: number = SLIDER_DEFAULTS.hue;
    @State() saturationValue: number = SLIDER_DEFAULTS.saturation;
    @State() brightnessValue: number = SLIDER_DEFAULTS.brightness;
    @State() fullscreenToggled: boolean = false;
    @State() fullscreenStyles: object = {};
    @State() location: string = 'topright';
    @State() styled: any;


    componentWillLoad() {
        this.styled = this.styling ? styleStringToObject(this.styling) : {};
        this.location = this.settingsPosition ? this.settingsPosition : 'topright';

        this.invert ? this.invertValue = parseInt(this.invert) : null;
        this.contrast ? this.contrastValue = parseInt(this.contrast) : null;
        this.hue ? this.hueValue = parseInt(this.hue) : null;
        this.saturation ? this.saturationValue = parseInt(this.saturation) : null;
        this.lightness ? this.brightnessValue = parseInt(this.lightness) : null;
    }

    componentWillUpdate() {
        this.invert = this.invertValue + '';
        this.contrast = this.contrastValue + '';
        this.hue = this.hueValue + '';
        this.saturation = this.saturationValue + '';
        this.lightness = this.brightnessValue + '';
        this.settingsPosition = this.location + '';
    }

    @Watch('invert')
    invertWatch(newValue: string) {
        this.invert = newValue;
        this.invertValue = parseInt(newValue);
    }

    @Watch('contrast')
    contrastWatch(newValue: string) {
        this.contrast = newValue;
        this.contrastValue = parseInt(newValue);
    }

    @Watch('hue')
    hueWatch(newValue: string) {
        this.hue = newValue;
        this.hueValue = parseInt(newValue);
    }

    @Watch('saturation')
    saturationWatch(newValue: string) {
        this.saturation = newValue;
        this.saturationValue = parseInt(newValue);
    }

    @Watch('lightness')
    lightnessWatch(newValue: string) {
        this.lightness = newValue;
        this.brightnessValue = parseInt(newValue);
    }

    @Watch('settingsPosition')
    settingsPositionWatch(newValue: string) {
        this.settingsPosition = newValue;
        this.location = newValue;
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

    setLocation = (location: string) => {
        this.location = location;
    }

    render() {
        return (
            <div
                style={ {...this.styled, ...this.fullscreenStyles} }
                class={ `enhanced-image-container ${this.classes ? this.classes : '' }`}
            >
                <enhanced-image-settings
                    class={`enhanced-image-settings enhanced-image-settings-${this.location}`}
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
                    location={this.location}
                    setLocation={this.setLocation}
                    textSelect={this.textSelect}
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
                        height: `${this.height ? this.height + 'px' : null}`,
                        width: `${this.width ? this.width + 'px' : null}`
                    }}
                    alt={this.alt ? this.alt : ''}
                    class="enhanced-image"
                />
            </div>
        );
    }
}
