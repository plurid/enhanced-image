import { Component, Prop } from '@stencil/core';



@Component({
    tag: 'text-image-editor-button-toggle',
    styleUrl: 'text-image-editor-button-toggle.css',
    shadow: true
})
export class TextImageEditor {
    @Prop() toggled: boolean;
    @Prop() toggle: () => void;
    @Prop() icon: string;
    @Prop() text: string;

    render() {
        return (
            <span
                class={`
                    text-image-editor-button
                    ${this.toggled ? 'text-image-editor-button-icon-active': ''}
                `}
                onClick={this.toggle}
            >
                <span
                    class="text-image-editor-button-icon"
                    innerHTML={this.icon}
                />
            </span>
        );
    }
}
