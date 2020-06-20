export interface ImageTextVersion {
    id: string;
    type: 'TEXTAREA' | 'TEXTLINE';

    xPercent: number;
    yPercent: number;

    perspective: string;
    xRotation: number;
    yRotation: number;
    zRotation: number;

    viewable: boolean;
}


export interface ImageTextVersionTextarea extends ImageTextVersion {
    type: 'TEXTAREA';
    content: string;
    [key: string]: any;
}


export interface ImageTextVersionTextline extends ImageTextVersion {
    type: 'TEXTLINE';

    color: string;

    fontWeight: string;
    fontStyle: string;
    fontFamily: string;
    fontSizePercent: number;
    letterSpacingPercent: number;
    wordSpacingPercent: number;
    lineHeightPercent: number;

    content: string;

    link: boolean;
    linkTo: string;
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
