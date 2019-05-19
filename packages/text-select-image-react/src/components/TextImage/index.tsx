import React, { Component } from 'react';

import { StyledTextImage } from './styled';

import Context from '../../context';

// import { ITextImage } from '../../interfaces/image-text';

import TextImageEditor from '../TextImageEditor';



// interface ITextImageProps {
//     textImage: ITextImage;
// }

// interface ITextImageState {
//     text: ITextImage;
//     xCoord: number;
//     yCoord: number;
//     textEditable: boolean;
//     draggable: boolean;
//     dragging: boolean;
//     showEditor: boolean;
//     pos1: number;
//     pos2: number;
//     pos3: number;
//     pos4: number;
//     fontSizeValue: number;
//     letterSpacingValue: number;
//     wordSpacingValue: number;
//     fontFamilyValue: string;
//     colorValue: string;
//     colorValueStyle: string;
//     textLink: boolean;
//     textLinkToValue: string;
//     textBold: boolean;
//     textItalic: boolean;
//     textContent: string;
//     textChanged: boolean;
//     textViewable: boolean;
//     editorXCoord: number;
//     editorYCoord: number;
// }


class TextImage extends Component<
    any, any
    // ITextImageProps, ITextImageState
> {
    static contextType = Context;

    state = {
        text: this.props.text,
        textLink: this.props.text.textLink,
        textLinkToValue: this.props.text.textLinkToValue,
        showEditor: false,
        xCoord: this.props.text.xCoord,
        yCoord: this.props.text.yCoord,
        // textEditable: false,
        // draggable: false,
        // dragging: false,
        // pos1: 0,
        // pos2: 0,
        // pos3: 0,
        // pos4: 0,
        // fontSizeValue: 0,
        // letterSpacingValue: 0,
        // wordSpacingValue: 0,
        // fontFamilyValue: '',
        // colorValue: '',
        // colorValueStyle: '',

        // textBold: false,
        // textItalic: false,
        // textContent: '',
        // textChanged: false,
        // textViewable: false,
        // editorXCoord: 0,
        // editorYCoord: 0,
        // toggleEditor: false,
        // editable: false,
    };

    public componentDidLoad() {
        // const {
        //     text,
        //     xCoord,
        //     yCoord,
        // } = this.state;

        // this.setState({
        //     xCoord,
        //     yCoord,
        //     fontSizeValue: text.fontSize,
        //     fontFamilyValue: text.fontFamily,
        //     letterSpacingValue: text.letterSpacing,
        //     wordSpacingValue: text.wordSpacing,
        //     textLink: text.link,
        //     textLinkToValue: text.linkTo,
        //     textBold: text.bold,
        //     textItalic: text.italic,
        //     textViewable: text.viewable,
        // });

        // this.colorValue = this.text.color || this.colorValue;
        // if (this.editable) {
        //     this.colorValue = this.text.color || 'black';
        //     this.colorValueStyle = this.colorValue;
        // }
    }

    public componentWillUpdate() {
        // if (this.draggable) {
        //     // console.log('aa', this.textImageSpanContent);
        //     this.textImageSpanContent.onmousedown = this.dragMouseDown;
        //     this.textImageSpanContent.onmouseup = this.mouseUp;
        // } else {
        //     this.textImageSpanContent.onmousedown = null;
        //     this.textImageSpanContent.onmouseup = null;
        // }

        // // Do not let editor to go to the right.
        // this.editorXCoord = this.textImageSpan.offsetLeft + EDITOR_WIDTH > this.imageWidth
        //     ? -1 * (this.textImageSpan.offsetLeft + EDITOR_WIDTH - this.imageWidth)
        //     : -17;

        // // Do not let editor to go to the left.
        // if (this.textImageSpan.offsetLeft < 17) {
        //     this.editorXCoord = this.textImageSpan.offsetLeft * -1;
        // }

        // // Do not let editor to go to over the top.
        // this.editorYCoord = this.textImageSpan.offsetTop < 34
        //     ? this.textImageSpan.offsetHeight
        //     : -34;

        // this.colorValueStyle = !this.editable ? '' : this.colorValue;

        // if (this.recordChanged()) {
        //     const record = { ...this.text };
        //     record.xCoord = this.xCoord;
        //     record.yCoord = this.yCoord;
        //     record.fontSize = this.fontSizeValue;
        //     record.letterSpacing = this.letterSpacingValue;
        //     record.wordSpacing = this.wordSpacingValue;
        //     record.fontFamily = this.fontFamilyValue;
        //     record.color = this.colorValue;
        //     record.bold = this.textBold;
        //     record.italic = this.textItalic;
        //     record.content = this.textImageSpanContent.innerText;

        //     this.updateText(this.text.id, record);
        // }
    }

    public render() {
        const {
            textLink,
            textLinkToValue,
            text,
            showEditor,

            yCoord,
            xCoord,
            // editable,
            // draggable,
            // dragging,
            // textViewable,
            // colorValueStyle,
            // fontFamilyValue,
            // fontSizeValue,
            // textBold,
            // textItalic,
            // letterSpacingValue,
            // wordSpacingValue,
        } = this.state;

        const {
            toggledEditable,
        } = this.context;

        // console.log(text);

        const textContent = textLink
            ? (<a href={textLinkToValue} target="_blank">
                {text.content}
            </a>)
            : (
                (<div>
                    {text.content}
                </div>)
            );

        return (
            <div>
               <StyledTextImage
                    editMode={toggledEditable}

                    // className={`
                    //     text-image-span
                    //     ${editable ? 'text-image-span-editable' : '' }
                    //     ${draggable ? 'text-image-span-draggable' : '' }
                    //     ${dragging ? 'text-image-span-dragging' : '' }
                    //     ${textViewable ? 'text-image-span-viewable' : '' }
                    // `}
                    // style={{
                    //     top: yCoord + 'px',
                    //     left: xCoord + 'px',
                    //     color: colorValueStyle,
                    //     fontFamily: fontFamilyValue,
                    //     fontSize: fontSizeValue + 'px',
                    //     fontWeight: textBold ? 'bold' : 'normal',
                    //     fontStyle: textItalic ? 'italic' : 'normal',
                    //     letterSpacing: letterSpacingValue + 'px',
                    //     // lineHeight: text.lineHeight + '',
                    //     wordSpacing: wordSpacingValue + 'px',
                    // }}

                    style={{
                        top: yCoord + 'px',
                        left: xCoord + 'px',
                    }}

                    onMouseEnter={this.showEditor}
                    onMouseLeave={this.showEditor}
                >
                    <div
                        // className="text-image-span-content"
                        // contentEditable={textEditable}
                        // onKeyUp={updateTextContent}
                    >
                        {textContent}
                    </div>

                    {/* {showEditor && (
                        <TextImageEditor
                            toggleElement={this.toggleElement}
                        />
                    )} */}
                    <TextImageEditor
                        toggleElement={this.toggleElement}
                        changeValue={this.changeValue}
                    />
                </StyledTextImage>
            </div>
        );
    }

    // public render() {
    //     const { text } = this.state;

    //     return (
    //         <span
    //             class={`
    //                 text-image-span
    //                 ${this.editable ? 'text-image-span-editable' : '' }
    //                 ${this.draggable ? 'text-image-span-draggable' : '' }
    //                 ${this.dragging ? 'text-image-span-dragging' : '' }
    //                 ${this.textViewable ? 'text-image-span-viewable' : '' }
    //             `}
    //             style={{
    //                 top: this.yCoord + 'px',
    //                 left: this.xCoord + 'px',
    //                 color: this.colorValueStyle,
    //                 fontFamily: this.fontFamilyValue,
    //                 fontSize: this.fontSizeValue + 'px',
    //                 fontWeight: this.textBold ? 'bold' : 'normal',
    //                 fontStyle: this.textItalic ? 'italic' : 'normal',
    //                 letterSpacing: this.letterSpacingValue + 'px',
    //                 // lineHeight: text.lineHeight + '',
    //                 wordSpacing: this.wordSpacingValue + 'px',
    //             }}
    //             onMouseEnter={this.toggleEditor}
    //             onMouseLeave={this.toggleEditor}
    //             ref={(el) => this.textImageSpan = el as HTMLSpanElement}
    //         >
    //             <span
    //                 class="text-image-span-content"
    //                 ref={(el) => this.textImageSpanContent = el as HTMLSpanElement}
    //                 contentEditable={this.textEditable}
    //                 onKeyUp={this.updateTextContent}
    //             >
    //                 {this.textLink
    //                     ? (<a href={this.textLinkToValue} target="_blank">
    //                         {text.content}
    //                     </a>)
    //                     : (<span>
    //                         {text.content}
    //                     </span>)
    //                 }
    //             </span>

    //             {this.showEditor && (
    //                 <span
    //                     style={{
    //                         left: `${this.editorXCoord}px`,
    //                         top: `${this.editorYCoord}px`,
    //                     }}
    //                     class="text-image-span-editor"
    //                 >
    //                     <TextImageEditor
    //                         textEditable={this.textEditable}
    //                         toggleTextEditable={this.toggleTextEditable}
    //                         draggable={this.draggable}
    //                         toggleDraggable={this.toggleDraggable}
    //                         toggleEditor={this.toggleEditor}
    //                         textViewable={this.textViewable}
    //                         toggleTextViewable={this.toggleTextViewable}

    //                         textId={this.text.id}
    //                         fontSizeValue={this.fontSizeValue}
    //                         letterSpacingValue={this.letterSpacingValue}
    //                         wordSpacingValue={this.wordSpacingValue}
    //                         fontFamilyValue={this.fontFamilyValue}
    //                         colorValue={this.colorValue}
    //                         textLink={this.textLink}
    //                         textLinkToValue={this.textLinkToValue}
    //                         textBold={this.textBold}
    //                         textItalic={this.textItalic}

    //                         changeValue={this.changeValue}
    //                         toggleElement={this.toggleElement}

    //                         selectableFonts={selectableFonts}

    //                         duplicateText={this.duplicateText}
    //                         removeText={this.removeText}
    //                     />
    //                 </span>
    //             )}
    //         </span>
    //     );
    // }


    // private dragMouseDown = (e: any) => {
    //     this.dragging = true;

    //     e = e || window.event;
    //     e.preventDefault();
    //     // get the mouse cursor position at startup:
    //     this.pos3 = e.clientX;
    //     this.pos4 = e.clientY;

    //     document.onmouseup = this.closeDragElement;
    //     // call a function whenever the cursor moves:
    //     document.onmousemove = this.elementDrag;
    // }

    // private elementDrag = (e: any) => {
    //     e.preventDefault();

    //     // calculate the new cursor position:
    //     this.pos1 = this.pos3 - e.clientX;
    //     this.pos2 = this.pos4 - e.clientY;
    //     this.pos3 = e.clientX;
    //     this.pos4 = e.clientY;

    //     this.xCoord = this.textImageSpan.offsetLeft - this.pos1;
    //     this.yCoord = this.textImageSpan.offsetTop - this.pos2;
    // }

    // private closeDragElement = () => {
    //     /* stop moving when mouse button is released:*/
    //     document.onmouseup = null;
    //     document.onmousemove = null;
    // }

    // private mouseUp = () => {
    //     this.setState({
    //         dragging: false,
    //     });
    // }

    private showEditor = () => {
        const { toggledEditable } = this.context;

        if (toggledEditable) {
            this.setState((prevState: any) => ({
                showEditor: !prevState.showEditor,
            }));
        }
    }

    // private toggleDraggable = () => {
    //     this.setState((prevState: any) => ({
    //         draggable: !prevState.draggable,
    //     }));

    //     const { textEditable } = this.state;

    //     if (textEditable) {
    //         this.setState({
    //             textEditable: false,
    //         });
    //     }
    // }

    // private toggleTextEditable = () => {
    //     this.setState((prevState: any) => ({
    //         textEditable: !prevState.textEditable,
    //     }));

    //     const { draggable } = this.state;

    //     if (draggable) {
    //         this.setState({
    //             draggable: false,
    //         });
    //     }
    // }

    // private toggleTextViewable = () => {
    //     this.setState((prevState: any) => ({
    //         textViewable: !prevState.textViewable,
    //     }));
    // }

    private changeValue = (type: string, value: number | string) => {
        const typeValue = `${type}Value`;
        this[typeValue] = value;
    }

    private toggleElement = (element: string) => {
        // this[element] = !this[element];
    }

    // private updateTextContent = () => {
    //     this.textContent = this.textImageSpanContent.innerText;
    //     this.textChanged = true;
    // }

    // private recordChanged = () => {
    //     const text = this.text;
    //     if (
    //         text.xCoord !== this.xCoord
    //         || text.yCoord !== this.yCoord
    //         || text.fontSize !== this.fontSizeValue
    //         || text.letterSpacing !== this.letterSpacingValue
    //         || text.wordSpacing !== this.wordSpacingValue
    //         || text.fontFamily !== this.fontFamilyValue
    //         || text.color !== this.colorValue
    //         || text.bold !== this.textBold
    //         || text.italic !== this.textItalic
    //         || text.viewable !== this.textViewable
    //         // || this.textChanged
    //     ) {
    //         return true;
    //     }
    //     return false;
    // }
}


export default TextImage;
