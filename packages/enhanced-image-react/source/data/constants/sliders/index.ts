import {
    Slider,
} from '../../interfaces';



export const sliders: Slider[] = [
    {
        type: 'Contrast',
        max: 200,
    },
    {
        type: 'Hue',
        min: -180,
        max: 180,
        valueSign: '°',
    },
    {
        type: 'Saturation',
        max: 200,
    },
    {
        type: 'Brightness',
        max: 200,
    },
];


export const SLIDER_NAMES = {
    Contrast: 'Contrast',
    Hue: 'Hue Rotation',
    Saturation: 'Saturation',
    Brightness: 'Lightness',
    TransformRotate: 'Rotate',
    TransformScale: 'Scale',
};


export const SLIDER_VALUE_DEFAULTS = {
    Invert: 0,
    Contrast: 100,
    Hue: 0,
    Saturation: 100,
    Brightness: 100,
    TransformRotate: 0,
    TransformScale: 0,
};


export const SLIDER_INPUT_DEFAULTS = {
    min: 0,
    max: 100,
    valueSign: '%',
};
