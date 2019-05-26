import React, { Component } from 'react';

import {
    StyledEnhancedImageSliderItem,
    StyledEnhancedImageSliderType,
    StyledEnhancedImageSliderValue,
    StyledEnhancedImageSliderInputContainer,
} from './styled';

import {
    SLIDER_NAMES,
    SLIDER_VALUE_DEFAULTS,
    SLIDER_INPUT_DEFAULTS,
} from './constants';



class EnhancedImageSliderItem extends Component<
    any, any
> {
    constructor(props: any) {
        super(props);

        this.state = {
            hovered: false,
        };
    }

    public render() {
        const {
            hovered,
        } = this.state;

        const {
            theme,
            type,
            min,
            max,
            sliderValue,
        } = this.props;

        return (
            <StyledEnhancedImageSliderItem
            >
                <StyledEnhancedImageSliderType>
                    {SLIDER_NAMES[type]}

                    <StyledEnhancedImageSliderValue>
                        {/* {this.sliderValue}{this.valueSign} */}
                        100
                    </StyledEnhancedImageSliderValue>
                </StyledEnhancedImageSliderType>

                <StyledEnhancedImageSliderInputContainer
                    theme={theme}
                    hovered={hovered}
                >
                    <input
                        type="range"
                        min={min}
                        max={max}
                        name={type}
                        value={sliderValue}
                        onMouseEnter={this.toggleHover}
                        onMouseLeave={this.toggleHover}
                        // onInput={this._handleSliderInput}
                        // onMouseUp={this.setSettingsOpacity.bind(this, SETTINGS_OPACITY.default)}
                        // onDblClick={this.setSlider.bind(this, type, SLIDER_DEFAULTS[type])}
                    />
                </StyledEnhancedImageSliderInputContainer>
            </StyledEnhancedImageSliderItem>
        );
    }

    private toggleHover = () => {
        this.setState({
            hovered: !this.state.hovered,
        });
    }
}


export default EnhancedImageSliderItem;
