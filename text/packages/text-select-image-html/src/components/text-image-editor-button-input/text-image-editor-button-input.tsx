import { Component, Prop } from '@stencil/core';

import goToLinkIcon from '../../assets/gotolink-icon.svg';



@Component({
    tag: 'text-image-editor-button-input',
    styleUrl: 'text-image-editor-button-input.css',
    shadow: true,
})
export class TextImageEditorButtonInput {
    @Prop() private toggled: boolean;
    @Prop() private toggle: () => void;
    @Prop() private icon: string;
    @Prop() private value: string;
    @Prop() private valueType: string;
    @Prop() private changeValue: (type: string, value: number | string) => void;

    public render() {
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
                                onInput={this.handleInput}
                            />
                            <a href={this.value} target="_blank">
                                <span class="text-image-editor-button-input-gotolink" innerHTML={goToLinkIcon} />
                            </a>
                        </span>
                    )
                }
            </span>
        );
    }


    private handleInput = (event: any) => {
        this.changeValue(this.valueType, event.target.value);
    }
}
