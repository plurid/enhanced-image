import { Component, Prop } from '@stencil/core';

import settingsIcon from '../../assets/settings-icon.svg';



@Component({
    tag: 'enhanced-image-settings-button',
    styleUrl: 'enhanced-image-settings-button.css',
    shadow: true
})
export class EnhancedImageSettings {
    /**
     *  onClick function.
     */
    @Prop() toggle: any;

    render() {
        return (
            <div
                onClick={this.toggle}
                class="enhanced-image-settings-button"
                innerHTML={settingsIcon}
            />
        );
    }
}
