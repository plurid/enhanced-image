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
    show: string;
    setShow: any;

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
        show,
        setShow,

        /** optional */
        min,
        max,
        step,
    } = properties;


    /** references */
    const container = useRef<HTMLDivElement>(null);


    /** handlers */
    const handleInput = (
        event: any,
    ) => {
        const value = parseInt(event.target.value) || 1;
        changeValue(valueType, value);
    }


    /** effects */
    useEffect(() => {
        if (show === '') {
            const outside = (
                <></>
            );
            renderOutside(outside);
            return;
        }

        if (show !== valueType) {
            return;
        }

        const outside = (
            <StyledSlider
                theme={theme}
                transparentUI={transparentUI}
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
            show={show === valueType}
            ref={container}
            onClick={() => {
                if (show === valueType) {
                    setShow('');
                } else {
                    setShow(valueType);
                }
            }}
        >
            <StyledIcon>
                <Icon />
            </StyledIcon>
        </StyledSliderContainer>
    );
}


export default Slider;
