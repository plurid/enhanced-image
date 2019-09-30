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
    height?: number;
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
    height: number;
    about: boolean;
    imageStyle: React.CSSProperties;

    apiEndpoint: string;
    apiKey: string | undefined;
    userToken: string | undefined;
    depictImageID: string | undefined;


    handleLoadedImage: () => void;

    // setMessage: Dispatch<SetStateAction<string>>;
    // setMessageTimed: (message: string, time: number) => void;
    // setShowSpinner: Dispatch<SetStateAction<boolean>>;

    // showSettingsButton: boolean;
    // setShowSettingsButton: Dispatch<SetStateAction<boolean>>;

    // showSettingsMenu: boolean;
    // setShowSettingsMenu: Dispatch<SetStateAction<boolean>>;

    // editableText: boolean;
    // setEditableText: Dispatch<SetStateAction<boolean>>;

    // loadedVideo: boolean;

    // videoDuration: number;

    // videoDimensions: VideoDimensions;
    // videoContainerDimensions: VideoContainerDimensions;
    // videoBoxDimensions: VideoBoxDimensions;

    // videoPlaying: boolean;
    // playVideo: () => void,
    // pauseVideo: () => void,

    // loopVideo: boolean;
    // setLoopVideo: Dispatch<SetStateAction<boolean>>;
    // loopVideoStart: number;
    // setLoopVideoStart: Dispatch<SetStateAction<number>>;
    // loopVideoEnd: number;
    // setLoopVideoEnd: Dispatch<SetStateAction<number>>;

    // microviewVideo: boolean;
    // setMicroviewVideo: Dispatch<SetStateAction<boolean>>;
    // microviewVideoStart: number;
    // setMicroviewVideoStart: Dispatch<SetStateAction<number>>;
    // microviewVideoEnd: number;
    // setMicroviewVideoEnd: Dispatch<SetStateAction<number>>;

    // videoVolume: number;
    // toggleVideoVolume: () => void;
    // handleVideoVolume: (volume: number) => void;

    // videoPlaybackRate: number;
    // handleVideoPlaybackRate: (videoPlaybackRate: number) => void;

    // videoTime: number;
    // handleVideoTime: (videoTime: number) => void;

    // qualitySource: any;
    // setQualitySource: any;

    // showTimescrollTime: boolean;
    // setShowTimescrollTime: Dispatch<SetStateAction<boolean>>;

    // showTimescrollText: boolean;
    // setShowTimescrollText: Dispatch<SetStateAction<boolean>>;

    // videoText: VideoText[];

    // addText: () => void;
    // saveText: () => Promise<void>;
    // getText: () => Promise<void>;
}
