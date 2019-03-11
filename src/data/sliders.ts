interface Slider {
    type: string;
    max?: number;
}

export const sliders: Slider[] = [
    {
        type: 'contrast',
        max: 200,
    },
    {
        type: 'hue',
        max: 360,
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
