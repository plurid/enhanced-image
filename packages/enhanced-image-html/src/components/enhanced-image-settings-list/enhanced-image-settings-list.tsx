import { Component, Prop, State } from '@stencil/core';

import { SLIDER_ITEM_DEFAULTS } from '../../utils/defaults';
import { sliders } from '../../data/sliders';
import addTextIcon from '../../assets/add-text-icon.svg';
import generateIcon from '../../assets/generate-icon.svg';
import transviewIcon from '../../assets/transview-icon.svg';
import colorizeIcon from '../../assets/colorize-icon.svg';
import fullscreenIcon from '../../assets/fullscreen-icon.svg';
import saveIcon from '../../assets/save-icon.svg';
import shareIcon from '../../assets/share-icon.svg';
import resetIcon from '../../assets/reset-icon.svg';
import aboutIcon from '../../assets/about-icon.svg';
import bottomleftIcon from '../../assets/bottomleft-icon.svg';
import bottomrightIcon from '../../assets/bottomright-icon.svg';
import topleftIcon from '../../assets/topleft-icon.svg';
import toprightIcon from '../../assets/topright-icon.svg';



@Component({
    tag: 'enhanced-image-settings-list',
    styleUrl: 'enhanced-image-settings-list.css',
    shadow: true
})
export class EnhancedImageSettingsList {
    saveButton!: HTMLAnchorElement;

    @Prop() src: string;
    @Prop() toggledEditText: boolean;
    @Prop() toggleEditText: () => void;
    @Prop() addText: () => void;
    @Prop() invertColors: any;
    @Prop() setSliderValue: any;
    @Prop() colorsInvert: any;
    @Prop() colorsInverted: any;
    @Prop() contrastSliderValue: any;
    @Prop() hueSliderValue: any;
    @Prop() saturationSliderValue: any;
    @Prop() brightnessSliderValue: any;
    @Prop() handleSliderInput: any;
    @Prop() setSlider: any;
    @Prop() location: string;
    @Prop() setLocation: (location: string) => void;
    @Prop() textSelect: boolean;
    @Prop() toggledDefaults: boolean;
    @Prop() toggleDefaults: () => void;
    @Prop() resetToDefaults: () => void;
    @Prop() fullscreen: any;
    @Prop() fullscreenToggled: any;
    @Prop() saveImage: any;
    @Prop() shareImage: any;
    @Prop() noAbout: boolean;

    @State() settingsOpacity: number = 1;

    generate = () => {
        console.log('generate new image');
    }

    transview = () => {
        console.log('transview');
    }

    colorize = () => {
        console.log('colorize');
    }

    download = (image: any, imageName: string) => {
        this.saveButton.href = URL.createObjectURL(image);
        this.saveButton.download = imageName;
    }

    aboutEnhancedImage = () => {
        const aboutURL = "https://github.com/plurid/enhanced-image"
        window.open(aboutURL, '_blank');
    }

    setSettingsOpacity = (value: number) => {
        this.settingsOpacity = value;
    }


