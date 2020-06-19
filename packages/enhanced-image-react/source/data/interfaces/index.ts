import {
    Dispatch,
    SetStateAction,
} from 'react';

import themes, {
    Theme,
} from '@plurid/plurid-themes';

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
    /**
     * Image source attribute.
     */
    src: string;
    /**
     * Image source set attribute.
     */
    srcset?: string;
    /**
     * Image alternate text attribute.
     */
    alt?: string;

    /**
     * Inline React style object for the image.
     */
    imageStyle?: React.CSSProperties;
    /**
     * Theme based on `@plurid/plurid-themes`.
     */
    theme?: keyof typeof themes;
    /**
     * Make the Settings Menu and Text Editor UI transparent.
     */
    transparentUI?: boolean;
    /**
     * Hide the About eImage from the Settings Menu.
     */
    about?: boolean;
    /**
     * Renders the Settings Menu as if the user is the owner/generator of the image.
     */
    generator?: boolean;

    /**
     * Function to be run after the image is loaded.
     */
    atLoad?: any;

    /**
     * Function to be run after colors are changed.
     */
    atColorsChange?: (data: any) => any;

    /**
     * GraphlQL based end point.
     * To be specified when using another API than https://api.plurid.com.
     *
     * Default: https://api.plurid.com/graphql.
     */
    apiEndpoint?: string;
    /**
     * API key obtained from https://account.plurid.com/depict
     * when using the default apiEndpoint.
     */
    apiKey?: string;
    /**
     * Owner Token obtained from cookie (JWT).
     */
    ownerToken?: string;
    /**
     * Refresh Owner Token obtained from cookie (JWT).
     */
    refreshOwnerToken?: string;
    /**
     * Database-specific image ID.
     */
    imageID?: string;

    /**
     * Load the image text as soon as the image is loaded.
     */
    getTextOnLoad?: boolean;

    /**
     * To be used with a messaging system.
     *
     * @param {Object} message - `{type, input}`.
     * @param {string} message.type - based on `MESSAGE_TYPES`.
     * @param {any} message.input - based on `MESSAGE_TYPES` inputs.
     */
    sendMessage?: (message: ImageMessage) => void;

    /**
     * Show a notification for the user.
     *
     * @param {Object} timedNotification - `{text, time}`.
     * @param {string} timedNotification.text
     * @param {number} timedNotification.time
     */
    timedNotification?: TimedNotification;

    /**
     * Load image data from outside the component.
     */
    data?: any;

    // updateDebounce?: number;
    // moreLimit?: number;

    initialColors?: ImageColorsData;

    /**
     * Show development tools.
     *
     * Default: `false`.
     */
    development?: boolean;

    /**
     * Hide the Enhanced Image button and silence all the messages.
     *
     * Default: `false`.
     */
    silent?: boolean;
}


export interface Context {
    src: string;
    srcset?: string;
    alt: string;

    imageStyle: React.CSSProperties;
    theme: Theme;
    transparentUI: boolean;
    about: boolean;
    generator: boolean;
    development: boolean;
    silent: boolean;

    apiEndpoint: string;
    apiKey: string | undefined;
    ownerToken: string | undefined;
    imageID: string | undefined;

    databaseImageID: string;

    handleLoadedImage: (image: React.SyntheticEvent<HTMLImageElement, Event>) => Promise<void>;
    loadedImage: boolean;

    imageType: string;

    imageBackground: number;
    cycleImageBackground: any;

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
    downloadText: () => void;
    transviewText: () => Promise<void>;
    // updateText: (id: string) => void;
    // deleteText: (id: string) => void;

    saveImage: () => void;
    saveImageHref: string;
    saveImageDownload: string;

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

    updateTextItemField: (versionID: string, type: string, value: number | string | boolean) => void;
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


export interface ImageMessage {
    type: string;
    input: any;
}

export interface TimedNotification {
    text: string;
    time: number;
}


export interface ImageColorsData {
    invert: number;
    contrast: number;
    hue: number;
    saturation: number;
    brightness: number;
}


export {
    ImageText,
    ImageTextVersionTextline,
    ImageTextVersionTextarea,
}
