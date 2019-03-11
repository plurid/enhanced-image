import { Component, Prop } from '@stencil/core';

import {
    SLIDER_DEFAULTS,
    SLIDER_NAMES,
} from '../../utils/defaults';



@Component({
    tag: 'enhanced-image-slider-item',
    styleUrl: 'enhanced-image-slider-item.css',
    shadow: true
})
export class EnhancedImageSliderItem {
    /**
     * The type of the slider.
     */
    @Prop() type: string;
    @Prop() max: number;

    @Prop() sliderValue: any;
    @Prop() handleSliderInput: any;
    @Prop() setSlider: any;

    render() {
        const type = this.type;

        return (
            <div>
                <div>
                    {SLIDER_NAMES[type]}
                    <span class="slider-value">
                        {this.sliderValue}
                    </span>
                </div>
                <div class="slidecontainer">
                    <input
                        class="slider"
                        type="range"
                        min="0"
                        max={this.max}
                        name={type}
                        value={this.sliderValue}
                        onInput={this.handleSliderInput}
                        onDblClick={this.setSlider.bind(this, type, SLIDER_DEFAULTS[type])}
                    />
                </div>
            </div>
        );
    }
}
