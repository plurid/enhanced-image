import React, {
    useContext,
    useState,
    useEffect,
    useRef,
} from 'react';

import {
    ImageText,
    ImageTextVersionTextline,
} from '../../../../data/interfaces';

import Context from '../../../../services/utilities/context';

import TextEditor from './components/TextEditor';
// import ButtonMore from '../../../UI/ButtonMore';

import {
    StyledTextItem,
    StyledTextContent,
    StyledTextContentLink,
    StyledEditableDiv,
} from './styled';

import {
    percentageFromValue,
} from '../../../../services/utilities/percentage';



interface TextlineProperties {
    data: ImageText;
    currentVersion: ImageTextVersionTextline;
}

const Textline: React.FC<TextlineProperties> = (properties) => {
    const context = useContext(Context);
    if (!context) {
        return (<></>);
    }

    const {
        data,
        currentVersion,
    } = properties;

    const {
        editableText,
        imageBoxDimensions,
        toggleVersionViewable,
        updateVersionContent,
        updateTextCoordinates,
    } = context;

    const timeoutMouseOver = useRef(0);
    const textItem = useRef<HTMLDivElement>();

    const [textYCoord, setTextYCoord] = useState('0px');
    const [textXCoord, setTextXCoord] = useState('0px');
    const [textColor, setTextColor] = useState('transparent');

    const [perspective, setPerspective] = useState('0px');
    const [rotationX, setRotationX] = useState('0deg');
    const [rotationY, setRotationY] = useState('0deg');
    const [rotationZ, setRotationZ] = useState('0deg');

    const [fontWeight, setFontWeight] = useState('normal');
    const [fontStyle, setFontStyle] = useState('normal');
    const [fontSize, setFontSize] = useState('12px');
    const [fontFamily, setFontFamily] = useState('Arial');
    const [letterSpacing, setLetterSpacing] = useState('0px');
    const [wordSpacing, setWordSpacing] = useState('0px');
    const [lineHeight, setLineHeight] = useState('auto');

    const [showEditor, setShowEditor] = useState(false);

    const [mouseOver, setMouseOver] = useState(false);

    const [editable, setEditable] = useState(false);
    const [draggable, setDraggable] = useState(false);
    const [dragging, setDragging] = useState(false);

    const [textValue, setTextValue] = useState(currentVersion.content);

    const [positions, setPositions] = useState({
        x: 0,
        y: 0,
    });

    const [editorPositions, setEditorPositions] = useState({
        x: -17,
        y: -34,
    });
    const [editorExpandFormat, setEditorExpandFormat] = useState(false);
    const [editorWidth, setEditorWidth] = useState(0);
    const [editorFullWidth, setEditorFullWidth] = useState(false);

    const [loaded, setLoaded] = useState(false);

    const handleMouseEnter = () => {
        clearTimeout(timeoutMouseOver.current);
        setMouseOver(true);
    }

    const handleMouseLeave = () => {
        timeoutMouseOver.current = setTimeout(() => {
            if (mouseOver) {
                setMouseOver(false)
            }
        }, 700);
    }

    const handleMouseDown = (event: MouseEvent) => {
        if (draggable) {
            setDragging(true);

            const pageX = event.pageX;
            const pageY = event.pageY;

            const positions = {
                x: pageX,
                y: pageY,
            };
            setPositions(positions);
        }
    }

    const handleEditorPosition = () => {
        if (textItem.current) {
            const {
                offsetLeft,
                offsetTop,
                offsetHeight,
            } = textItem.current;

            // Do not let editor to go to the right
            // or keep it within the image
            // if the editor has the width greater than the image
            let editorXCoord = (offsetLeft + editorWidth) > imageBoxDimensions.width
                ? editorWidth < imageBoxDimensions.width
                    ? -1 * (offsetLeft + editorWidth - imageBoxDimensions.width)
                    : (-offsetLeft + 10)
                : -17;

            // Do not let editor to go to the left.
            if (offsetLeft < 17) {
                editorXCoord = offsetLeft * -1;
            }

            if (editorWidth === 0) {
                editorXCoord = - offsetLeft;
            }

            if (editorWidth > imageBoxDimensions.width) {
                setEditorFullWidth(true);
            } else {
                setEditorFullWidth(false);
            }

            // Do not let editor to go to over the top.
            const editorYCoord = offsetTop < 34
                ? offsetHeight
                : -34;

            const editorPositions = {
                x: editorXCoord,
                y: editorYCoord,
            }
            setEditorPositions(editorPositions);
        }
    }

    const handleChange = (event: React.SyntheticEvent<HTMLDivElement>) => {
        const value = event.currentTarget.innerText;
        if (value !== '') {
            updateVersionContent(data.id, value);
        } else {
            updateVersionContent(data.id, 'New Text');
        }
    }

    const setVersionViewable = () => {
        toggleVersionViewable(data.id);
    }


    /** effects */
    /**
     * Compute format.
     */
    useEffect(() => {
        if (currentVersion) {
            setTextXCoord(currentVersion.xPercent * imageBoxDimensions.width / 100 + 'px');
            setTextYCoord(currentVersion.yPercent * imageBoxDimensions.height / 100 + 'px');

            setPerspective(currentVersion.perspective + 'px');
            setRotationX(currentVersion.xRotation + 'deg');
            setRotationY(currentVersion.yRotation + 'deg');
            setRotationY(currentVersion.zRotation + 'deg');

            setFontWeight(currentVersion.fontWeight);
            setFontStyle(currentVersion.fontStyle);
            setFontFamily(currentVersion.fontFamily);
            setFontSize(currentVersion.fontSizePercent * imageBoxDimensions.height / 100 + 'px');
            setLetterSpacing(currentVersion.letterSpacingPercent * imageBoxDimensions.width / 100 + 'px');
            setWordSpacing(currentVersion.wordSpacingPercent * imageBoxDimensions.width / 100 + 'px');

            if (currentVersion.lineHeightPercent === 0) {
                setLineHeight('auto');
            } else {
                setLineHeight(currentVersion.lineHeightPercent * imageBoxDimensions.height / 100 + 'px');
            }
        }
    }, [
        currentVersion,
        imageBoxDimensions,
    ]);

    /**
     * Handle text color.
     */
    useEffect(() => {
        if (currentVersion) {
            if (editableText) {
                setTextColor(currentVersion.color);
            } else if (currentVersion.viewable) {
                setTextColor(currentVersion.color);
            } else {
                setTextColor('transparent');
            }
        }
    }, [
        currentVersion,
        editableText,
    ]);

    /**
     * Handle showEditor
     */
    useEffect(() => {
        if (editableText && mouseOver) {
            setShowEditor(true);
        } else {
            setShowEditor(false);
        }
    }, [
        editableText,
        mouseOver,
    ]);

    /**
     * Handle dragging (mouseup).
     */
    useEffect(() => {
        const handleMouseUp = () => {
            if (draggable) {
                setDragging(false);
            }
        }

        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
        }
    }, [
        dragging,
        draggable,
    ]);

    /**
     * Handle dragging (movemove).
     */
    useEffect(() => {
        const handleMouseMove = (event: any) => {
            if (!dragging) {
                return;
            }

            event.preventDefault();

            if (textItem.current) {
                const { offsetLeft, offsetTop } = textItem.current;

                const pageX = event.pageX;
                const pageY = event.pageY;

                const differenceX = pageX - positions.x;
                const differenceY = pageY - positions.y;

                const updatedPositions = {
                    x: pageX,
                    y: pageY,
                };
                setPositions(updatedPositions);

                const textXCoordinate = offsetLeft + differenceX;
                const textYCoordinate = offsetTop + differenceY;
                const textXCoord = textXCoordinate + 'px';
                const textYCoord = textYCoordinate + 'px';
                setTextXCoord(textXCoord);
                setTextYCoord(textYCoord);

                const xCoordPercentage = percentageFromValue(
                    textXCoordinate,
                    imageBoxDimensions.width
                );
                const yCoordPercentage = percentageFromValue(
                    textYCoordinate,
                    imageBoxDimensions.height
                );
                const coordinatesPercentage = {
                    x: xCoordPercentage,
                    y: yCoordPercentage,
                };
                updateTextCoordinates(data.id, coordinatesPercentage);
            }
        }

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        }
    }, [
        dragging,
        draggable,
        positions,
        textXCoord,
        textYCoord,
    ]);

    /**
     * Handle editorWidth.
     */
    useEffect(() => {
        handleEditorPosition();
    }, [
        editorWidth,
        dragging,
        mouseOver,
    ]);

    /**
     * Handle editableText.
     */
    useEffect(() => {
        if (!editableText) {
            setDraggable(false);
            setEditable(false);
        }
    }, [
        editableText
    ]);

    useEffect(() => {
        setLoaded(true);
    }, []);


    /** render */
    if (!loaded) {
        return (<></>);
    }

    return (
        <StyledTextItem
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}
            style={{
                left: textXCoord,
                top: textYCoord,
                color: textColor,
                fontFamily,
                fontSize,
                fontWeight,
                fontStyle,
                letterSpacing,
                wordSpacing,
                lineHeight,
                perspective,
            }}
            ref={textItem}
        >
            {currentVersion && (
                <StyledTextContent
                    onMouseDown={(event: MouseEvent) => handleMouseDown(event)}
                    dragMode={draggable}
                    draggingMode={dragging}
                    editableText={editableText}
                    viewable={currentVersion && currentVersion.viewable}
                    color={currentVersion && currentVersion.color}
                    style={{
                        transform: `rotateX(${rotationX}) rotateY(${rotationY}) rotateZ(${rotationZ})`,
                    }}
                >
                    {currentVersion && currentVersion.link && !editableText
                        ? (
                            <StyledTextContentLink
                                href={currentVersion.linkTo}
                                target="_blank"
                                viewable={currentVersion.viewable}
                                color={currentVersion.color}
                            >
                                <StyledEditableDiv
                                    toggledEditable={editableText}
                                    contentEditable={editable}
                                    suppressContentEditableWarning={true}
                                    onInput={(event: React.SyntheticEvent<HTMLDivElement>) => handleChange(event)}
                                >
                                    {textValue}
                                </StyledEditableDiv>
                            </StyledTextContentLink>
                        ) : (
                            <StyledEditableDiv
                                toggledEditable={editableText}
                                contentEditable={editable}
                                suppressContentEditableWarning={true}
                                onInput={(event: React.SyntheticEvent<HTMLDivElement>) => handleChange(event)}
                            >
                                {textValue}
                            </StyledEditableDiv>
                        )
                    }
                </StyledTextContent>
            )}

            {showEditor
            && currentVersion
            && !dragging
            && (
                <TextEditor
                    textItem={data}
                    currentVersion={currentVersion}

                    editable={editable}
                    setEditable={setEditable}
                    draggable={draggable}
                    setDraggable={setDraggable}
                    setViewable={setVersionViewable}

                    positions={editorPositions}
                    expandFormat={editorExpandFormat}
                    setExpandFormat={setEditorExpandFormat}
                    setWidth={setEditorWidth}
                    fullWidth={editorFullWidth}
                />
            )}
        </StyledTextItem>
    );
}


