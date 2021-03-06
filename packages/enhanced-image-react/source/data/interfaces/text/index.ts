export interface ImageTextVersion {
    id: string;
    type: 'TEXTAREA' | 'TEXTLINE';

    position: {
        x: number; // x position percent
        y: number; // y position percent
    };

    transform: {
        perspective: number;
        rx: number; // x rotation
        ry: number; // y rotation
        rz: number; // z rotation
        sx: number; // x skew
        sy: number; // y skew
    };

    viewable: boolean;
}


export interface ImageTextVersionTextarea extends ImageTextVersion {
    type: 'TEXTAREA';
    content: string;
    [key: string]: any;
}



export interface TextlineFont {
    weight: string;             // font weight (bold)
    style: string;              // font style (italic)
    family: string;             // font family
    size: number;               // font size percent
    letterSpacing: number;      // letter spacing percent
    wordSpacing: number;        // word spacing percent
    lineHeight: number;         // line height percent
}


export interface TextlineLink {
    active: boolean;
    to: string;
}


export interface TextlineAction {
    active: boolean;
    type: string;
}


export interface TextlineTransviewData {
    backgrounded: boolean;
    language: string;
    content: string;
}

export interface TextlineTransview {
    /**
     * The targeted transview language or `SOURCE` for the default text.
     */
    active: string;
    data: TextlineTransviewData[];
}


export interface ImageTextVersionTextline extends ImageTextVersion {
    type: 'TEXTLINE';

    font: TextlineFont;
    color: string;
    content: string;
    transview: TextlineTransview;
    link: TextlineLink;
    action: TextlineAction;
}


export interface ImageText {
    id: string;
    currentVersionId: string;
    versions: (ImageTextVersionTextline | ImageTextVersionTextarea)[];
}


export interface ImageData {
    imageSHA: string;
    imagePath: string;
    imageSource: string;
    imageHeight: number;
    imageWidth: number;
    imageText: ImageText[];
    createdBy: string;
}
