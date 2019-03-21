import { SLIDER_DEFAULTS, SLIDER_ITEM_DEFAULTS, } from '../../utils/defaults';
import { sliders } from '../../data/sliders';
import fullscreenIcon from '../../assets/fullscreen-icon.svg';
import saveIcon from '../../assets/save-icon.svg';
import resetIcon from '../../assets/reset-icon.svg';
import aboutIcon from '../../assets/about-icon.svg';
import bottomleftIcon from '../../assets/bottomleft-icon.svg';
import bottomrightIcon from '../../assets/bottomright-icon.svg';
import topleftIcon from '../../assets/topleft-icon.svg';
import toprightIcon from '../../assets/topright-icon.svg';
export class EnhancedImageSettingsList {
    constructor() {
        this.setSliderDefaults = () => {
            this.setSlider('contrast', SLIDER_DEFAULTS.contrast);
            this.setSlider('hue', SLIDER_DEFAULTS.hue);
            this.setSlider('saturation', SLIDER_DEFAULTS.saturation);
            this.setSlider('brightness', SLIDER_DEFAULTS.brightness);
        };
        this.download = (image, imageName) => {
            this.saveButton.href = URL.createObjectURL(image);
            ;
            this.saveButton.download = imageName;
        };
        this.resetToDefaults = () => {
            if (this.colorsInverted) {
                this.colorsInvert();
            }
            this.setSliderDefaults();
        };
        this.aboutEnhancedImage = () => {
            const aboutURL = "https://github.com/plurid/enhanced-image-html";
            window.open(aboutURL, '_blank');
        };
    }
    render() {
        console.log(this.textSelect);
        return (h("div", { class: `enhanced-image-settings-list enhanced-image-settings-list-${this.location}` },
            h("ul", null,
                this.textSelect && (h("li", null,
                    h("enhanced-image-button-checkmark", { toggle: this.colorsInvert, text: 'Text Select', checked: this.colorsInverted }))),
                this.textSelect && (h("hr", { class: "enhanced-image-hr" })),
                h("li", null,
                    h("enhanced-image-button-checkmark", { toggle: this.colorsInvert, text: 'Invert Colors', checked: this.colorsInverted })),
                sliders.map(slider => {
                    const sliderValue = `${slider.type}SliderValue`;
                    return (h("li", null,
                        h("enhanced-image-slider-item", { type: slider.type, min: slider.min || SLIDER_ITEM_DEFAULTS.min, max: slider.max || SLIDER_ITEM_DEFAULTS.max, valueSign: slider.valueSign || SLIDER_ITEM_DEFAULTS.valueSign, sliderValue: this[sliderValue], handleSliderInput: this.handleSliderInput, setSlider: this.setSlider })));
                }),
                h("li", null,
                    h("enhanced-image-button-item", { atClick: this.resetToDefaults, icon: resetIcon, text: 'Reset to Defaults' })),
                h("hr", { class: "enhanced-image-hr" }),
                h("li", null,
                    h("enhanced-image-button-item", { atClick: this.fullscreen, icon: fullscreenIcon, text: this.fullscreenToggled ? 'Exit Fullscreen' : 'View Fullscreen' })),
                h("li", { onMouseEnter: this.saveImage.bind(this, this.download) },
                    h("a", { ref: (el) => this.saveButton = el },
                        h("enhanced-image-button-item", { atClick: () => { }, icon: saveIcon, text: 'Save Image' }))),
                h("li", { class: "enhanced-image-button-default enhanced-image-location" },
                    h("span", null, "Location"),
                    h("span", { class: "enhanced-image-location-spans" },
                        h("span", { class: `enhanced-image-location-span ${this.location === 'topleft' ? 'enhanced-image-location-span-active' : ''}`, innerHTML: topleftIcon, onClick: this.setLocation.bind(this, 'topleft') }),
                        h("span", { class: `enhanced-image-location-span ${this.location === 'topright' ? 'enhanced-image-location-span-active' : ''}`, innerHTML: toprightIcon, onClick: this.setLocation.bind(this, 'topright') }),
                        h("span", { class: `enhanced-image-location-span ${this.location === 'bottomleft' ? 'enhanced-image-location-span-active' : ''}`, innerHTML: bottomleftIcon, onClick: this.setLocation.bind(this, 'bottomleft') }),
                        h("span", { class: `enhanced-image-location-span ${this.location === 'bottomright' ? 'enhanced-image-location-span-active' : ''}`, innerHTML: bottomrightIcon, onClick: this.setLocation.bind(this, 'bottomright') }))),
                h("hr", { class: "enhanced-image-hr" }),
                h("li", null,
                    h("enhanced-image-button-item", { atClick: this.aboutEnhancedImage, icon: aboutIcon, text: 'About Enhanced Image' })))));
    }
    static get is() { return "enhanced-image-settings-list"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "brightnessSliderValue": {
            "type": "Any",
            "attr": "brightness-slider-value"
        },
        "colorsInvert": {
            "type": "Any",
            "attr": "colors-invert"
        },
        "colorsInverted": {
            "type": "Any",
            "attr": "colors-inverted"
        },
        "contrastSliderValue": {
            "type": "Any",
            "attr": "contrast-slider-value"
        },
        "fullscreen": {
            "type": "Any",
            "attr": "fullscreen"
        },
        "fullscreenToggled": {
            "type": "Any",
            "attr": "fullscreen-toggled"
        },
        "handleSliderInput": {
            "type": "Any",
            "attr": "handle-slider-input"
        },
        "hueSliderValue": {
            "type": "Any",
            "attr": "hue-slider-value"
        },
        "invertColors": {
            "type": "Any",
            "attr": "invert-colors"
        },
        "location": {
            "type": String,
            "attr": "location"
        },
        "saturationSliderValue": {
            "type": "Any",
            "attr": "saturation-slider-value"
        },
        "saveImage": {
            "type": "Any",
            "attr": "save-image"
        },
        "setLocation": {
            "type": "Any",
            "attr": "set-location"
        },
        "setSlider": {
            "type": "Any",
            "attr": "set-slider"
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
        }
    }; }
    static get style() { return "/**style-placeholder:enhanced-image-settings-list:**/"; }
}
