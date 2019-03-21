import '../../stencil.core';
export declare class EnhancedImageSettingsList {
    saveButton: HTMLAnchorElement;
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
    colorsInvert: any;
    colorsInverted: any;
    contrastSliderValue: any;
    hueSliderValue: any;
    saturationSliderValue: any;
    brightnessSliderValue: any;
    handleSliderInput: any;
    setSlider: any;
    location: string;
    setLocation: (location: string) => void;
    textSelect: boolean;
    fullscreen: any;
    fullscreenToggled: any;
    saveImage: any;
    setSliderDefaults: () => void;
    download: (image: any, imageName: string) => void;
    resetToDefaults: () => void;
    aboutEnhancedImage: () => void;
    render(): JSX.Element;
}
