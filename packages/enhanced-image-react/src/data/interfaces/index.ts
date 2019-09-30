import { Dispatch, SetStateAction } from 'react';

import themes, { Theme } from '@plurid/utilities.themes';



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

    theme?: keyof typeof themes;
    about?: boolean;
    /**
     * Inline React style object for the image.
     */
    imageStyle?: React.CSSProperties;

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
    depictImageID?: string;

    // updateDebounce?: number;
    // moreLimit?: number;
    // getTextOnLoad?: boolean;
}


export interface Context {
    src: string;
    srcset?: string;
    alt: string;

    theme: Theme;
    about: boolean;
    imageStyle: React.CSSProperties;

    apiEndpoint: string;
    apiKey: string | undefined;
    userToken: string | undefined;
    depictImageID: string | undefined;

    handleLoadedImage: (image: React.SyntheticEvent<HTMLImageElement, Event>) => Promise<void>;
    loadedImage: boolean;

    imageDimensions: ImageDimensions,
    // videoContainerDimensions: VideoContainerDimensions;
    // videoBoxDimensions: VideoBoxDimensions;

    setMessage: Dispatch<SetStateAction<string>>;
    setMessageTimed: (message: string, time: number) => void;
    setShowSpinner: Dispatch<SetStateAction<boolean>>;

    showSettingsButton: boolean;
    setShowSettingsButton: Dispatch<SetStateAction<boolean>>;

    showSettingsMenu: boolean;
    setShowSettingsMenu: Dispatch<SetStateAction<boolean>>;

    editableText: boolean;
    setEditableText: Dispatch<SetStateAction<boolean>>;

    imageText: ImageText[];

    // addText: () => void;
    // saveText: () => Promise<void>;
    // getText: () => Promise<void>;
    // updateText: (id: string) => void;
    // deleteText: (id: string) => void;
}


export interface ImageDimensions {
    width: number;
    height: number;
}


export interface ImageText {

}