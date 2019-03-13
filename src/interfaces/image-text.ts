export interface ITextImage {
    id: string,
    begin: number,
    end: number,
    xPercentage: number,
    yPercentage: number,
    xCoord: number,
    yCoord: number,
    perspective: string,
    rotation: string,
    skew: string,
    fontFamily: string,
    fontSize: number,
    letterSpacing: number,
    lineHeight: number,
    wordSpacing: number,
    textContent: string
}


export interface ITextSelectImageData {
    id: string,
    imageText: ITextImage[]
}
