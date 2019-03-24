import { Component, Prop, State, Element, Listen, Watch } from '@stencil/core';

import 'text-select-image-html';

import {
    SLIDER_DEFAULTS,
    FULLSCREEN_STYLES,
} from '../../utils/defaults';
import { styleStringToObject } from '../../utils/styleString';

const foodText = {
    id: "tsi-image-b634e1b7-a46c-443f-8b9d-02bc2745a768",
    imageText: [
        {
            "id": "tsi-text-c2eec1b1-bc3d-451c-bbb0-7c5bad18286e",
            "xPercentage": 0,
            "yPercentage": 0,
            "xCoord": 17,
            "yCoord": 189,
            "perspective": "",
            "rotation": "",
            "skew": "",
            "color": "red",
            "fontFamily": "Arial",
            "fontSize": 28,
            "bold": false,
            "italic": false,
            "letterSpacing": 0,
            "lineHeight": "auto",
            "wordSpacing": 0,
            "content": "Text sample Arial"
        },
        {
            "id": "tsi-text-cfef2e11-4e65-40fe-980a-7136046a9fb0",
            "xPercentage": 0,
            "yPercentage": 0,
            "xCoord": 145,
            "yCoord": 257,
            "perspective": "",
            "rotation": "",
            "skew": "",
            "color": "black",
            "fontFamily": "Verdana",
            "fontSize": 38,
            "bold": false,
            "italic": false,
            "letterSpacing": -1,
            "lineHeight": "auto",
            "wordSpacing": 6,
            "content": "Text Sample Verdana"
        },
        {
            "id": "tsi-text-4f635939-c1ee-4bc2-9de3-f92f16e3c025",
            "xPercentage": 0,
            "yPercentage": 0,
            "xCoord": 421.5,
            "yCoord": 357,
            "perspective": "",
            "rotation": "",
            "skew": "",
            "color": "black",
            "fontFamily": "Georgia",
            "fontSize": 24,
            "bold": false,
            "italic": false,
            "letterSpacing": 0,
            "lineHeight": "auto",
            "wordSpacing": 1.5,
            "content": "Text Sample Georgia"
        }
    ]
}



@Component({
    tag: 'enhanced-image',
    styleUrl: 'enhanced-image.css',
    shadow: true
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

    @State() toggledTextSelect: boolean = false;
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

    toggleTextSelect = () => {
        this.toggledTextSelect = !this.toggledTextSelect;
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
                >
                </text-select-image>
            )
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
                style={ {...this.styled, ...this.fullscreenStyles} }
                class={ `enhanced-image-container ${this.classes ? this.classes : '' }`}
            >
                <enhanced-image-settings
                    element={this.element}
                    class={`enhanced-image-settings enhanced-image-settings-${this.location}`}
                    src={this.src}
                    textSelectImage={this.textSelectImage}
                    toggleTextSelect={this.toggleTextSelect}
                    toggledTextSelect={this.toggledTextSelect}
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
