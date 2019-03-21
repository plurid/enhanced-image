import { h } from '../enhanced-image-html.core.js';

import { a as SLIDER_DEFAULTS, c as SLIDER_ITEM_DEFAULTS, d as SLIDER_NAMES } from './chunk-3135fd79.js';

class EnhancedImageButtonCheckmark {
    render() {
        return (h("div", { class: "enhanced-image-button-checkmark", onClick: this.toggle },
            h("span", null, this.text),
            h("span", { class: this.checked
                    ? 'enhanced-image-button-checkbox enhanced-image-button-checkbox-fill'
                    : 'enhanced-image-button-checkbox' })));
    }
    static get is() { return "enhanced-image-button-checkmark"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "checked": {
            "type": Boolean,
            "attr": "checked"
        },
        "text": {
            "type": String,
            "attr": "text"
        },
        "toggle": {
            "type": "Any",
            "attr": "toggle"
        }
    }; }
    static get style() { return ".enhanced-image-button-checkmark.sc-enhanced-image-button-checkmark{cursor:pointer;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;padding:7px 10px}.enhanced-image-button-checkbox.sc-enhanced-image-button-checkmark{display:block;height:10px;width:10px;border-radius:50%;border:2px solid #fff;background-color:#4b4c4e}.enhanced-image-button-checkbox-fill.sc-enhanced-image-button-checkmark{background-color:#fff}"; }
}

class EnhancedImageButtonItem {
    render() {
        return (h("div", { class: "enhanced-image-button-item", onClick: this.atClick },
            h("span", { class: "enhanced-image-button-icon", innerHTML: this.icon }),
            h("span", null, this.text)));
    }
    static get is() { return "enhanced-image-button-item"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "atClick": {
            "type": "Any",
            "attr": "at-click"
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "text": {
            "type": String,
            "attr": "text"
        }
    }; }
    static get style() { return ".enhanced-image-button-item.sc-enhanced-image-button-item{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:7px 10px;cursor:pointer}.enhanced-image-button-icon.sc-enhanced-image-button-item{height:16px;width:16px;margin-right:4px;padding:6px;padding-left:0}.enhanced-image-button-icon.sc-enhanced-image-button-item   svg.sc-enhanced-image-button-item{width:16px}"; }
}

const sliders = [
    {
        type: 'contrast',
        max: 200,
    },
    {
        type: 'hue',
        min: -180,
        max: 180,
        valueSign: '°',
    },
    {
        type: 'saturation',
        max: 200,
    },
    {
        type: 'brightness',
        max: 200,
    },
];

var fullscreenIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 901.71 901.74">
  <defs>
    <style>
      .cls-1 {
        fill: #fff;
      }

      .cls-2 {
        fill: none;
        stroke: #000;
        stroke-miterlimit: 10;
        stroke-width: 2px;
      }
    </style>
  </defs>
  <title>Fullscreen</title>
  <g id="Layer_2" data-name="Layer 2">
    <g id="Icon-Fullscreen">
      <g>
        <g>
          <path class="cls-1" d="M1,585.74H89.7V746.58l231-231,63.58,64.61c-75.76,78.39-152.75,154.12-229.68,231.5H316v89.07H1Z"/>
          <path class="cls-2" d="M1,585.74H89.7V746.58l231-231,63.58,64.61c-75.76,78.39-152.75,154.12-229.68,231.5H316v89.07H1Z"/>
        </g>
        <g>
          <path class="cls-1" d="M581.51,385.61l-64.45-64.46Q632.17,206.06,747.13,91.08l-.63-1.33h-160V1H900.71V315.27H812.3V154.79C735,232.07,658.38,308.72,581.51,385.61Z"/>
          <path class="cls-2" d="M581.51,385.61l-64.45-64.46Q632.17,206.06,747.13,91.08l-.63-1.33h-160V1H900.71V315.27H812.3V154.79C735,232.07,658.38,308.72,581.51,385.61Z"/>
        </g>
      </g>
    </g>
  </g>
