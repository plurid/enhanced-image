import '../../stencil.core';
export declare class EnhancedImage {
    element: HTMLElement;
    src: string;
    alt: string;
    height: string;
    width: string;
    classes: string;
    styling: string;
    invert: string;
    contrast: string;
    hue: string;
    saturation: string;
    lightness: string;
    settingsPosition: string;
    textSelect: boolean;
    invertValue: number;
    contrastValue: number;
    hueValue: number;
    saturationValue: number;
    brightnessValue: number;
    fullscreenToggled: boolean;
    fullscreenStyles: object;
    location: string;
    styled: any;
    componentWillLoad(): void;
    componentWillUpdate(): void;
    invertWatch(newValue: string): void;
    contrastWatch(newValue: string): void;
    hueWatch(newValue: string): void;
    saturationWatch(newValue: string): void;
    lightnessWatch(newValue: string): void;
    settingsPositionWatch(newValue: string): void;
    /**
     *
     */
    invertColors: () => void;
    setSliderValue: (name: string, value: number) => void;
    exitFullscreenHandler(): void;
    fullscreen: () => void;
    setLocation: (location: string) => void;
    render(): JSX.Element;
}
