import React, {
    useRef,
    useState,
    useEffect,
} from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    StyledSliderContainer,
    StyledIcon,
    StyledSlider,
} from './styled';



export interface SliderProperties {
    /** required */
    value: number;
    valueType: string;
    changeValue: (
        type: string,
        value: string | number | boolean,
    ) => void;
    theme: Theme;
    transparentUI: boolean;
    Icon: React.FC<any>;
    renderOutside: (
        outside: JSX.Element,
        left?: number,
    ) => void;

    /** optional */
    min?: number;
    max?: number;
    step?: number;
}

const Slider: React.FC<SliderProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        value,
        valueType,
        changeValue,
        theme,
        transparentUI,
        Icon,
        renderOutside,

        /** optional */
        min,
        max,
        step,
    } = properties;


    /** references */
    const container = useRef<HTMLDivElement>(null);
    const timeout = useRef<number>();


    /** state */
    const [show, setShow] = useState(false);


    /** handlers */
    const handleInput = (event: any) => {
        const value = parseInt(event.target.value) || 1;
        changeValue(valueType, value);
    }


    /** effects */
    useEffect(() => {
        if (!show) {
            return;
        }

        const outside = (
            <StyledSlider
                theme={theme}
                transparentUI={transparentUI}
                onMouseEnter={() => {
                    if (timeout.current) {
                        clearTimeout(timeout.current);
                    }
                }}
                onMouseLeave={() => setShow(show => !show)}
            >
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step || 1}
                    value={value}
                    onChange={handleInput}
                />
            </StyledSlider>
        );

        const left = container.current
            ? container.current.offsetLeft
            : 0

        renderOutside(outside, left);
    }, [
        value,
        show,
    ]);


    /** render */
    return (
        <StyledSliderContainer
            theme={theme}
            transparentUI={transparentUI}
            ref={container}
            onMouseEnter={() => {
                setShow(show => !show)
            }}
        >
            <StyledIcon>
                <Icon />
            </StyledIcon>
        </StyledSliderContainer>
    );
}


export default Slider;