    render() {
        return (
            <div
                class={`
                    enhanced-image-settings-list
                    enhanced-image-settings-list-${this.location}
                `}
                style= {{ opacity: this.settingsOpacity + '' }}
            >
                <ul>
                    {this.textSelect && (
                        <li>
                            <enhanced-image-button-checkmark
                            toggle={this.toggleEditText}
                            text={'Edit Text'}
                            checked={this.toggledEditText}
                            />
                        </li>
                    )}

                    {this.textSelect && (
                        <li>
                            <enhanced-image-button-item
                                atClick={this.addText}
                                icon={addTextIcon}
                                text={'Add Text'}
                            />
                        </li>
                    )}

                    {this.textSelect && (
                        <li>
                            <enhanced-image-button-item
                                atClick={this.transview}
                                icon={transviewIcon}
                                text={'Transview'}
                            />
                        </li>
                    )}

                    {this.textSelect && (
                        <hr class="enhanced-image-hr"/>
                    )}

                    <li>
                        <enhanced-image-button-item
                            atClick={this.generate}
                            icon={generateIcon}
                            text={'Generate'}
                        />
                    </li>

                    <li>
                        <enhanced-image-button-item
                            atClick={this.colorize}
                            icon={colorizeIcon}
                            text={'Colorize'}
                        />
                    </li>

                    <li>
                        <enhanced-image-button-checkmark
                            toggle={this.colorsInvert}
                            text={'Invert Colors'}
                            checked={this.colorsInverted}
                        />
                    </li>

                    {sliders.map(slider => {
                        const sliderValue = `${slider.type}SliderValue`;

                        return (
                            <li>
                                <enhanced-image-slider-item
                                    type={slider.type}
                                    min={slider.min || SLIDER_ITEM_DEFAULTS.min}
                                    max={slider.max || SLIDER_ITEM_DEFAULTS.max}
                                    valueSign={slider.valueSign || SLIDER_ITEM_DEFAULTS.valueSign}
                                    sliderValue={this[sliderValue]}
                                    handleSliderInput={this.handleSliderInput}
                                    setSlider={this.setSlider}
                                    setSettingsOpacity={this.setSettingsOpacity}
                                />
                            </li>
                        );
                    })}

                    <li>
                        <enhanced-image-button-checkmark
                            toggle={this.toggleDefaults}
                            text={'Toggle Defaults'}
                            checked={this.toggledDefaults}
                        />
                    </li>

                    <li>
                        <enhanced-image-button-item
                            atClick={this.resetToDefaults}
                            icon={resetIcon}
                            text={'Reset to Defaults'}
                        />
                    </li>

                    <hr class="enhanced-image-hr"/>

                    <li>
                        <enhanced-image-button-item
                            atClick={this.fullscreen}
                            icon={fullscreenIcon}
                            text={this.fullscreenToggled ? 'Exit Fullscreen' : 'View Fullscreen'}
                        />
                    </li>

                    <li>
                        <enhanced-image-button-item
                            atClick={this.shareImage}
                            icon={shareIcon}
                            text={'Share Image'}
                        />
                    </li>

                    <li onMouseEnter={this.saveImage.bind(this, this.download)}>
                        <a ref={(el) => this.saveButton = el as HTMLAnchorElement}>
                            <enhanced-image-button-item
                                atClick={() => {}}
                                icon={saveIcon}
                                text={'Save Image'}
                            />
                        </a>
                    </li>

                    <li class="enhanced-image-button-default enhanced-image-location">
                        <span>Location</span>
                        <span class="enhanced-image-location-spans">
                            <span
                                class={`enhanced-image-location-span ${this.location === 'topleft' ? 'enhanced-image-location-span-active' : ''}`}
                                innerHTML={topleftIcon}
                                onClick={this.setLocation.bind(this, 'topleft')}
                            />
                            <span
                                class={`enhanced-image-location-span ${this.location === 'topright' ? 'enhanced-image-location-span-active' : ''}`}
                                innerHTML={toprightIcon}
                                onClick={this.setLocation.bind(this, 'topright')}
                            />
                            <span
                                class={`enhanced-image-location-span ${this.location === 'bottomleft' ? 'enhanced-image-location-span-active' : ''}`}
                                innerHTML={bottomleftIcon}
                                onClick={this.setLocation.bind(this, 'bottomleft')}
                            />
                            <span
                                class={`enhanced-image-location-span ${this.location === 'bottomright' ? 'enhanced-image-location-span-active' : ''}`}
                                innerHTML={bottomrightIcon}
                                onClick={this.setLocation.bind(this, 'bottomright')}
                            />
                        </span>
                    </li>

                    {!this.noAbout &&
                        <hr class="enhanced-image-hr" />
                    }

                    {!this.noAbout &&
                        <li>
                            <enhanced-image-button-item
                                atClick={this.aboutEnhancedImage}
                                icon={aboutIcon}
                                text={'About Enhanced Image'}
                            />
                        </li>
                    }
                </ul>
            </div>
        );
    }
}
