export interface IImageTextVersion {
    id: string;
    xCoordPercentage: number;
    yCoordPercentage: number;
    perspective: string;
    rotation: string;
    skew: string;
    color: string;
    fontFamily: string;
    fontSizePercentage: number;
    bold: boolean;
    italic: boolean;
    letterSpacingPercentage: number;
    lineHeight: string | number;
    wordSpacingPercentage: number;
    content: string;
    link: boolean;
    linkTo: string;
    viewable: boolean;
}


export interface IImageText {
    id: string;
    currentVersionId: string;
    versions: IImageTextVersion[];
}


export interface ITextSelectImageData {
    imageSha: string;
    imagePath: string;
    imageSource: string;
    imageHeight: number;
    imageWidth: number;
    imageText: IImageText[];
}
