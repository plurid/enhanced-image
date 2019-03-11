import { Component, Prop, State } from '@stencil/core';

import { SLIDER_DEFAULTS } from '../../utils/defaults';



@Component({
    tag: 'enhanced-image-settings',
    styleUrl: 'enhanced-image-settings.css',
    shadow: true
})
export class EnhancedImageSettings {
    /**
     * The source of the image.
     */
    @Prop() src: string;

    /**
     * Invert the colors.
     */
    @Prop() invertColors: any;

    /**
     * Set the value of the sliders.
     */
    @Prop() setSliderValue: any;

    @Prop() fullscreen: any;
    @Prop() fullscreenToggled: boolean;

    @State() toggledSettings: boolean = false;
    @State() colorsInverted: boolean = false;
    @State() contrastSliderValue: number = SLIDER_DEFAULTS.contrast;
    @State() hueSliderValue: number = SLIDER_DEFAULTS.hue;
    @State() saturationSliderValue: number = SLIDER_DEFAULTS.saturation;
    @State() brightnessSliderValue: number = SLIDER_DEFAULTS.brightness;


    toggleSettings = () => {
        this.toggledSettings = !this.toggledSettings;
    }

    colorsInvert = () => {
        this.invertColors();
        this.colorsInverted = !this.colorsInverted;
    }

    handleSliderInput = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setSlider(name, value);
    }

    saveImage = () => {
        console.log('save image', this.src);
    }

    setSlider = (name: string, value: number) => {
        const sliderValue = `${name}SliderValue`;
        this.setSliderValue(name, value);
        this[sliderValue] = value;
    }

    render() {
        return (
            <div class="enhanced-image-settings-button-container">
                <enhanced-image-settings-button onClick={this.toggleSettings} />
                {this.toggledSettings && (
                    <enhanced-image-settings-list
                        colorsInvert={this.colorsInvert}
                        colorsInverted={this.colorsInverted}

                        contrastSliderValue={this.contrastSliderValue}
                        hueSliderValue={this.hueSliderValue}
                        saturationSliderValue={this.saturationSliderValue}
                        brightnessSliderValue={this.brightnessSliderValue}

                        handleSliderInput={this.handleSliderInput}
                        setSlider={this.setSlider}

                        fullscreen={this.fullscreen}
                        fullscreenToggled={this.fullscreenToggled}
                        saveImage={this.saveImage}
                    />
                    // <div class="enhanced-image-settings-list">
                    //     <ul>
                    //         <li class="enhanced-image-settings-list-button" onClick={this.colorsInvert}>
                    //             Invert Colors
                    //             <span class="slider-value">
                    //                 <span class={ this.colorsInverted ? 'checkbox checkbox-fill' : 'checkbox' }></span>
                    //             </span>
                    //         </li>

                    //         {this.sliders.map(slider => {
                    //             const sliderValue = `${slider.type}SliderValue`;

                    //             return (
                    //                 <li>
                    //                     <enhanced-image-slider-item
                    //                         type={slider.type}
                    //                         max={slider.max || 100}
                    //                         sliderValue={this[sliderValue]}
                    //                         handleSliderInput={this.handleSliderInput}
                    //                         setSlider={this.setSlider}
                    //                     />
                    //                 </li>
                    //             );
                    //         })}

                    //         <li class="enhanced-image-settings-list-button" onClick={this.fullscreen}>
                    //             {this.fullscreenToggled ? 'Exit Fullscreen' : 'View Fullscreen Image'}
                    //         </li>
                    //         <li class="enhanced-image-settings-list-button" onClick={this.saveImage}>
                    //             Save Image
                    //         </li>
                    //         <li class="enhanced-image-settings-list-button" onClick={this.resetDefaultAll}>
                    //             Reset to Default
                    //         </li>
                    //         <li class="enhanced-image-settings-list-button" onClick={this.about}>
                    //             About Enhanced Image
                    //         </li>
                    //     </ul>
                    // </div>
                )}
            </div>
        );
    }
}
