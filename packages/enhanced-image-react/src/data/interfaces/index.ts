import themes from '@plurid/utilities.themes';



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
    controls?: boolean;
    height?: number;
    about?: boolean;
    loop?: boolean;
    microview?: boolean;

    /**
     * Inline styling object for the image.
     */
    imageStyle?: any;

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
