import { Component, Prop } from '@stencil/core';



@Component({
    tag: 'text-image-editor-button-toggle',
    styleUrl: 'text-image-editor-button-toggle.css',
    shadow: true,
})
export class TextImageEditorButtonToggle {
    @Prop() private toggled: boolean;
    @Prop() private toggle: () => void;
    @Prop() private icon: string;

    public render() {
        return (
            <span
                class={`
                    text-image-editor-button
                    ${this.toggled ? 'text-image-editor-button-icon-active' : ''}
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
