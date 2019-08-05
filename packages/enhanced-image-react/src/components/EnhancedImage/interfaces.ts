export interface EnhancedImageProps {
    src: string;
    alt?: string;
    height?: number;
    width?: number;
    controls?: boolean;
    theme?: string;
    about?: boolean;
    imageText?: any;
    updateDebounce?: number;

    // To be specified when using another API than https://api.plurid.com
    // GraphlQL-based
    apiEndpoint?: string;

    // The apiKey contains the domain allowed to make requests
    // To be specified when using as a service provider
    // apiKey obtained from https://depict.plurid.com/api
    apiKey?: string;
}


export interface EnhancedImageState {
    [key: string]: any;
    // apiEndpoint: string;
    // updateDebounce: number;

    // theme: any;
    // themeName: string;
    // about: boolean;
    // controls: boolean;
    // editorWidth: number;
    // loading: boolean;

    // imageLoaded: boolean;
    // imageHeight: number;
    // imageWidth: number;
    // imageNaturalHeight: number;
    // imageNaturalWidth: number;

    // toggleSettingsButton: () => void;
    // toggledSettingsButton: boolean;
    // toggleSettings: () => void;
    // toggledSettings: boolean;
    // toggleEditable: () => void;
    // toggledEditable: boolean;
    // selectText: any;

    // createTextImage: () => any;
    // duplicateTextImage: (duplicateId: string) => any;
    // updateTextImage: (text: any) => any;
    // updateTextImageField: (id: string, element: string, value: any) => any;
    // deleteTextImage: (id: string) => any;
    // setEditorWidth: (value: number) => any;
}
