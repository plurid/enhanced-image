import React, { Component } from 'react';

import {
    StyledTextImage,
    StyledTextImageTextContent,
    StyledEditableDiv,
} from './styled';

import Context from '../../context';

// import { ITextImage } from '../../interfaces/image-text';

import TextImageEditor from '../TextImageEditor';
import TextImageMore from '../TextImageMore';

import { EDITOR_HEIGHT } from '../../data/constants';

import {
    valueFromPercentage,
    percentageFromValue,
} from '../../utils/percentage';


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
        content: this.props.text.content,
        contentInput: '',
        showEditor: false,
        showMore: false,

        xCoord: 0,
        yCoord: 0,

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
        editorWidth: 744,

        fontSize: 12,
        letterSpacing: 0,
        wordSpacing: 0,
    };

    constructor(props: any) {
        super(props);

        this.textImage = React.createRef();
    }

    public componentDidMount() {
        document.addEventListener('mouseup', this.dragMouseUp);
        document.addEventListener('mousemove', this.dragMouseMove);

        this.setState({
            imageWidth: this.context.imageWidth,
            imageHeight: this.context.imageHeight,
            editorWidth: this.context.editorWidth,
        },
            this.editorPosition
        );

        this.processCoords();
    }

    public componentDidUpdate() {
        const {
            textEditable,
            textDraggable,
        } = this.state;

        const {
            toggledEditable,
        } = this.context;

        // set text edit and drag to false when not editing the image
        if (!toggledEditable) {
            if (textEditable) {
                this.toggleTextEditable();
            }

            if (textDraggable) {
                this.toggleTextDraggable();
            }
        }
    }

    public getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
        if (prevProps.text.fontSizePercentage !== this.props.text.fontSizePercentage
            || prevProps.text.letterSpacingPercentage !== this.props.text.letterSpacingPercentage
            || prevProps.text.wordSpacingPercentage !== this.props.text.wordSpacingPercentage
        ) {
            this.processCoords();
        }
        return null;
    }

    public componentWillUnmount() {
        document.removeEventListener('mouseup', this.dragMouseUp);
        document.removeEventListener('mousemove', this.dragMouseMove);
    }

    public render() {
        const {
            content,
            showEditor,
            showMore,

            yCoord,
            xCoord,
            fontSize,
            letterSpacing,
            wordSpacing,

            textEditable,
            textDraggable,
            dragging,
            textViewable,

            editorXCoord,
            editorYCoord,
        } = this.state;

        const { text } = this.props;

        const {
            color,
            fontFamily,
            bold,
            italic,
            lineHeight,
            // content,
            link,
            linkTo,
        } = text;

        const {
            theme,
            toggledEditable,
        } = this.context;

        const editableDiv = (
            <StyledEditableDiv
                toggledEditable={toggledEditable}
                contentEditable={textEditable}
                suppressContentEditableWarning={true}
                onInput={this.handleChange}
            >
                {content}
            </StyledEditableDiv>
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

                onMouseDown={this.dragMouseDown}
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

        // console.log(text.fontSizePercentage);
        // console.log(this.context.selectText)

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

                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseEnter}

                    onMouseUp={this.dragMouseUp}

                    onKeyDown={this.handleKey}
                    tabIndex="0"

                    ref={this.textImage}
                >
                    {textContent}

                    {showMore && !toggledEditable && (
                        <TextImageMore
                            content={content}
                            toggleShow={this.toggleShowMore}
                        />
                    )}

                    {showEditor && !dragging && (
                        <TextImageEditor
                            toggleTextEditable={this.toggleTextEditable}
                            textEditable={textEditable}

                            toggleTextDraggable={this.toggleTextDraggable}
                            textDraggable={textDraggable}

                            toggleTextViewable={this.toggleTextViewable}
                            textViewable={textViewable}

                            text={text}

                            xCoord={editorXCoord}
                            yCoord={editorYCoord}

                            fontSize={fontSize}
                            letterSpacing={letterSpacing}
                            wordSpacing={wordSpacing}

                            processCoords={this.processCoords}
                        />
                    )}
                </StyledTextImage>
            </div>
        );
    }

    private handleChange = (event: any) => {
        const {
            contentInput,
        } = this.state;

        const value = event.target.innerText;

        this.setState({
            contentInput: value,
        });
    }

    private processCoords = () => {
        const {
            imageHeight,
            imageWidth,
        } = this.context;

        const {
            xCoordPercentage,
            yCoordPercentage,
            fontSizePercentage,
            letterSpacingPercentage,
            wordSpacingPercentage,
        } = this.props.text;

        const xCoord = valueFromPercentage(xCoordPercentage, imageWidth);
        const yCoord = valueFromPercentage(yCoordPercentage, imageHeight);
        const fontSize = Math.ceil(valueFromPercentage(fontSizePercentage, imageHeight));

        console.log(this.props.text);
        // console.log(letterSpacingPercentage, wordSpacingPercentage);
        // const letterSpacing = valueFromPercentage(letterSpacingPercentage, imageWidth);
        // const wordSpacing = valueFromPercentage(wordSpacingPercentage, imageWidth);

        this.setState({
            xCoord,
            yCoord,
            fontSize,
            // letterSpacing,
            // wordSpacing,
        });
    }

    private handleKey = (event: any) => {
        this.handleShortcuts(event);
        this.handleArrows(event);
    }

    private handleShortcuts = (event: any) => {
        const {
            textEditable,
        } = this.state;

        const {
            text,
        } = this.props;

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

        event.preventDefault();
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
                },
                    this.saveCoords
                );
                break;
            case 'ArrowRight':
                this.setState({
                    xCoord: xCoord + step
                },
                    this.saveCoords
                );
                break;
            case 'ArrowUp':
                this.setState({
                    yCoord: yCoord - step
                },
                    this.saveCoords
                );
                break;
            case 'ArrowDown':
                this.setState({
                    yCoord: yCoord + step
                },
                    this.saveCoords
                );
                break;
        }
    }

    private saveCoords = () => {
        const {
            updateTextImageField,
        } = this.context;

        const {
            text
        } = this.props;

        const { xCoordPercentage, yCoordPercentage } = this.coordsToPercentage();

        updateTextImageField(text.id, 'xCoordPercentage', xCoordPercentage);
        updateTextImageField(text.id, 'yCoordPercentage', yCoordPercentage);
    }

    private coordsToPercentage = () => {
        const {
            xCoord,
            yCoord,
            imageHeight,
            imageWidth,
        } = this.state;

        const xCoordPercentage = percentageFromValue(xCoord, imageWidth);
        const yCoordPercentage = percentageFromValue(yCoord, imageHeight);

        return {
            xCoordPercentage,
            yCoordPercentage,
        };
    }

    private dragMouseDown = (event: any) => {
        const { textDraggable } = this.state;
        if (!textDraggable) {
            return;
        }

        event.preventDefault();

        const pageX = event.pageX;
        const pageY = event.pageY;

        this.setState({
            dragging: true,
            pos3: pageX,
            pos4: pageY,
        });
    }

    private dragMouseMove = (event: any) => {
        const { dragging } = this.state;
        if (!dragging) {
            return;
        }

        event.preventDefault();

        const {
            pos3,
            pos4,
        } = this.state;

        const { offsetLeft, offsetTop } = this.textImage.current;

        const pageX = event.pageX;
        const pageY = event.pageY;

        // calculate the new cursor position:
        const diffX = pageX - pos3;
        const diffY = pageY - pos4;

        this.setState({
            pos1: pos3,
            pos2: pos4,
            pos3: pageX,
            pos4: pageY,
            xCoord: offsetLeft + diffX,
            yCoord: offsetTop + diffY,
        },
            () => {
                this.editorPosition();
                this.saveCoords();
            }
        );
    }

    private dragMouseUp = () => {
        this.setState({
            dragging: false,
        });
    }

    private handleMouseEnter = () => {
        const { toggledEditable } = this.context;

        if (toggledEditable) {
            this.setState((prevState: any) => ({
                showEditor: !prevState.showEditor,
            }));
        }

        this.toggleShowMore();
    }

    private editorPosition() {
        const {
            imageWidth,
            editorWidth,
        } = this.context;

        // console.log(editorWidth);

        const {
            offsetLeft,
            offsetTop,
            offsetHeight,
        } = this.textImage.current;

        // Do not let editor to go to the right.
        let editorXCoord = offsetLeft + editorWidth > imageWidth
            ? -1 * (offsetLeft + editorWidth - imageWidth)
            : -17;

        // Do not let editor to go to the left.
        if (offsetLeft < 17) {
            editorXCoord = offsetLeft * -1;
        }

        if (editorWidth === 0) {
            editorXCoord = - offsetLeft;
        }

        // Do not let editor to go to over the top.
        let editorYCoord = offsetTop < 34
            ?  offsetHeight
            : -34;

        this.setState({
            editorXCoord,
            editorYCoord,
        });
    }

    private saveContentInput = () => {
        const {
            contentInput
        } = this.state;

        const {
            updateTextImageField,
        } = this.context;

        const {
            text
        } = this.props;

        updateTextImageField(text.id, 'content', contentInput);

        this.setState({
            content: contentInput,
        });
    }

    private toggleTextEditable = () => {
        const {
            textEditable
        } = this.state;

        if (textEditable) {
            this.saveContentInput();
        }

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

    private toggleShowMore = () => {
        this.setState((prevState: any) => ({
            showMore: !prevState.showMore,
        }));
    }
}


export default TextImage;
