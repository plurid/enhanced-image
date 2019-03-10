import { Component, Prop, State } from '@stencil/core';

import settingsIcon from '../../assets/settings-icon.svg';



@Component({
    tag: 'enhanced-image-settings-button',
    styleUrl: 'enhanced-image-settings-button.css',
    shadow: true
})
export class EnhancedImageSettingsButton {
    /**
     * The source of the image
     */
    @Prop() src: string;

    /**
     * The source of the image
     */
    @Prop() invertColors: any;

    @State() clicked: boolean = false;

    click = () => {
        this.clicked = !this.clicked;
        console.log('clicked', this.clicked);
    }

    render() {
        if (!this.clicked) {
            return (
                <div onClick={this.click} class="enhanced-image-settings-button" innerHTML={settingsIcon} />
            );
        } else {
            return (
                <div class="enhanced-image-settings-button-container">
                    <div onClick={this.click} class="enhanced-image-settings-button" innerHTML={settingsIcon} />
                    <div class="enhanced-image-settings-list">
                        <ul>
                            <li onClick={this.invertColors}>
                                Invert Colors
                            </li>
                            <li>
                                Adjust Colors
                            </li>
                        </ul>
                    </div>
                </div>
            );
        }
    }
}
