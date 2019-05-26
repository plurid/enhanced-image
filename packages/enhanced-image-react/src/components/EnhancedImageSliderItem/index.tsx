import React, { Component } from 'react';

import {
    StyledEnhancedImageSliderItem,
    StyledEnhancedImageSliderType,
    StyledEnhancedImageSliderValue,
    StyledEnhancedImageSliderInputContainer,
} from './styled';

import {
    SLIDER_NAMES,
    SLIDER_INPUT_DEFAULTS,
} from '../../data/constants';

import Context from '../../context';



class EnhancedImageSliderItem extends Component<
    any, any
> {
    static contextType = Context;

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
            value,
            valueSign
        } = this.props;

        const {
            toggleMenuOpaque
        } = this.context;

        return (
            <StyledEnhancedImageSliderItem
            >
                <StyledEnhancedImageSliderType>
                    {SLIDER_NAMES[type]}

                    <StyledEnhancedImageSliderValue>
                        {/* {this.sliderValue}{this.valueSign} */}
                        {value}{valueSign || SLIDER_INPUT_DEFAULTS.valueSign}
                    </StyledEnhancedImageSliderValue>
                </StyledEnhancedImageSliderType>

                <StyledEnhancedImageSliderInputContainer
                    theme={theme}
                    hovered={hovered}
                >
                    <input
                        type="range"
                        min={min || SLIDER_INPUT_DEFAULTS.min}
                        max={max || SLIDER_INPUT_DEFAULTS.max}
                        name={type}
                        value={value}
                        onMouseEnter={this.toggleHover}
                        onMouseLeave={this.toggleHover}
                        onChange={this.handleSliderInput}
                        onMouseDown={toggleMenuOpaque}
                        onMouseUp={toggleMenuOpaque}
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

    private handleSliderInput = (event: any) => {
        const { value } = event.target;

        const {
            type
        } = this.props;

        const {
            setColorValue,
        } = this.context;

        setColorValue(type, value);
    }
}


export default EnhancedImageSliderItem;
