interface Slider {
    type: string;
    min?: number;
    max?: number;
}

export const sliders: Slider[] = [
    {
        type: 'contrast',
        max: 200,
    },
    {
        type: 'hue',
        min: -180,
        max: 180,
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
