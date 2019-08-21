export interface ITextSelectImageProps {
    about?: boolean;
    alt?: string;
    textFunctions?: boolean;
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
    userToken?: string;
    depictImageID?: string;

    updateDebounce?: number;

    moreLimit?: number;
    getTextOnLoad?: boolean;
}


export interface ITextSelectImageState {
    apiEndpoint: string;
    updateDebounce: number;
    contentMoreLimit: number;

    theme: any;
    themeName: string;
    about: boolean;
    controls: boolean;
    textFunctions?: boolean;

    textSelectImageElHeight: number;

    loading: boolean;
    imageLoaded: boolean;
    imageURL: string;
    imageSha: string;
    imageHeight: number;
    imageWidth: number;
    imageNaturalHeight: number;
    imageNaturalWidth: number;
    imageText: any;
    message: string;

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
    updateTextImageBatch: (id: string, elements: any[]) => any;
    deleteTextImage: (id: string) => any;

    getText: () => any;
    getAndSetText: () => any;
    extractText: () => any;
    saveImageText: () => any;
}
