export interface ITextImage {
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


export interface ITextSelectImageData {
    id: string;
    imageHeight: number;
    imageWidth: number;
    imageText: ITextImage[];
}
