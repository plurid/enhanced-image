import { Component, Prop } from '@stencil/core';

import goToLinkIcon from '../../assets/gotolink-icon.svg';



@Component({
    tag: 'text-image-editor-button-input',
    styleUrl: 'text-image-editor-button-input.css',
    shadow: true
})
export class TextImageEditorButtonInput {
    @Prop() toggled: boolean;
    @Prop() toggle: () => void;
    @Prop() icon: string;
    @Prop() value: string;
    @Prop() valueType: string;
    @Prop() changeValue: (type: string, value: number | string) => void;

    render() {
        return (
            <span class="text-image-editor-button-input">
                <text-image-editor-button-toggle
                    toggle={this.toggle}
                    toggled={this.toggled}
                    icon={this.icon}
                />

                {
                    this.toggled && (
                        <span class="text-image-editor-button-input-container">
                            <input
                                type="text"
                                value={this.value}
                                onInput={(event: any) => {
                                    this.changeValue(this.valueType, event.target.value);
                                }}
                            />
                            <a href={this.value} target="_blank">
                                <span class="text-image-editor-button-input-gotolink" innerHTML={goToLinkIcon}>
                                </span>
                            </a>
                        </span>
                    )
                }
            </span>
        );
    }
}
