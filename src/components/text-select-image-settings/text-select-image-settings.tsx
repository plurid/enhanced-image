import { Component, State } from '@stencil/core';

import settingsIcon from '../../assets/settings-icon.svg';



@Component({
    tag: 'text-select-image-settings',
    styleUrl: 'text-select-image-settings.css',
    shadow: true
})
export class TextSelectImage {
    @State() toggle: boolean;

    toggleSettings = () => {
        this.toggle = !this.toggle;
    }

    render() {
        return (
            <div class="text-select-image-settings-container">
                <div
                    class="text-select-image-settings-button"
                    innerHTML={settingsIcon}
                    onClick={this.toggleSettings}
                />
                {this.toggle && (
                    <text-select-image-settings-menu
                        toggle={this.toggleSettings}
                    />
                )}
            </div>
        );
    }
}