export default Textline;


//     private handleKey = (event: any) => {
//         this.handleShortcuts(event);
//         this.handleArrows(event);
//     }

//     private handleShortcuts = (event: any) => {
//         const {
//             textEditable,
//         } = this.state;

//         const {
//             text,
//         } = this.props;

//         const {
//             duplicateTextVideo,
//             deleteTextVideo,
//         } = this.context;

//         const { key, altKey } = event;

//         if (key === '†' && altKey) {
//             this.toggleTextEditable();
//         }

//         if (textEditable) {
//             return;
//         }

//         switch(key) {
//             case 't':
//                 this.toggleTextEditable();
//                 break;
//             case 'g':
//                 this.toggleTextDraggable();
//                 break;
//             case 'v':
//                 this.toggleTextViewable();
//                 break;
//             case 'd':
//                 duplicateTextVideo(text.id);
//                 break;
//             case 'x':
//                 deleteTextVideo(text.id);
//                 break;
//         }
//     }

//     private handleArrows = (event: any) => {
//         const {
//             textDraggable,
//         } = this.state;

//         if (!textDraggable) {
//             return;
//         }

//         event.preventDefault();
//         this.moveWithArrows(event);
//         if (event.shiftKey) {
//             this.moveWithArrows(event, 10);
//         }
//     }

