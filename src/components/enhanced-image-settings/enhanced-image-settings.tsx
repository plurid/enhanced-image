import { Component, Prop, State } from '@stencil/core';

import { SLIDER_DEFAULTS } from '../../utils/defaults';
import { loadImage, dataURIToBlob } from '../../utils/image';



@Component({
    tag: 'enhanced-image-settings',
    styleUrl: 'enhanced-image-settings.css',
    shadow: true
})
export class EnhancedImageSettings {
    @Prop() element: any;
    @Prop() src: string;
    @Prop() editTextSelect: () => void;
    @Prop() textSelectImage: HTMLTextSelectImageElement;
    @Prop() toggleSettings: () => void;
    @Prop() toggledSettings: boolean;
    @Prop() invertColors: any;
    @Prop() setSliderValue: any;
    @Prop() location: string;
    @Prop() setLocation: (location: string) => void;
    @Prop() textSelect: boolean;
    @Prop() noAbout: boolean;
    @Prop() icon: string;
    @Prop() fullscreen: any;
    @Prop() fullscreenToggled: boolean;
    @Prop() invert: number;
    @Prop() contrast: number;
    @Prop() hue: number;
    @Prop() saturation: number;
    @Prop() brightness: number;

    @State() toggledEditText: boolean = false;
    @State() toggledDefaults: boolean = false;
    @State() colorsInverted: boolean = false;
    @State() contrastSliderValue: number = SLIDER_DEFAULTS.contrast;
    @State() hueSliderValue: number = SLIDER_DEFAULTS.hue;
    @State() saturationSliderValue: number = SLIDER_DEFAULTS.saturation;
    @State() brightnessSliderValue: number = SLIDER_DEFAULTS.brightness;
    @State() previousValues = {
        invert: this.colorsInverted,
        contrast: SLIDER_DEFAULTS.contrast,
        hue: SLIDER_DEFAULTS.hue,
        saturation: SLIDER_DEFAULTS.saturation,
        brightness: SLIDER_DEFAULTS.brightness,
    };

    componentWillUpdate() {
        this.colorsInverted = !!this.invert;
        this.contrastSliderValue = this.contrast;
        this.hueSliderValue = this.hue;
        this.saturationSliderValue = this.saturation;
        this.brightnessSliderValue = this.brightness;
    }

    toggleEditText = () => {
        this.toggledEditText = !this.toggledEditText;
        this.textSelectImage.toggleEditable();
    }

    addText = () => {
        this.textSelectImage.addText();
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

    saveImage = async (download: any) => {
        const imageName = this.src;
        const image: any = await loadImage(this.src);
        const { height, width } = image;

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
        context.filter = `
            invert(${this.colorsInverted ? 100 : 0}%)
            contrast(${this.contrastSliderValue}%)
            hue-rotate(${this.hueSliderValue}deg)
            saturate(${this.saturationSliderValue}%)
            brightness(${this.brightnessSliderValue}%)
        `;
        context.drawImage(image, 0, 0, width, height);
        const imageData = canvas.toDataURL("image/png");
        const blob = dataURIToBlob(imageData);
        download(blob, imageName);
    }

    setSlider = (name: string, value: number) => {
        const sliderValue = `${name}SliderValue`;
        this.setSliderValue(name, value);
        this[sliderValue] = value;

        if (value !== SLIDER_DEFAULTS[name]) {
            this.toggledDefaults = false;
        }
    }

    toggleDefaults = () => {
        this.toggledDefaults = !this.toggledDefaults;
        if(this.toggledDefaults) {
            this.previousValues = {
                invert: this.colorsInverted,
                contrast: this.contrastSliderValue,
                hue: this.hueSliderValue,
                saturation: this.saturationSliderValue,
                brightness: this.brightnessSliderValue,
            }
            this.resetToDefaults();
        } else {
            if (this.previousValues.invert) {
                this.colorsInvert();
            }
            this.setSlider('contrast', this.previousValues.contrast);
            this.setSlider('hue', this.previousValues.hue);
            this.setSlider('saturation', this.previousValues.saturation);
            this.setSlider('brightness', this.previousValues.brightness);
        }
    }

    setSliderDefaults = () => {
        this.setSlider('contrast', SLIDER_DEFAULTS.contrast);
        this.setSlider('hue', SLIDER_DEFAULTS.hue);
        this.setSlider('saturation', SLIDER_DEFAULTS.saturation);
        this.setSlider('brightness', SLIDER_DEFAULTS.brightness);
    }

    resetToDefaults = () => {
        if (this.colorsInverted) {
            this.colorsInvert();
        }
        this.setSliderDefaults();
    }


    render() {
        return (
            <div class={`enhanced-image-settings-container enhanced-image-settings-container-${this.location}`}>
                <enhanced-image-settings-button
                    toggle={this.toggleSettings}
                    icon={this.icon}
                />
                {this.toggledSettings && (
                    <enhanced-image-settings-list
                        toggleEditText={this.toggleEditText}
                        toggledEditText={this.toggledEditText}

                        addText={this.addText}

                        colorsInvert={this.colorsInvert}
                        colorsInverted={this.colorsInverted}

                        contrastSliderValue={this.contrastSliderValue}
                        hueSliderValue={this.hueSliderValue}
                        saturationSliderValue={this.saturationSliderValue}
                        brightnessSliderValue={this.brightnessSliderValue}

                        handleSliderInput={this.handleSliderInput}
                        setSlider={this.setSlider}

                        fullscreen={this.fullscreen}
                        fullscreenToggled={this.fullscreenToggled}
                        saveImage={this.saveImage}
                        location={this.location}
                        setLocation={this.setLocation}
                        textSelect={this.textSelect}
                        noAbout={this.noAbout}

                        toggledDefaults={this.toggledDefaults}
                        toggleDefaults={this.toggleDefaults}

                        resetToDefaults={this.resetToDefaults}
                    />
                )}
            </div>
        );
    }
}
