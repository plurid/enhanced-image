export interface ITextSelectImageProps {
    about?: boolean;
    alt?: string;
    controls?: boolean;
    src: string;
    theme?: string;
    // imageText?: any;
    imageStyle?: any;
    atLoad?: any;

    // To be specified when using another API than https://api.plurid.com
    // GraphlQL-based
    apiEndpoint?: string;
    // The apiKey contains the domain allowed to make requests
    // To be specified when using as a service provider
    // apiKey obtained from https://depict.plurid.com/api
    apiKey?: string;
    updateDebounce?: number;

    moreLimit: number;
}


export interface ITextSelectImageState {
    apiEndpoint: string;
    updateDebounce: number;
    contentMoreLimit: number;

    theme: any;
    themeName: string;
    about: boolean;
    controls: boolean;

    loading: boolean;
    imageLoaded: boolean;
    imageSha: string;
    imageHeight: number;
    imageWidth: number;
    imageNaturalHeight: number;
    imageNaturalWidth: number;
    imageText: any;

    toggleSettingsButton: () => void;
    toggledSettingsButton: boolean;
    toggleSettings: () => void;
    toggledSettings: boolean;
    toggleEditable: () => void;
    toggledEditable: boolean;

    editorWidth: number;
    setEditorWidth: (value: number) => any;

    createTextImage: () => any;
    duplicateTextImage: (duplicateId: string) => any;
    updateTextImage: (imageTextId: string, version: any) => any;
    updateTextImageField: (id: string, element: string, value: any) => any;
    deleteTextImage: (id: string) => any;

    getText: () => any;
    getAndSetText: () => any;
    extractText: () => any;
    saveImageText: () => any;
}