</svg>
`;

var saveIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 899 862.41">
  <defs>
    <style>
      .cls-1 {
        fill: #fff;
      }

      .cls-2 {
        fill: none;
        stroke: #000;
        stroke-miterlimit: 10;
        stroke-width: 2px;
      }
    </style>
  </defs>
  <title>Save Image</title>
  <g id="Layer_2" data-name="Layer 2">
    <g id="Icon-Save">
      <g>
        <g>
          <path class="cls-1" d="M455.71,622.23,217.12,317h11.23c48.9-.12,97.8-.51,146.7-.14,9.33.07,11-3.12,11-11.59q-.42-144.95-.22-289.9V1H519.37v9.57c0,98.39.17,196.78-.21,295.18,0,9.33,2.85,11.05,11.37,11,49.78-.38,99.57-.21,149.35-.23h10.37Z"/>
          <path class="cls-2" d="M455.71,622.23,217.12,317h11.23c48.9-.12,97.8-.51,146.7-.14,9.33.07,11-3.12,11-11.59q-.42-144.95-.22-289.9V1H519.37v9.57c0,98.39.17,196.78-.21,295.18,0,9.33,2.85,11.05,11.37,11,49.78-.38,99.57-.21,149.35-.23h10.37Z"/>
        </g>
        <g>
          <polygon class="cls-1" points="1 549.09 1 861.41 897.58 861.41 898 549.09 783 549.09 783 747.09 111 747.09 111 549.09 1 549.09"/>
          <polygon class="cls-2" points="1 549.09 1 861.41 897.58 861.41 898 549.09 783 549.09 783 747.09 111 747.09 111 549.09 1 549.09"/>
        </g>
      </g>
    </g>
  </g>
</svg>
`;

var resetIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 935.06 798">
  <defs>
    <style>
      .cls-1 {
        fill: #fff;
      }

      .cls-2 {
        fill: none;
        stroke: #000;
        stroke-miterlimit: 10;
        stroke-width: 2px;
      }
    </style>
  </defs>
  <title>Reset to Defaults</title>
  <g id="Layer_2" data-name="Layer 2">
    <g id="Icon-Reset">
      <g>
        <path class="cls-1" d="M734,599,933,347H793.63C768.15,151.76,601.18,1,399,1,179.19,1,1,179.19,1,399S179.19,797,399,797a396.44,396.44,0,0,0,256.11-93.34l-75.3-89.58A279.83,279.83,0,0,1,399,680c-155.19,0-281-125.81-281-281S243.81,118,399,118c137.42,0,251.79,98.65,276.18,229H535Z"/>
        <path class="cls-2" d="M734,599,933,347H793.63C768.15,151.76,601.18,1,399,1,179.19,1,1,179.19,1,399S179.19,797,399,797a396.44,396.44,0,0,0,256.11-93.34l-75.3-89.58A279.83,279.83,0,0,1,399,680c-155.19,0-281-125.81-281-281S243.81,118,399,118c137.42,0,251.79,98.65,276.18,229H535Z"/>
      </g>
    </g>
  </g>
</svg>
`;

var aboutIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 902 902">
  <defs>
    <style>
      .cls-1 {
        fill: #fff;
      }

      .cls-2 {
        fill: none;
        stroke: #000;
        stroke-miterlimit: 10;
        stroke-width: 2px;
      }
    </style>
  </defs>
  <title>About Enhanced Image</title>
  <g id="Layer_2" data-name="Layer 2">
    <g id="Icon-About">
      <g id="Icon-About-2" data-name="Icon-About">
        <g>
          <path class="cls-1" d="M451,1C202.47,1,1,202.47,1,451S202.47,901,451,901,901,699.53,901,451,699.53,1,451,1Zm0,803C256,804,98,646,98,451S256,98,451,98,804,256,804,451,646,804,451,804Z"/>
          <path class="cls-2" d="M451,1C202.47,1,1,202.47,1,451S202.47,901,451,901,901,699.53,901,451,699.53,1,451,1Zm0,803C256,804,98,646,98,451S256,98,451,98,804,256,804,451,646,804,451,804Z"/>
        </g>
        <g>
          <rect class="cls-1" x="381" y="367" width="140" height="370" rx="70"/>
          <rect class="cls-2" x="381" y="367" width="140" height="370" rx="70"/>
        </g>
        <g>
          <circle class="cls-1" cx="451" cy="240" r="70"/>
          <circle class="cls-2" cx="451" cy="240" r="70"/>
        </g>
      </g>
    </g>
  </g>
</svg>
`;

var bottomleftIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 902.4 906.83">
  <defs>
    <style>
      .cls-1 {
        fill: #fff;
      }

      .cls-2 {
        fill: none;
        stroke: #000;
        stroke-miterlimit: 10;
        stroke-width: 2px;
      }
    </style>
  </defs>
  <title>Bottom Left</title>
  <g id="Layer_2" data-name="Layer 2">
    <g id="Icon-ArrowBottomLeft">
      <g id="Icon-ArrowBottomLeft-2" data-name="Icon-ArrowBottomLeft">
        <g>
          <path class="cls-1" d="M1,166.21H209.27V543.86L751.73,1.42,901,153.12C723.12,337.19,542.34,515,361.71,696.69h378.9V905.83H1Z"/>
          <path class="cls-2" d="M1,166.21H209.27V543.86L751.73,1.42,901,153.12C723.12,337.19,542.34,515,361.71,696.69h378.9V905.83H1Z"/>
        </g>
      </g>
    </g>
  </g>
</svg>
`;

var bottomrightIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 906.83 902.4">
  <defs>
    <style>
      .cls-1 {
        fill: #fff;
      }

      .cls-2 {
        fill: none;
        stroke: #000;
        stroke-miterlimit: 10;
        stroke-width: 2px;
      }
    </style>
  </defs>
  <title>Bottom Right</title>
  <g id="Layer_2" data-name="Layer 2">
    <g id="Icon-ArrowBottomRight">
      <g id="Icon-ArrowBottomRight-2" data-name="Icon-ArrowBottomRight">
        <g>
          <path class="cls-1" d="M166.21,901.4V693.12H543.86L1.42,150.67,153.12,1.4C337.19,179.28,515,360.06,696.69,540.68V161.78H905.83V901.4Z"/>
          <path class="cls-2" d="M166.21,901.4V693.12H543.86L1.42,150.67,153.12,1.4C337.19,179.28,515,360.06,696.69,540.68V161.78H905.83V901.4Z"/>
        </g>
      </g>
    </g>
  </g>
</svg>
`;

var topleftIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 906.83 902.4">
  <defs>
    <style>
      .cls-1 {
        fill: #fff;
      }

      .cls-2 {
        fill: none;
        stroke: #000;
        stroke-miterlimit: 10;
        stroke-width: 2px;
      }
    </style>
  </defs>
  <title>Top Left</title>
  <g id="Layer_2" data-name="Layer 2">
    <g id="Icon-ArrowTopLeft">
      <g id="Icon-ArrowTopLeft-2" data-name="Icon-ArrowTopLeft">
        <g>
          <path class="cls-1" d="M740.61,1V209.27H363L905.41,751.73,753.71,901C569.63,723.12,391.84,542.34,210.13,361.71v378.9H1V1Z"/>
          <path class="cls-2" d="M740.61,1V209.27H363L905.41,751.73,753.71,901C569.63,723.12,391.84,542.34,210.13,361.71v378.9H1V1Z"/>
        </g>
      </g>
    </g>
  </g>
