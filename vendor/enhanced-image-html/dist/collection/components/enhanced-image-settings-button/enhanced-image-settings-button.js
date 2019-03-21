import settingsIcon from '../../assets/settings-icon.svg';
export class EnhancedImageSettings {
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
    static get style() { return "/**style-placeholder:enhanced-image-settings-button:**/"; }
}
