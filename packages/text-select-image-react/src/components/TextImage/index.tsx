import React, { Component } from 'react';

import {
    StyledTextImage,
    StyledTextImageTextContent,
} from './styled';

import Context from '../../context';

// import { ITextImage } from '../../interfaces/image-text';

import TextImageEditor from '../TextImageEditor';

import { EDITOR_HEIGHT } from '../../data/constants';



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

    private textImage: any;

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
        editorYCoord: -EDITOR_HEIGHT,

        imageWidth: 0,
        imageHeight: 0,
        editorWidth: 0,
        editorSet: false,
    };

    constructor(props: any) {
        super(props);

        this.textImage = React.createRef();
    }

    public componentDidMount() {
        document.addEventListener('mouseup', this.dragMouseUp);
        document.addEventListener('mousemove', this.dragMouseMove);
    }

    public componentDidUpdate() {
        const { editorSet } = this.state;

        if (!editorSet) {
            this.setState({
                imageWidth: this.context.imageWidth,
                imageHeight: this.context.imageHeight,
                editorWidth: this.context.editorWidth,
            },
                this.editorPosition
            );
        }
    }

    public componentWillUnmount() {
        document.removeEventListener('mouseup', this.dragMouseUp);
        document.removeEventListener('mousemove', this.dragMouseMove);
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

            editorXCoord,
            editorYCoord,
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
            imageWidth,
            editorWidth,
        } = this.context;

        console.log(
            imageWidth,
            editorWidth,
        );

        const editableDiv = (
            <div
                contentEditable={textEditable}
                suppressContentEditableWarning={true}
            >
                {text.content}
            </div>
        );

        const textContent = (
            <StyledTextImageTextContent
                theme={theme}
                toggledEditable={toggledEditable}
                editMode={textEditable}
                dragMode={textDraggable}
                draggingMode={dragging}
                viewable={textViewable}
                color={color}
            >
                {link && !toggledEditable
                    ? (
                        <a href={linkTo} target="_blank">
                            {editableDiv}
                        </a>
                    ) : (
                        <>{editableDiv}</>
                    )
                }
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

                    onMouseDown={this.dragMouseDown}
                    onMouseUp={this.dragMouseUp}

                    onKeyDown={this.handleKey}
                    tabIndex="0"

                    ref={this.textImage}
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

                            xCoord={editorXCoord}
                            yCoord={editorYCoord}
                        />
                    )}
                </StyledTextImage>
            </div>
        );
    }

    private handleKey = (event: any) => {
        this.handleShortcuts(event);
        this.handleArrows(event);
    }

    private handleShortcuts = (event: any) => {
        const {
            textEditable,
            text,
        } = this.state;

        const {
            duplicateTextImage,
            deleteTextImage,
        } = this.context;

        const { key, altKey } = event;

        if (key === '†' && altKey) {
            this.toggleTextEditable();
        }

        if (textEditable) {
            return;
        }

        switch(key) {
            case 't':
                this.toggleTextEditable();
                break;
            case 'g':
                this.toggleTextDraggable();
                break;
            case 'v':
                this.toggleTextViewable();
                break;
            case 'd':
                duplicateTextImage(text.id);
                break;
            case 'x':
                deleteTextImage(text.id);
                break;
        }
    }

    private handleArrows = (event: any) => {
        const {
            textDraggable,
        } = this.state;

        if (!textDraggable) {
            return;
        }

        this.moveWithArrows(event);
        if (event.shiftKey) {
            this.moveWithArrows(event, 10);
        }
    }

    private moveWithArrows(event: any, step: number = 1) {
        const { key } = event;

        const { xCoord, yCoord } = this.state;

        this.editorPosition();

        switch(key) {
            case 'ArrowLeft':
                    this.setState({
                        xCoord: xCoord - step
                    });
                    break;
            case 'ArrowRight':
                this.setState({
                    xCoord: xCoord + step
                });
                break;
            case 'ArrowUp':
                this.setState({
                    yCoord: yCoord - step
                });
                break;
            case 'ArrowDown':
                this.setState({
                    yCoord: yCoord + step
                });
                break;
        }
    }

    private dragMouseDown = (e: any) => {
        const { textDraggable } = this.state;
        if (!textDraggable) {
            return;
        }

        e.preventDefault();

        const pageX = e.pageX;
        const pageY = e.pageY;

        this.setState({
            dragging: true,
            pos3: pageX,
            pos4: pageY,
        });
    }

    private dragMouseMove = (e: any) => {
        const { dragging } = this.state;
        if (!dragging) {
            return;
        }

        e.preventDefault();

        const {
            pos3,
            pos4,
        } = this.state;

        const { offsetLeft, offsetTop } = this.textImage.current;

        const pageX = e.pageX;
        const pageY = e.pageY;

        const diffX = pageX - pos3;
        const diffY = pageY - pos4;

        // calculate the new cursor position:
        this.setState({
            pos1: pos3,
            pos2: pos4,
            pos3: pageX,
            pos4: pageY,
            xCoord: offsetLeft + diffX,
            yCoord: offsetTop + diffY,
        },
            this.editorPosition
        );
    }

    private dragMouseUp = () => {
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

    private editorPosition() {
        const {
            imageWidth,
            imageHeight,
            // editorWidth,
            editorSet,
        } = this.state;

        const editorWidth = 744;

        const {
            offsetLeft,
            offsetTop,
            offsetHeight,
        } = this.textImage.current;

        // // // Do not let editor to go to the right.
        let editorXCoord = offsetLeft + editorWidth > imageWidth
            ? -1 * (offsetLeft + editorWidth - imageWidth)
            : -17;

        // // // Do not let editor to go to the left.
        if (offsetLeft < 17) {
            editorXCoord = offsetLeft * -1;
        }

        // // // Do not let editor to go to over the top.
        let editorYCoord = offsetTop < 34
            ?  offsetHeight
            : -34;

        this.setState({
            editorXCoord,
            editorYCoord,
            editorSet: true,
        });
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
