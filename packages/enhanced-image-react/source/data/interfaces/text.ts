export interface ImageTextVersion {
    id: string;
    type: 'TEXTAREA' | 'TEXTLINE';

    xCoordPercentage: number;
    yCoordPercentage: number;

    perspective: string;
    rotation: string;
    skew: string;

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
    fontSizePercentage: number;
    letterSpacingPercentage: number;
    wordSpacingPercentage: number;
    lineHeightPercentage: number;

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
