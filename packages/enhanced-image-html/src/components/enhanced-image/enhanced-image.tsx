import { Component, Prop, State, Element, Listen, Watch } from '@stencil/core';

import '@plurid/text-select-image-html';

import {
    SLIDER_DEFAULTS,
    FULLSCREEN_STYLES,
} from '../../utils/defaults';
import { styleStringToObject } from '../../utils/styleString';



const foodText = {
    "id": "tsi-image-b634e1b7-a46c-443f-8b9d-02bc2745a768",
    "imageText": [
        {
            "id": "tsi-text-c2eec1b1-bc3d-451c-bbb0-7c5bad18286e",
            "xPercentage": 0,
            "yPercentage": 0,
            "xCoord": 203,
            "yCoord": 155,
            "perspective": "",
            "rotation": "",
            "skew": "",
            "color": "red",
            "fontFamily": "Arial",
            "fontSize": 32,
            "bold": true,
            "italic": false,
            "letterSpacing": 1.4,
            "lineHeight": "auto",
            "wordSpacing": 0,
            "content": "eat.yourvegetables.com",
            "link": true,
            "linkTo": "https://github.com/plurid/text-select-image",
            "viewable": false
        },
        {
            "id": "tsi-text-cfef2e11-4e65-40fe-980a-7136046a9fb0",
            "xPercentage": 0,
            "yPercentage": 0,
            "xCoord": 230,
            "yCoord": 268,
            "perspective": "",
            "rotation": "",
            "skew": "",
            "color": "black",
            "fontFamily": "Arial",
            "fontSize": 35,
            "bold": true,
            "italic": false,
            "letterSpacing": -0.5,
            "lineHeight": "auto",
            "wordSpacing": 2.8,
            "content": "Eat your vegetables!",
            "link": false,
            "linkTo": "",
            "viewable": false
        }
    ]
}



@Component({
    tag: 'enhanced-image',
    styleUrl: 'enhanced-image.css',
    shadow: true,
})
export class EnhancedImage {
    @Element() element: HTMLElement;
    textSelectImage!: HTMLTextSelectImageElement;

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
    @Prop({ mutable: true, reflectToAttr: true }) noAbout: boolean;
    @Prop({ mutable: true, reflectToAttr: true }) icon: string;

    @State() toggledSettings: boolean = false;
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


    invertColors = () => {
        this.invertValue = this.invertValue === 1 ? 0 : 1;
        // if (this.invertValue === 1) {
        //     this.invertValue = 0;
        // } else {
        //     this.invertValue = 1;
        // }
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

    toggleSettings = () => {
        this.toggledSettings = !this.toggledSettings;
    }


    renderImage = () => {
        if (this.textSelect) {
            return (
                <text-select-image
                    src={this.src}
                    alt={this.alt || ''}
                    styleImage={{
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
                    textData={foodText}
                    ref={(el) => this.textSelectImage = el as HTMLTextSelectImageElement}
                />
            );
        }

        return (
            <img
                src={this.src}
                alt={this.alt || ''}
                class="enhanced-image"
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
            />
        );
    }

    render() {
        return (
            <div
                style={{...this.styled, ...this.fullscreenStyles}}
                class={`enhanced-image-container ${this.classes ? this.classes : '' }`}
            >
                <enhanced-image-settings
                    element={this.element}
                    class={`enhanced-image-settings enhanced-image-settings-${this.location}`}
                    src={this.src}
                    toggleSettings={this.toggleSettings}
                    toggledSettings={this.toggledSettings}
                    textSelectImage={this.textSelectImage}
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
                    noAbout={this.noAbout}
                    icon={this.icon}
                />

                {this.renderImage()}
            </div>
        );
    }
}
