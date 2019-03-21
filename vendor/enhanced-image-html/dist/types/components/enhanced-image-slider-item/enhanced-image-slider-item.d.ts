import '../../stencil.core';
export declare class EnhancedImageSliderItem {
    sliderValue: number;
    valueSign: string;
    type: string;
    min: number;
    max: number;
    handleSliderInput: () => void;
    setSlider: (name: string, value: number) => void;
    render(): JSX.Element;
}