</svg>
`;

var toprightIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 902.4 906.83">
  <defs>
    <style>
      .cls-1 {
        fill: #fff;
      }

      .cls-2 {
        fill: none;
        stroke: #000;
        stroke-miterlimit: 10;
        stroke-width: 2px;
      }
    </style>
  </defs>
  <title>Top Right</title>
  <g id="Layer_2" data-name="Layer 2">
    <g id="Icon-ArrowTopRight">
      <g id="Icon-ArrowTopRight-2" data-name="Icon-ArrowTopRight">
        <g>
          <path class="cls-1" d="M901.4,740.61H693.12V363L150.67,905.41,1.4,753.71C179.28,569.63,360.06,391.84,540.68,210.13H161.78V1H901.4Z"/>
          <path class="cls-2" d="M901.4,740.61H693.12V363L150.67,905.41,1.4,753.71C179.28,569.63,360.06,391.84,540.68,210.13H161.78V1H901.4Z"/>
        </g>
      </g>
    </g>
  </g>
</svg>
`;

class EnhancedImageSettingsList {
    constructor() {
        this.setSliderDefaults = () => {
            this.setSlider('contrast', SLIDER_DEFAULTS.contrast);
            this.setSlider('hue', SLIDER_DEFAULTS.hue);
            this.setSlider('saturation', SLIDER_DEFAULTS.saturation);
            this.setSlider('brightness', SLIDER_DEFAULTS.brightness);
        };
        this.download = (image, imageName) => {
            this.saveButton.href = URL.createObjectURL(image);
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
    static get style() { return "\@import url(\"https://fonts.googleapis.com/css?family=Didact+Gothic\");.enhanced-image-settings-list.sc-enhanced-image-settings-list   ul.sc-enhanced-image-settings-list{display:-ms-flexbox;display:flex;background-color:#323334;color:#fff;-webkit-box-shadow:0 0 5px 0 #000;box-shadow:0 0 5px 0 #000;list-style:none;padding:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-size:14px;min-width:190px;border-radius:10px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol}.enhanced-image-settings-list-topleft.sc-enhanced-image-settings-list   ul.sc-enhanced-image-settings-list, .enhanced-image-settings-list-topright.sc-enhanced-image-settings-list   ul.sc-enhanced-image-settings-list, .enhanced-image-settings-list.sc-enhanced-image-settings-list   ul.sc-enhanced-image-settings-list{-ms-flex-direction:column;flex-direction:column}.enhanced-image-settings-list-bottomleft.sc-enhanced-image-settings-list   ul.sc-enhanced-image-settings-list, .enhanced-image-settings-list-bottomright.sc-enhanced-image-settings-list   ul.sc-enhanced-image-settings-list{-ms-flex-direction:column-reverse;flex-direction:column-reverse}.enhanced-image-settings-list-topleft.sc-enhanced-image-settings-list   ul.sc-enhanced-image-settings-list   li.sc-enhanced-image-settings-list:first-child, .enhanced-image-settings-list-topright.sc-enhanced-image-settings-list   ul.sc-enhanced-image-settings-list   li.sc-enhanced-image-settings-list:first-child{border-top-left-radius:10px;border-top-right-radius:10px}.enhanced-image-settings-list-bottomleft.sc-enhanced-image-settings-list   ul.sc-enhanced-image-settings-list   li.sc-enhanced-image-settings-list:first-child, .enhanced-image-settings-list-bottomright.sc-enhanced-image-settings-list   ul.sc-enhanced-image-settings-list   li.sc-enhanced-image-settings-list:first-child, .enhanced-image-settings-list-topleft.sc-enhanced-image-settings-list   ul.sc-enhanced-image-settings-list   li.sc-enhanced-image-settings-list:last-child, .enhanced-image-settings-list-topright.sc-enhanced-image-settings-list   ul.sc-enhanced-image-settings-list   li.sc-enhanced-image-settings-list:last-child{border-bottom-left-radius:10px;border-bottom-right-radius:10px}.enhanced-image-settings-list-bottomleft.sc-enhanced-image-settings-list   ul.sc-enhanced-image-settings-list   li.sc-enhanced-image-settings-list:last-child, .enhanced-image-settings-list-bottomright.sc-enhanced-image-settings-list   ul.sc-enhanced-image-settings-list   li.sc-enhanced-image-settings-list:last-child{border-top-left-radius:10px;border-top-right-radius:10px}.enhanced-image-settings-list.sc-enhanced-image-settings-list   ul.sc-enhanced-image-settings-list   li.sc-enhanced-image-settings-list:hover{background-color:#4b4c4e}.enhanced-image-settings-list.sc-enhanced-image-settings-list   ul.sc-enhanced-image-settings-list   li.sc-enhanced-image-settings-list   a.sc-enhanced-image-settings-list{color:#fff;text-decoration:none}.enhanced-image-settings-list-button.sc-enhanced-image-settings-list{cursor:pointer}.enhanced-image-settings-list-value.sc-enhanced-image-settings-list{margin-top:10px}.enhanced-image-hr.sc-enhanced-image-settings-list{border:none;border-top:1px solid #7d7f82;margin:0}.enhanced-image-button-default.sc-enhanced-image-settings-list{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:7px 10px;min-height:28px}.enhanced-image-location.sc-enhanced-image-settings-list{-ms-flex-pack:justify;justify-content:space-between}.enhanced-image-location-spans.sc-enhanced-image-settings-list{display:inline-grid;grid-gap:8px;grid-template-columns:1fr 1fr 1fr 1fr}.enhanced-image-location-span.sc-enhanced-image-settings-list{height:16px;width:16px;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;cursor:pointer;border-radius:12px;border:2px solid transparent}.enhanced-image-location-span.sc-enhanced-image-settings-list   svg.sc-enhanced-image-settings-list{height:8px;width:8px}.enhanced-image-location-span-active.sc-enhanced-image-settings-list, .enhanced-image-location-span.sc-enhanced-image-settings-list:hover{border:2px solid #fff}"; }
}

class EnhancedImageSliderItem {
    render() {
        const type = this.type;
        return (h("div", { class: "enhanced-image-slider-item-container" },
            h("div", null,
                SLIDER_NAMES[type],
                h("span", { class: "enhanced-image-slider-value" },
                    this.sliderValue,
                    this.valueSign)),
            h("div", { class: "enhanced-image-slider-container" },
                h("input", { class: "enhanced-image-slider", type: "range", min: this.min, max: this.max, name: type, value: this.sliderValue, onInput: this.handleSliderInput, onDblClick: this.setSlider.bind(this, type, SLIDER_DEFAULTS[type]) }))));
    }
    static get is() { return "enhanced-image-slider-item"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "handleSliderInput": {
            "type": "Any",
            "attr": "handle-slider-input"
        },
        "max": {
            "type": Number,
            "attr": "max"
        },
        "min": {
            "type": Number,
            "attr": "min"
        },
        "setSlider": {
            "type": "Any",
            "attr": "set-slider"
        },
        "sliderValue": {
            "type": Number,
            "attr": "slider-value"
        },
        "type": {
            "type": String,
            "attr": "type"
        },
        "valueSign": {
            "type": String,
            "attr": "value-sign"
        }
    }; }
    static get style() { return ".enhanced-image-slider-item-container.sc-enhanced-image-slider-item{padding:7px 10px}.enhanced-image-slider-container.sc-enhanced-image-slider-item{width:100%;margin-top:3px;margin-bottom:7px}.enhanced-image-slider.sc-enhanced-image-slider-item{-webkit-appearance:none;width:100%;height:3px;margin:0;border-radius:1.5px;outline:none}.enhanced-image-slider.sc-enhanced-image-slider-item::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:15px;height:15px;border-radius:50%;border:2px solid #fff;background-color:#4b4c4e;cursor:pointer}.enhanced-image-slider.sc-enhanced-image-slider-item::-moz-range-thumb{width:15px;height:15px;border-radius:50%;border:2px solid #fff;background-color:#4b4c4e;cursor:pointer}.enhanced-image-slider-value.sc-enhanced-image-slider-item{float:right;font-size:12px}"; }
}

export { EnhancedImageButtonCheckmark, EnhancedImageButtonItem, EnhancedImageSettingsList, EnhancedImageSliderItem };
