interface ImageText {
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


interface TSIData {
    id: string,
    imageText: ImageText[]
}
