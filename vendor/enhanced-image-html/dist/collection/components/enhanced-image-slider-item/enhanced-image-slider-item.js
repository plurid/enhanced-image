import { SLIDER_DEFAULTS, SLIDER_NAMES, } from '../../utils/defaults';
export class EnhancedImageSliderItem {
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
    static get style() { return "/**style-placeholder:enhanced-image-slider-item:**/"; }
}
