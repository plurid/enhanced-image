import { Component, Prop, State } from '@stencil/core';

import { SLIDER_DEFAULTS } from '../../utils/defaults';
import { loadImage, dataURIToBlob } from '../../utils/image';



@Component({
    tag: 'enhanced-image-settings',
    styleUrl: 'enhanced-image-settings.css',
    shadow: true
})
export class EnhancedImageSettings {
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

    @Prop() location: string;
    @Prop() setLocation: (location: string) => void;

    @Prop() fullscreen: any;
    @Prop() fullscreenToggled: boolean;

    @Prop() invert: number;
    @Prop() contrast: number;
    @Prop() hue: number;
    @Prop() saturation: number;
    @Prop() brightness: number;

    @State() toggledSettings: boolean = false;
    @State() colorsInverted: boolean = false;
    @State() contrastSliderValue: number = SLIDER_DEFAULTS.contrast;
    @State() hueSliderValue: number = SLIDER_DEFAULTS.hue;
    @State() saturationSliderValue: number = SLIDER_DEFAULTS.saturation;
    @State() brightnessSliderValue: number = SLIDER_DEFAULTS.brightness;

    componentWillUpdate() {
        this.colorsInverted = !!this.invert;
        this.contrastSliderValue = this.contrast;
        this.hueSliderValue = this.hue;
        this.saturationSliderValue = this.saturation;
        this.brightnessSliderValue = this.brightness;
    }

    toggleSettings = () => {
        this.toggledSettings = !this.toggledSettings;
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
        context.drawImage(image, 10, 10, width, height);
        const imageData = canvas.toDataURL("image/png");
        const blob = dataURIToBlob(imageData);
        download(blob, imageName);
    }

    setSlider = (name: string, value: number) => {
        const sliderValue = `${name}SliderValue`;
        this.setSliderValue(name, value);
        this[sliderValue] = value;
    }

    render() {
        return (
            <div class={`enhanced-image-settings-container enhanced-image-settings-container-${this.location}`}>
                <enhanced-image-settings-button toggle={this.toggleSettings} />
                {this.toggledSettings && (
                    <enhanced-image-settings-list
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
                    />
                )}
            </div>
        );
    }
}