//     private moveWithArrows(event: any, step: number = 1) {
//         const { key } = event;

//         const { xCoord, yCoord } = this.state;

//         this.editorPosition();

//         switch(key) {
//             case 'ArrowLeft':
//                 this.setState({
//                     xCoord: xCoord - step
//                 },
//                     this.saveCoords
//                 );
//                 break;
//             case 'ArrowRight':
//                 this.setState({
//                     xCoord: xCoord + step
//                 },
//                     this.saveCoords
//                 );
//                 break;
//             case 'ArrowUp':
//                 this.setState({
//                     yCoord: yCoord - step
//                 },
//                     this.saveCoords
//                 );
//                 break;
//             case 'ArrowDown':
//                 this.setState({
//                     yCoord: yCoord + step
//                 },
//                     this.saveCoords
//                 );
//                 break;
//         }
//     }

//     private saveCoords = () => {
//         const {
//             updateTextVideoBatch,
//         } = this.context;

//         const {
//             text
//         } = this.props;

//         const { xCoordPercentage, yCoordPercentage } = this.coordsToPercentage();

//         const elements = [
//             {
//                 type: 'xCoordPercentage',
//                 value: xCoordPercentage,
//             },
//             {
//                 type: 'yCoordPercentage',
//                 value: yCoordPercentage,
//             }
//         ]
//         updateTextVideoBatch(text.id, elements);
//     }
