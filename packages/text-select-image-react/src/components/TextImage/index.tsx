import React, { Component } from 'react';

import {
    StyledTextImage,
    StyledTextImageTextContent,
} from './styled';

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

        textEditable: false,
        textDraggable: false,
        dragging: false,
        textViewable: false,

        pos1: 0,
        pos2: 0,
        pos3: 0,
        pos4: 0,

        editorXCoord: 0,
        editorYCoord: 0,
    };

    public componentDidLoad() {
    }

    public componentWillUpdate() {
        // if (this.draggable) {
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
    }

    public render() {
        const {
            text,
            showEditor,

            yCoord,
            xCoord,

            textEditable,
            textDraggable,
            dragging,
            textViewable,
        } = this.state;

        const {
            color,
            fontFamily,
            fontSize,
            bold,
            italic,
            letterSpacing,
            lineHeight,
            wordSpacing,
            // content,
            link,
            linkTo,
            // viewable,
        } = this.props.text;

        const {
            theme,
            toggledEditable,
        } = this.context;

        const textContent = link && !toggledEditable
            ? (
                <StyledTextImageTextContent
                    theme={theme}
                    editMode={toggledEditable}
                >
                    <a href={linkTo} target="_blank">
                        {text.content}
                    </a>
                </StyledTextImageTextContent>
            )
            : (
                <StyledTextImageTextContent
                    theme={theme}
                    editMode={toggledEditable}
                >
                    {text.content}
                </StyledTextImageTextContent>
            );

        return (
            <div>
               <StyledTextImage
                    theme={theme}
                    editMode={toggledEditable}
                    dragMode={textDraggable}
                    draggingMode={dragging}
                    viewable={textViewable}

                    style={{
                        top: yCoord + 'px',
                        left: xCoord + 'px',
                        color: toggledEditable ? color : 'transparent',
                        fontFamily,
                        fontSize: fontSize + 'px',
                        fontWeight: bold ? 'bold' : 'normal',
                        fontStyle: italic ? 'italic' : 'normal',
                        letterSpacing: letterSpacing + 'px',
                        lineHeight: lineHeight + '',
                        wordSpacing: wordSpacing + 'px',
                    }}

                    onMouseEnter={this.showEditor}
                    onMouseLeave={this.showEditor}
                >
                    {textContent}

                    {showEditor && (
                        <TextImageEditor
                            toggleTextEditable={this.toggleTextEditable}
                            textEditable={textEditable}

                            toggleTextDraggable={this.toggleTextDraggable}
                            textDraggable={textDraggable}

                            toggleTextViewable={this.toggleTextViewable}
                            textViewable={textViewable}

                            text={this.props.text}
                        />
                    )}

                    {/* <TextImageEditor
                        toggleTextEditable={this.toggleTextEditable}
                        textEditable={textEditable}

                        toggleTextDraggable={this.toggleTextDraggable}
                        textDraggable={textDraggable}

                        toggleTextViewable={this.toggleTextViewable}
                        textViewable={textViewable}

                        text={text}
                    /> */}
                </StyledTextImage>
            </div>
        );
    }

    private dragMouseDown = (e: any) => {
        this.setState({
            dragging: true,
        });

        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:

        this.setState({
            pos3: e.clientX,
            pos4: e.clientY,
        });

        document.onmouseup = this.closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = this.elementDrag;
    }

    private elementDrag = (e: any) => {
        e.preventDefault();

        const { pos3, pos4 } = this.state;

        // calculate the new cursor position:
        this.setState({
            pos1: pos3,
            pos2: pos4,
            pos3: e.clientX,
            pos4: e.clientY,
            // xCoord: this.textImageSpan.offsetLeft - pos1,
            // yCoord = this.textImageSpan.offsetTop - pos2,
        })
    }

    private closeDragElement = () => {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }

    private mouseUp = () => {
        this.setState({
            dragging: false,
        });
    }

    private showEditor = () => {
        const { toggledEditable } = this.context;

        if (toggledEditable) {
            this.setState((prevState: any) => ({
                showEditor: !prevState.showEditor,
            }));
        }
    }

    private toggleTextEditable = () => {
        this.setState((prevState: any) => ({
            textEditable: !prevState.textEditable,
        }));

        const { textDraggable } = this.state;

        if (textDraggable) {
            this.setState({
                textDraggable: false,
            });
        }
    }

    private toggleTextDraggable = () => {
        this.setState((prevState: any) => ({
            textDraggable: !prevState.textDraggable,
        }));

        const { textEditable } = this.state;

        if (textEditable) {
            this.setState({
                textEditable: false,
            });
        }
    }

    private toggleTextViewable = () => {
        this.setState((prevState: any) => ({
            textViewable: !prevState.textViewable,
        }));
    }

    private updateTextContent = () => {
    //     this.textContent = this.textImageSpanContent.innerText;
    //     this.textChanged = true;
    }
}


export default TextImage;
