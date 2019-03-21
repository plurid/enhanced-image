export class EnhancedImageButtonCheckmark {
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
    static get style() { return "/**style-placeholder:enhanced-image-button-checkmark:**/"; }
}
