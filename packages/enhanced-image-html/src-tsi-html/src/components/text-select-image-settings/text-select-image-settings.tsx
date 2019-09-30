import { Component, Prop } from '@stencil/core';

import settingsIcon from '../../assets/settings-icon.svg';



@Component({
    tag: 'text-select-image-settings',
    styleUrl: 'text-select-image-settings.css',
    shadow: true,
})
export class TextSelectImageSettings {
    @Prop() private toggledSettings: boolean;
    @Prop() private toggleSettings: () => void;

    @Prop() private editable: boolean;
    @Prop() private toggleEditable: () => void;

    @Prop() private addText: () => void;

    public render() {
        return (
            <div class="text-select-image-settings-container">
                <div
                    class="text-select-image-settings-button"
                    innerHTML={settingsIcon}
                    onClick={this.toggleSettings}
                />
                {this.toggledSettings && (
                    <text-select-image-settings-menu
                        toggleMenu={this.toggleSettings}
                        editable={this.editable}
                        toggleEditable={this.toggleEditable}
                        addText={this.addText}
                    />
                )}
            </div>
        );
    }
}
