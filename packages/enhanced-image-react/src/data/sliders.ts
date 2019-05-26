interface Slider {
    type: string;
    min?: number;
    max?: number;
    valueSign?: string;
}


const sliders: Slider[] = [
    {
        type: 'contrast',
        max: 200,
    },
    {
        type: 'hue',
        min: -180,
        max: 180,
        valueSign: '°',
    },
    {
        type: 'saturation',
        max: 200,
    },
    {
        type: 'brightness',
        max: 200,
    },
];


export default sliders;
