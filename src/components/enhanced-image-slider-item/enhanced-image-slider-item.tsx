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
    @Prop() sliderValue: number;
    @Prop() valueSign: string;
    @Prop() type: string;
    @Prop() min: number;
    @Prop() max: number;
    @Prop() handleSliderInput: () => void;
    @Prop() setSlider: (name: string, value: number) => void;

    render() {
        const type = this.type;

        return (
            <div class="enhanced-image-slider-item-container">
                <div>
                    {SLIDER_NAMES[type]}
                    <span class="enhanced-image-slider-value">
                        {this.sliderValue}{this.valueSign}
                    </span>
                </div>
                <div class="enhanced-image-slider-container">
                    <input
                        class="enhanced-image-slider"
                        type="range"
                        min={this.min}
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
