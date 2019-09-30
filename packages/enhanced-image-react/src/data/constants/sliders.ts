import {
    Slider,
} from '../interfaces';



const sliders: Slider[] = [
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


export default sliders;
