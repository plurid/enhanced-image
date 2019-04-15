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
    fontSize: number;
    bold: boolean;
    italic: boolean;
    letterSpacing: number;
    lineHeight: string | number;
    wordSpacing: number;
    content: string;
    link: boolean;
    linkTo: string;
    viewable: boolean;
}


export interface ITextSelectImageData {
    id: string;
    imageText: ITextImage[];
}
