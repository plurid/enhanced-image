import { Component, Prop } from '@stencil/core';

import settingsIcon from '../../assets/settings-icon.svg';
import settingsTextIcon from '../../assets/settings-text-icon.svg';



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
    @Prop() icon: string;

    render() {
        const innerHTMLIcon = this.icon === 'textselect'
            ? settingsTextIcon
            : settingsIcon;

        return (
            <div
                onClick={this.toggle}
                class="enhanced-image-settings-button"
                innerHTML={innerHTMLIcon}
            />
        );
    }
}
