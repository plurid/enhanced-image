import { SLIDER_DEFAULTS } from '../../utils/defaults';
import { loadImage, dataURIToBlob } from '../../utils/image';
export class EnhancedImageSettings {
    constructor() {
        this.toggledSettings = false;
        this.colorsInverted = false;
        this.contrastSliderValue = SLIDER_DEFAULTS.contrast;
        this.hueSliderValue = SLIDER_DEFAULTS.hue;
        this.saturationSliderValue = SLIDER_DEFAULTS.saturation;
        this.brightnessSliderValue = SLIDER_DEFAULTS.brightness;
        this.toggleSettings = () => {
            this.toggledSettings = !this.toggledSettings;
        };
        this.colorsInvert = () => {
            this.invertColors();
            this.colorsInverted = !this.colorsInverted;
        };
        this.handleSliderInput = (event) => {
            const name = event.target.name;
            const value = event.target.value;
            this.setSlider(name, value);
        };
        this.saveImage = async (download) => {
            const imageName = this.src;
            const image = await loadImage(this.src);
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
        };
        this.setSlider = (name, value) => {
            const sliderValue = `${name}SliderValue`;
            this.setSliderValue(name, value);
            this[sliderValue] = value;
        };
    }
    componentWillUpdate() {
        this.colorsInverted = !!this.invert;
        this.contrastSliderValue = this.contrast;
        this.hueSliderValue = this.hue;
        this.saturationSliderValue = this.saturation;
        this.brightnessSliderValue = this.brightness;
    }
    render() {
        return (h("div", { class: `enhanced-image-settings-container enhanced-image-settings-container-${this.location}` },
            h("enhanced-image-settings-button", { toggle: this.toggleSettings }),
            this.toggledSettings && (h("enhanced-image-settings-list", { colorsInvert: this.colorsInvert, colorsInverted: this.colorsInverted, contrastSliderValue: this.contrastSliderValue, hueSliderValue: this.hueSliderValue, saturationSliderValue: this.saturationSliderValue, brightnessSliderValue: this.brightnessSliderValue, handleSliderInput: this.handleSliderInput, setSlider: this.setSlider, fullscreen: this.fullscreen, fullscreenToggled: this.fullscreenToggled, saveImage: this.saveImage, location: this.location, setLocation: this.setLocation, textSelect: this.textSelect }))));
    }
    static get is() { return "enhanced-image-settings"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "brightness": {
            "type": Number,
            "attr": "brightness"
        },
        "brightnessSliderValue": {
            "state": true
        },
        "colorsInverted": {
            "state": true
        },
        "contrast": {
            "type": Number,
            "attr": "contrast"
        },
        "contrastSliderValue": {
            "state": true
        },
        "fullscreen": {
            "type": "Any",
            "attr": "fullscreen"
        },
        "fullscreenToggled": {
            "type": Boolean,
            "attr": "fullscreen-toggled"
        },
        "hue": {
            "type": Number,
            "attr": "hue"
        },
        "hueSliderValue": {
            "state": true
        },
        "invert": {
            "type": Number,
            "attr": "invert"
        },
        "invertColors": {
            "type": "Any",
            "attr": "invert-colors"
        },
        "location": {
            "type": String,
            "attr": "location"
        },
        "saturation": {
            "type": Number,
            "attr": "saturation"
        },
        "saturationSliderValue": {
            "state": true
        },
        "setLocation": {
            "type": "Any",
            "attr": "set-location"
        },
        "setSliderValue": {
            "type": "Any",
            "attr": "set-slider-value"
        },
        "src": {
            "type": String,
            "attr": "src"
        },
        "textSelect": {
            "type": Boolean,
            "attr": "text-select"
        },
        "toggledSettings": {
            "state": true
        }
    }; }
    static get style() { return "/**style-placeholder:enhanced-image-settings:**/"; }
}
