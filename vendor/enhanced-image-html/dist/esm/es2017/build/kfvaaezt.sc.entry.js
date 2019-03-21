import { h } from '../enhanced-image-html.core.js';

import { a as SLIDER_DEFAULTS, b as FULLSCREEN_STYLES } from './chunk-3135fd79.js';

const getObjectKey = (str) => {
    let key = str.trim();
    key = key.replace(/-([a-z])/g, (g) => { return g[1].toUpperCase(); });
    return key;
};
const getObjectValue = (str) => {
    return str.trim();
};
const styleStringToObject = (styleString) => {
    const style = {};
    const styleRules = styleString.split(';');
    for (let i = 0; i < styleRules.length - 1; i++) {
        let key = getObjectKey(styleRules[i].split(':')[0]);
        let val = getObjectValue(styleRules[i].split(':')[1]);
        style[key] = val;
    }
    return style;
};

class EnhancedImage {
    constructor() {
        this.invertValue = SLIDER_DEFAULTS.invert;
        this.contrastValue = SLIDER_DEFAULTS.contrast;
        this.hueValue = SLIDER_DEFAULTS.hue;
        this.saturationValue = SLIDER_DEFAULTS.saturation;
        this.brightnessValue = SLIDER_DEFAULTS.brightness;
        this.fullscreenToggled = false;
        this.fullscreenStyles = {};
        this.location = 'topright';
        this.invertColors = () => {
            if (this.invertValue == 1) {
                this.invertValue = 0;
            }
            else {
                this.invertValue = 1;
            }
        };
        this.setSliderValue = (name, value) => {
            const sliderValue = `${name}Value`;
            this[sliderValue] = value;
        };
        this.fullscreen = () => {
            if (!this.fullscreenToggled) {
                this.element.requestFullscreen();
                this.fullscreenStyles = FULLSCREEN_STYLES;
            }
            else {
                document.exitFullscreen();
                this.fullscreenStyles = {};
            }
            this.fullscreenToggled = !this.fullscreenToggled;
        };
        this.setLocation = (location) => {
            this.location = location;
        };
    }
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
    invertWatch(newValue) {
        this.invert = newValue;
        this.invertValue = parseInt(newValue);
    }
    contrastWatch(newValue) {
        this.contrast = newValue;
        this.contrastValue = parseInt(newValue);
    }
    hueWatch(newValue) {
        this.hue = newValue;
        this.hueValue = parseInt(newValue);
    }
    saturationWatch(newValue) {
        this.saturation = newValue;
        this.saturationValue = parseInt(newValue);
    }
    lightnessWatch(newValue) {
        this.lightness = newValue;
        this.brightnessValue = parseInt(newValue);
    }
    settingsPositionWatch(newValue) {
        this.settingsPosition = newValue;
        this.location = newValue;
    }
    exitFullscreenHandler() {
        if (!document.webkitIsFullScreen) {
            this.fullscreenStyles = {};
            this.fullscreenToggled = false;
        }
    }
    render() {
        return (h("div", { style: Object.assign({}, this.styled, this.fullscreenStyles), class: `enhanced-image-container ${this.classes ? this.classes : ''}` },
            h("enhanced-image-settings", { class: `enhanced-image-settings enhanced-image-settings-${this.location}`, src: this.src, invertColors: this.invertColors, setSliderValue: this.setSliderValue, fullscreen: this.fullscreen, fullscreenToggled: this.fullscreenToggled, invert: this.invertValue, contrast: this.contrastValue, hue: this.hueValue, saturation: this.saturationValue, brightness: this.brightnessValue, location: this.location, setLocation: this.setLocation, textSelect: this.textSelect }),
            h("img", { src: this.src, style: {
                    filter: `
                            invert(${this.invertValue})
                            contrast(${this.contrastValue}%)
                            hue-rotate(${this.hueValue}deg)
                            saturate(${this.saturationValue}%)
                            brightness(${this.brightnessValue}%)
                        `,
                    height: `${this.height ? this.height + 'px' : null}`,
                    width: `${this.width ? this.width + 'px' : null}`
                }, alt: this.alt ? this.alt : '', class: "enhanced-image" })));
    }
    static get is() { return "enhanced-image"; }
    static get properties() { return {
        "alt": {
            "type": String,
            "attr": "alt"
        },
        "brightnessValue": {
            "state": true
        },
        "classes": {
            "type": String,
            "attr": "classes"
        },
        "contrast": {
            "type": String,
            "attr": "contrast",
            "reflectToAttr": true,
            "mutable": true,
            "watchCallbacks": ["contrastWatch"]
        },
        "contrastValue": {
            "state": true
        },
        "element": {
            "elementRef": true
        },
        "fullscreenStyles": {
            "state": true
        },
        "fullscreenToggled": {
            "state": true
        },
        "height": {
            "type": String,
            "attr": "height"
        },
        "hue": {
            "type": String,
            "attr": "hue",
            "reflectToAttr": true,
            "mutable": true,
            "watchCallbacks": ["hueWatch"]
        },
        "hueValue": {
            "state": true
        },
        "invert": {
            "type": String,
            "attr": "invert",
            "reflectToAttr": true,
            "mutable": true,
            "watchCallbacks": ["invertWatch"]
        },
        "invertValue": {
            "state": true
        },
        "lightness": {
            "type": String,
            "attr": "lightness",
            "reflectToAttr": true,
            "mutable": true,
            "watchCallbacks": ["lightnessWatch"]
        },
        "location": {
            "state": true
        },
        "saturation": {
            "type": String,
            "attr": "saturation",
            "reflectToAttr": true,
            "mutable": true,
            "watchCallbacks": ["saturationWatch"]
        },
        "saturationValue": {
            "state": true
        },
        "settingsPosition": {
            "type": String,
            "attr": "settings-position",
            "reflectToAttr": true,
            "mutable": true,
            "watchCallbacks": ["settingsPositionWatch"]
        },
        "src": {
            "type": String,
            "attr": "src"
        },
        "styled": {
            "state": true
        },
        "styling": {
            "type": String,
            "attr": "styling"
        },
        "textSelect": {
            "type": Boolean,
            "attr": "text-select",
            "reflectToAttr": true,
            "mutable": true
        },
        "width": {
            "type": String,
            "attr": "width"
        }
    }; }
    static get listeners() { return [{
            "name": "window:fullscreenchange",
            "method": "exitFullscreenHandler"
        }]; }
    static get style() { return ".enhanced-image-container{position:relative}.enhanced-image-container:-webkit-full-screen{min-height:100%!important;height:100%!important}.enhanced-image{width:100%}.enhanced-image-settings{position:absolute;display:none;z-index:9999}.enhanced-image-settings-topright{right:20px;top:20px}.enhanced-image-settings-topleft{top:20px;left:20px}.enhanced-image-settings-bottomleft{bottom:20px;left:20px}.enhanced-image-settings-bottomright{bottom:20px;right:20px}.enhanced-image-container:hover .enhanced-image-settings{display:block}"; }
}

export { EnhancedImage };
