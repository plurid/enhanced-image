export interface ITextImage {
    id: string;
    xPercentage: number;
    yPercentage: number;
    xCoord: number;
    yCoord: number;
    perspective: string;
    rotation: string;
    skew: string;
    color: string;
    fontFamily: string;
    fontSizePercentage: number;
    fontSize: number;
    bold: boolean;
    italic: boolean;
    letterSpacingPercentage: number;
    letterSpacing: number;
    lineHeight: string | number;
    wordSpacingPercentage: number;
    wordSpacing: number;
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
