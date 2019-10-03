import { Dispatch, SetStateAction } from 'react';

import themes, { Theme } from '@plurid/utilities.themes';

import {
    ImageText,
    ImageTextVersionTextline,
    ImageTextVersionTextarea,
} from './text';



export interface Slider {
    type: string;
    min?: number;
    max?: number;
    valueSign?: string;
}


export interface EnhancedImageProperties {
    src: string;
    srcset?: string;
    alt?: string;

    /**
     * Inline React style object for the image.
     */
    imageStyle?: React.CSSProperties;
    theme?: keyof typeof themes;
    transparentUI?: boolean;
    about?: boolean;

    /**
     * Function to be run after the image is loaded.
     */
    atLoad?: any;

    /**
     * To be specified when using another API than https://api.plurid.com.
     * GraphlQL-based.
     *
     * Default: https://api.plurid.com.
     */
    apiEndpoint?: string;
    /**
     * API key obtained from https://account.plurid.com/depict/api when using
     * the default apiEndpoint.
     */
    apiKey?: string;
    userToken?: string;
    imageID?: string;

    // updateDebounce?: number;
    // moreLimit?: number;
    // getTextOnLoad?: boolean;
}


export interface Context {
    src: string;
    srcset?: string;
    alt: string;

    imageStyle: React.CSSProperties;
    theme: Theme;
    transparentUI: boolean;
    about: boolean;

    apiEndpoint: string;
    apiKey: string | undefined;
    userToken: string | undefined;
    imageID: string | undefined;

    databaseImageID: string;

    handleLoadedImage: (image: React.SyntheticEvent<HTMLImageElement, Event>) => Promise<void>;
    loadedImage: boolean;

    imageDimensions: ImageDimensions,
    imageBoxDimensions: ImageBoxDimensions;
    // videoContainerDimensions: VideoContainerDimensions;

    setMessage: Dispatch<SetStateAction<string>>;
    setMessageTimed: (message: string, time: number) => void;
    setShowSpinner: Dispatch<SetStateAction<boolean>>;

    showSettingsButton: boolean;
    setShowSettingsButton: Dispatch<SetStateAction<boolean>>;

    showSettingsMenu: boolean;
    setShowSettingsMenu: Dispatch<SetStateAction<boolean>>;

    expandTextDrawer: boolean;
    setExpandTextDrawer: Dispatch<SetStateAction<boolean>>;
    expandColorDrawer: boolean;
    setExpandColorDrawer: Dispatch<SetStateAction<boolean>>;
    expandTopologyDrawer: boolean;
    setExpandTopologyDrawer: Dispatch<SetStateAction<boolean>>;
    expandVariaDrawer: boolean;
    setExpandVariaDrawer: Dispatch<SetStateAction<boolean>>;

    editableText: boolean;
    setEditableText: Dispatch<SetStateAction<boolean>>;

    imageText: ImageText[];

    addText: () => void;
    saveText: () => Promise<void>;

    getText: () => Promise<void>;
    extractText: () => Promise<void>;
    transviewText: () => Promise<void>;
    // updateText: (id: string) => void;
    // deleteText: (id: string) => void;

    saveImage: () => void;

    generateImage: () => Promise<void>;
    colorizeImage: () => Promise<void>;

    imageColorsInvert: boolean;
    setImageColorsInvert: Dispatch<SetStateAction<boolean>>;
    imageColorsContrast: number;
    setImageColorsContrast: Dispatch<SetStateAction<number>>;
    imageColorsHue: number;
    setImageColorsHue: Dispatch<SetStateAction<number>>;
    imageColorsSaturation: number;
    setImageColorsSaturation: Dispatch<SetStateAction<number>>;
    imageColorsBrightness: number;
    setImageColorsBrightness: Dispatch<SetStateAction<number>>;

    defaultsToggled: boolean;
    toggleDefaults: () => void;
    resetToDefaults: () => void;

    flipVertical: boolean;
    setFlipVertical: Dispatch<SetStateAction<boolean>>;
    flipHorizontal: boolean;
    setFlipHorizontal: Dispatch<SetStateAction<boolean>>;

    viewFullscreen: () => void;
    shareImage: () => void;
    viewAbout: () => void;

    updateVersionContent: (versionID: string, value: string) => void;
    toggleVersionViewable: (versionID: string) => void;
    duplicateTextItem: (versionID: string) => void;
    deleteTextItem: (versionID: string) => void;
    updateTextCoordinates: (versionID: string, coordinates: any) => void;
}


export interface ImageDimensions {
    width: number;
    height: number;
}


export interface ImageBoxDimensions {
    width: number;
    height: number;
    left: number;
    top: number;
}


export {
    ImageText,
    ImageTextVersionTextline,
    ImageTextVersionTextarea,
}
