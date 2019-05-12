import { Component, Prop } from '@stencil/core';

import settingsIcon from '../../assets/settings-icon.svg';
// import settingsTextIcon from '../../assets/settings-text-icon.svg';
import settingsTextColoredFlatIcon from '../../assets/settings-text-colored-flat-icon.svg';



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
            ? settingsTextColoredFlatIcon
            : settingsIcon;

        return (
            <div
                onClick={this.toggle}
                class="enhanced-image-settings-button"
                innerHTML={innerHTMLIcon}
            >
                <svg style={{width:0, height: 0, position: 'absolute' }} aria-hidden="true" focusable="false">
                    <linearGradient id="enhanced-image-settings-button-gradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="hsl(310, 50%, 45%)" />
                        <stop offset="40%" stop-color="hsl(325, 70%, 35%)" />
                        <stop offset="100%" stop-color="hsl(285, 60%, 20%)" />
                    </linearGradient>
                </svg>
            </div>
        );
    }
}
