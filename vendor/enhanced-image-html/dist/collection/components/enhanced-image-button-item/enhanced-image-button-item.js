export class EnhancedImageButtonItem {
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
    static get style() { return "/**style-placeholder:enhanced-image-button-item:**/"; }
}
