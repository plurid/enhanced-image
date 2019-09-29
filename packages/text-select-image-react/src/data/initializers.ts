import {
    ITextSelectImageData,
    IImageTextVersion,
} from '../interfaces/image-text';

export const emptyImageText: any[] = [];


export const emptyTextSelectImage: ITextSelectImageData = {
    imageSha: '',
    imagePath: '',
    imageSource: '',
    imageHeight: 0,
    imageWidth: 0,
    imageText: emptyImageText,
    createdBy: '',
};


export const newTextImageVersion: IImageTextVersion = {
    id: '',
    // createdBy: '',
    // computerGenerated: false,
    // userGenerated: true,
    // ownerGenerated: false,
    // adminGenerated: false,
    xCoordPercentage: 5,
    yCoordPercentage: 10,
    perspective: '',
    rotation: '',
    skew: '',
    color: 'white',
    fontFamily: 'Arial',
    fontSizePercentage: 5,
    bold: false,
    italic: false,
    letterSpacingPercentage: 0,
    lineHeight: 'auto',
    wordSpacingPercentage: 0,
    content: 'New Text',
    link: false,
    linkTo: '',
    viewable: false,
};
