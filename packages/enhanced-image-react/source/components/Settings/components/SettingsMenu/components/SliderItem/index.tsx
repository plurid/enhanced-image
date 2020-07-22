import React, {
    useState,
} from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    StyledSliderItem,
    StyledSliderType,
    StyledSliderValue,
    StyledSliderInputContainer,
} from './styled';

import {
    SLIDER_NAMES,
    SLIDER_INPUT_DEFAULTS,
    SLIDER_VALUE_DEFAULTS,
} from '../../../../../../data/constants';



export interface SliderItemProperties {
    theme: Theme;
    type: string;
    min?: number;
    max?: number;
    value: number;
    valueSign?: string;
    handleInput: (
        value: number,
    ) => void;
}

const SliderItem: React.FC<SliderItemProperties> = (
    properties,
) => {
    /** properties */
    const {
        theme,
        type,
        min,
        max,
        value,
        valueSign,
        handleInput,
    } = properties;


    /** state */
    const [
        hovered,
        setHovered,
    ] = useState(false);


    /** handlers */
    const handleDoubleClick = () => {
        handleInput((SLIDER_VALUE_DEFAULTS as any)[type]);
    }


    /** render */
    return (
        <StyledSliderItem>
            <StyledSliderType>
                {(SLIDER_NAMES as any)[type]}

                <StyledSliderValue>
                    {value}{valueSign || SLIDER_INPUT_DEFAULTS.valueSign}
                </StyledSliderValue>
            </StyledSliderType>

            <StyledSliderInputContainer
                theme={theme}
                hovered={hovered}
            >
                <input
                    type="range"
                    min={min || SLIDER_INPUT_DEFAULTS.min}
                    max={max || SLIDER_INPUT_DEFAULTS.max}
                    name={type}
                    value={value}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onChange={(event: any) => handleInput(parseInt(event.target.value))}
                    onDoubleClick={handleDoubleClick}
                />
            </StyledSliderInputContainer>

        </StyledSliderItem>
    );
}


export default SliderItem;
