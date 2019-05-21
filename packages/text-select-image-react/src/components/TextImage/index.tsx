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
    };

    constructor(props: any) {
        super(props);

        this.textImage = React.createRef();
    }

    public componentDidMount() {
        document.addEventListener('mouseup', this.dragMouseUp);
    }

    public componentWillUnmount() {
        document.removeEventListener('mouseup', this.dragMouseUp);
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
        } = this.context;

        const textContent = link && !toggledEditable
            ? (
                <StyledTextImageTextContent
                    theme={theme}
                    toggledEditable={toggledEditable}
                    editMode={textEditable}
                    dragMode={textDraggable}
                    draggingMode={dragging}
                    viewable={textViewable}
                    color={color}
                >
                    <a href={linkTo} target="_blank">
                        {text.content}
                    </a>
                </StyledTextImageTextContent>
            )
            : (
                <StyledTextImageTextContent
                    theme={theme}
                    toggledEditable={toggledEditable}
                    editMode={textEditable}
                    dragMode={textDraggable}
                    draggingMode={dragging}
                    viewable={textViewable}
                    color={color}
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

                    onMouseDown={this.dragMouseDown}
                    onMouseMove={this.dragMouseMove}
                    onMouseUp={this.dragMouseUp}

                    onKeyDown={this.handleArrows}
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

    private handleArrows = (event: any) => {
        this.moveWithArrows(event);
        if (event.shiftKey) {
            this.moveWithArrows(event, 10);
        }
    }

    private moveWithArrows(event: any, step: number = 1) {
        const { key } = event;

        const { xCoord, yCoord } = this.state;

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

        const offsetX = e.nativeEvent.offsetX;
        const offsetY = e.nativeEvent.offsetY;

        this.setState({
            dragging: true,
            pos3: offsetX,
            pos4: offsetY,
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

        const offsetX = e.nativeEvent.offsetX;
        const offsetY = e.nativeEvent.offsetY;

        const diffX = pos3 - offsetX;
        const diffY = pos4 - offsetY;

        console.log(offsetLeft, offsetTop);
        console.log(offsetX, offsetY);
        console.log(diffX, diffY);
        console.log('-----------');

        // calculate the new cursor position:
        this.setState({
            pos1: diffX,
            pos2: diffY,
            pos3: offsetX,
            pos4: offsetY,
            xCoord: offsetLeft - diffX,
            yCoord: offsetTop - diffY,
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
        // const {
        //     imageWidth,
        //     editorWidth,
        // } = this.context;
        // const {
        //     offsetLeft,
        //     offsetTop,
        //     offsetHeight,
        // } = this.textImage.current;

        // // // Do not let editor to go to the right.
        // let editorXCoord = offsetLeft + editorWidth > imageWidth
        //     ? -1 * (offsetLeft + editorWidth - imageWidth)
        //     : -17;

        // // // Do not let editor to go to the left.
        // if (offsetLeft < 17) {
        //     editorXCoord = offsetLeft * -1;
        // }

        // // // Do not let editor to go to over the top.
        // let editorYCoord = offsetTop < 34
        //     ?  offsetHeight
        //     : -34;

        // this.setState({
        //     editorXCoord,
        //     editorYCoord,
        // });
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
