import { h } from '../enhanced-image-html.core.js';

import { a as SLIDER_DEFAULTS } from './chunk-3135fd79.js';

const loadImage = (url) => {
    return new Promise(response => {
        let image = new Image();
        image.onload = (() => response(image));
        image.src = url;
    });
};
const dataURIToBlob = (dataURI) => {
    const binStr = atob(dataURI.split(',')[1]);
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
    }
    return new Blob([arr]);
};

class EnhancedImageSettings {
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
    static get style() { return ".enhanced-image-settings-container.sc-enhanced-image-settings{display:grid;-ms-flex-align:center;align-items:center}.enhanced-image-settings-container-topright.sc-enhanced-image-settings{justify-items:right}.enhanced-image-settings-container-topleft.sc-enhanced-image-settings{justify-items:left}.enhanced-image-settings-container-bottomright.sc-enhanced-image-settings{justify-items:right}.enhanced-image-settings-container-bottomright.sc-enhanced-image-settings   enhanced-image-settings-button.sc-enhanced-image-settings{grid-row:2}.enhanced-image-settings-container-bottomleft.sc-enhanced-image-settings{justify-items:left}.enhanced-image-settings-container-bottomleft.sc-enhanced-image-settings   enhanced-image-settings-button.sc-enhanced-image-settings{grid-row:2}"; }
}

var settingsIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 930 930">
  <defs>
    <style>
      .cls-1 {
        fill: #2c2c2d;
      }

      .cls-2 {
        fill: #fff;
      }

      .cls-3 {
        fill: #252626;
      }
    </style>
  </defs>
  <title>Enhanced Image</title>
  <g id="Layer_2" data-name="Layer 2">
    <g id="Icon-Toggle">
      <g>
        <rect class="cls-1" width="930" height="930" rx="85.35"/>
        <rect class="cls-2" x="140.21" y="222.58" width="650.76" height="35.3" rx="15"/>
        <rect class="cls-2" x="140.21" y="444.99" width="650.76" height="35.3" rx="15"/>
        <rect class="cls-2" x="140.21" y="672.11" width="650.76" height="35.3" rx="15"/>
        <g>
          <circle class="cls-3" cx="647.99" cy="240.82" r="85.61"/>
          <path class="cls-2" d="M648,170.21a70.62,70.62,0,1,1-70.62,70.61A70.69,70.69,0,0,1,648,170.21m0-30A100.62,100.62,0,1,0,748.6,240.82,100.62,100.62,0,0,0,648,140.21Z"/>
        </g>
        <g>
          <circle class="cls-3" cx="313.78" cy="460.88" r="85.61"/>
          <path class="cls-2" d="M313.78,390.27a70.62,70.62,0,1,1-70.61,70.61,70.69,70.69,0,0,1,70.61-70.61m0-30A100.62,100.62,0,1,0,414.4,460.88,100.61,100.61,0,0,0,313.78,360.27Z"/>
        </g>
        <g>
          <circle class="cls-3" cx="546.79" cy="690.35" r="85.61"/>
          <path class="cls-2" d="M546.79,619.74a70.62,70.62,0,1,1-70.62,70.61,70.7,70.7,0,0,1,70.62-70.61m0-30A100.62,100.62,0,1,0,647.4,690.35,100.62,100.62,0,0,0,546.79,589.74Z"/>
        </g>
      </g>
    </g>
  </g>
</svg>
`;

class EnhancedImageSettings$1 {
    render() {
        return (h("div", { onClick: this.toggle, class: "enhanced-image-settings-button", innerHTML: settingsIcon }));
    }
    static get is() { return "enhanced-image-settings-button"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "toggle": {
            "type": "Any",
            "attr": "toggle"
        }
    }; }
    static get style() { return ".enhanced-image-settings-button.sc-enhanced-image-settings-button{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;height:30px;width:30px}.enhanced-image-settings-button.sc-enhanced-image-settings-button   svg.sc-enhanced-image-settings-button{height:30px;width:30px;-webkit-filter:drop-shadow(0 0 3px #323334);filter:drop-shadow(0 0 3px hsl(220,2%,20%))}"; }
}

export { EnhancedImageSettings, EnhancedImageSettings$1 as EnhancedImageSettingsButton };
