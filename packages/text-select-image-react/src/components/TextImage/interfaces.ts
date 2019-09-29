import { ITextImage } from '../../interfaces/image-text';



export interface ITextImageProps {
    textImage: ITextImage;
}

export interface ITextImageState {
    text: ITextImage;
    xCoord: number;
    yCoord: number;
    textEditable: boolean;
    draggable: boolean;
    dragging: boolean;
    showEditor: boolean;
    pos1: number;
    pos2: number;
    pos3: number;
    pos4: number;
    fontSizeValue: number;
    letterSpacingValue: number;
    wordSpacingValue: number;
    fontFamilyValue: string;
    colorValue: string;
    colorValueStyle: string;
    textBold: boolean;
    textItalic: boolean;
    textContent: string;
    textChanged: boolean;
    textViewable: boolean;
    editorXCoord: number;
    editorYCoord: number;
}
