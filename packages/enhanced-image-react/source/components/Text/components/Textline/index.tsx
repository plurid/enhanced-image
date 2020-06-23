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



export interface TextlineProperties {
    data: ImageText;
    currentVersion: ImageTextVersionTextline;
}

const Textline: React.FC<TextlineProperties> = (
    properties,
) => {
    /** context */
    const context = useContext(Context);
    if (!context) {
        return (<></>);
    }

    const {
        editableText,
        revealedText,
        imageBoxDimensions,
        toggleVersionViewable,
        updateVersionContent,
        updateTextCoordinates,
    } = context;


    /** properties */
    const {
        data,
        currentVersion,
    } = properties;


    /** references */
    const timeoutMouseOver = useRef<any>(0);
    const textItem = useRef<HTMLDivElement>();


    /** state */
    const [textXCoord, setTextXCoord] = useState('0px');
    const [textYCoord, setTextYCoord] = useState('0px');
    const [textColor, setTextColor] = useState('transparent');

    const [perspective, setPerspective] = useState('0px');
    const [rotationX, setRotationX] = useState('0deg');
    const [rotationY, setRotationY] = useState('0deg');
    const [rotationZ, setRotationZ] = useState('0deg');
    const [skewX, setSkewX] = useState('0deg');
    const [skewY, setSkewY] = useState('0deg');

    const [fontWeight, setFontWeight] = useState('normal');
    const [fontStyle, setFontStyle] = useState('normal');
    const [fontSize, setFontSize] = useState('12px');
    const [fontFamily, setFontFamily] = useState('Arial');
    const [letterSpacing, setLetterSpacing] = useState('0px');
    const [wordSpacing, setWordSpacing] = useState('0px');
    const [lineHeight, setLineHeight] = useState('auto');

    const [textValue, _] = useState(currentVersion.content);

    const [showEditor, setShowEditor] = useState(false);

    const [mouseOver, setMouseOver] = useState(false);

    const [editable, setEditable] = useState(false);
    const [draggable, setDraggable] = useState(false);
    const [dragging, setDragging] = useState(false);

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


    /** handlers */
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

    const handleMouseDown = (
        event: MouseEvent,
    ) => {
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

            if (
                (editorWidth > imageBoxDimensions.width)
                || (editorWidth + 30 > imageBoxDimensions.width)
            ) {
                setEditorFullWidth(true);
            } else {
                setEditorFullWidth(false);
            }

            if (!editorExpandFormat) {
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

    const handleChange = (
        event: React.SyntheticEvent<HTMLDivElement>,
    ) => {
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

    const handleShortcuts = (
        event: KeyboardEvent,
    ) => {
        const {
            editableText,
            setEditableText,

            duplicateTextItem,
            deleteTextItem,
        } = context;

        const {
            key,
            altKey,
        } = event;

        if (key === '†' && altKey) {
            setEditableText(show => !show);
        }

        if (editable) {
            return;
        }

        switch(key) {
            case 't':
                setEditableText(show => !show);
                break;
            case 'g':
                setDraggable(drag => !drag);
                break;
            case 'v':
                setVersionViewable();
                break;
            case 'd':
                duplicateTextItem(data.id);
                break;
            case 'x':
                deleteTextItem(data.id);
                break;
        }
    }

    const handleArrows = (
        event: KeyboardEvent,
    ) => {
        if (!draggable) {
            return;
        }

        event.preventDefault();

        if (event.shiftKey) {
            moveWithArrows(event, 10);
        } else {
            moveWithArrows(event);
        }
    }

    const moveWithArrows = (
        event: KeyboardEvent,
        step: number = 1,
    ) => {
        const {
            key,
        } = event;

        switch(key) {
            case 'ArrowLeft': {
                const xPosition = positions.x - step;
                const newPositions = {
                    x: xPosition,
                    y: positions.y,
                };
                setPositions(newPositions);
                break;
            }
            case 'ArrowRight': {
                const xPosition = positions.x + step;
                const newPositions = {
                    x: xPosition,
                    y: positions.y,
                };
                setPositions(newPositions);
                break;
            }
            case 'ArrowUp': {
                const yPosition = positions.y - step;
                const newPositions = {
                    x: positions.x,
                    y: yPosition,
                };
                setPositions(newPositions);
                break;
            }
            case 'ArrowDown': {
                const yPosition = positions.y + step;
                const newPositions = {
                    x: positions.x,
                    y: yPosition,
                };
                setPositions(newPositions);
                break;
            }
        }
    }

    const handleKeyDown = (
        event: KeyboardEvent,
    ) => {
        handleShortcuts(event);
        handleArrows(event);
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
            setRotationZ(currentVersion.zRotation + 'deg');
            setSkewX(currentVersion.xSkew + 'deg');
            setSkewY(currentVersion.ySkew + 'deg');

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

    /**
     * Handle loaded.
     */
    useEffect(() => {
        setLoaded(true);
    }, []);


    /** render */
    if (!loaded) {
        return (<></>);
    }

    return (
        <StyledTextItem
            tabIndex={0}
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}
            onKeyDown={handleKeyDown}
            ref={textItem}
            style={{
                top: textYCoord,
                left: textXCoord,
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
        >
            {currentVersion && (
                <StyledTextContent
                    onMouseDown={(event: MouseEvent) => handleMouseDown(event)}
                    dragMode={draggable}
                    draggingMode={dragging}
                    editableText={editableText}
                    revealedText={revealedText}
                    viewable={currentVersion && currentVersion.viewable}
                    color={currentVersion && currentVersion.color}
                    style={{
                        transform: `rotateX(${rotationX}) rotateY(${rotationY}) rotateZ(${rotationZ}) skew(${skewX}, ${skewY})`,
                    }}
                >
                    {currentVersion
                    && currentVersion.link
                    && !editableText
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
                    )}
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
