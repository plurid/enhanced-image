import '../../stencil.core';
export declare class EnhancedImageSettings {
    /**
     * The source of the image.
     */
    src: string;
    /**
     * Invert the colors.
     */
    invertColors: any;
    /**
     * Set the value of the sliders.
     */
    setSliderValue: any;
    location: string;
    setLocation: (location: string) => void;
    textSelect: boolean;
    fullscreen: any;
    fullscreenToggled: boolean;
    invert: number;
    contrast: number;
    hue: number;
    saturation: number;
    brightness: number;
    toggledSettings: boolean;
    colorsInverted: boolean;
    contrastSliderValue: number;
    hueSliderValue: number;
    saturationSliderValue: number;
    brightnessSliderValue: number;
    componentWillUpdate(): void;
    toggleSettings: () => void;
    colorsInvert: () => void;
    handleSliderInput: (event: any) => void;
    saveImage: (download: any) => Promise<void>;
    setSlider: (name: string, value: number) => void;
    render(): JSX.Element;
}
