/** [START] imports */
/** libraries */
import React, {
    useContext,
    useState,
    useEffect,
    useRef,
} from 'react';

import {
    Editor,
    EditorState,
    ContentState,
} from 'draft-js';


/** external */
import {
    ImageText,
    ImageTextVersionTextline,
} from '#data/interfaces';

import {
    Context,
} from '#services/utilities';

import {
    percentageFromValue,
} from '#services/utilities/percentage';


/** internal */
import {
    StyledTextItem,
    StyledTextContent,
    StyledTextContentLink,
    StyledEditableDiv,
} from './styled';

import TextlineEditor from './components/TextlineEditor';
import TextEditor from './components/TextEditor';
/** [END] imports */



/** [START] component */
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
        theme,

        editableText,
        revealedText,
        imageBoxDimensions,
        toggleVersionViewable,
        updateVersionContent,
        updateTextCoordinates,
        emitAction,
    } = context;


    /** properties */
    const {
        data,
        currentVersion,
    } = properties;


    /** references */
    // const textValue = useRef(currentVersion.content);
    const timeoutMouseOver = useRef<any>(0);
    const textItem = useRef<HTMLDivElement>();


    /** state */
    const [textXCoord, setTextXCoord] = useState(currentVersion.position.x * imageBoxDimensions.width / 100 + 'px');
    const [textYCoord, setTextYCoord] = useState(currentVersion.position.y * imageBoxDimensions.height / 100 + 'px');
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

    const [backgrounded, setBackgrounded] = useState('black');
    const [content, setContent] = useState(currentVersion.content);
    const [textState, setTextState] = useState(
        () => EditorState.createWithContent(
            ContentState.createFromText(currentVersion.content)
        )
    );

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
    const [editorDrawers, setEditorDrawers] = useState<string[]>([]);
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
        if (!textItem.current) {
            return;
        }

        const {
            offsetLeft,
            offsetTop,
            offsetHeight,
        } = textItem.current;

        let editorX = 0;
        let editorY = 0;

        // Do not let editor to go to the right
        // or keep it within the image
        // if the editor has the width greater than the image
        if ((offsetLeft + editorWidth) > imageBoxDimensions.width) {
            if (editorWidth < imageBoxDimensions.width) {
                editorX = -1 * (offsetLeft + editorWidth - imageBoxDimensions.width);
            } else {
                editorX = (-offsetLeft + 17);
            }
        } else {
            editorX = -17;
        }

        // Do not let editor to go to the left.
        if (offsetLeft < 17) {
            editorX = offsetLeft * -1;
        }

        if (editorWidth === 0) {
            editorX = - offsetLeft;
        }

        if (
            (editorWidth > imageBoxDimensions.width)
            || (editorWidth + 17 > imageBoxDimensions.width)
        ) {
            setEditorFullWidth(true);
        } else {
            setEditorFullWidth(false);
        }

        if (editorDrawers.length === 0) {
            setEditorFullWidth(false);
        }

        // Do not let editor to go to over the top.
        editorY = offsetTop < 34
            ? offsetHeight
            : -34;

        const editorPositions = {
            x: editorX,
            y: editorY,
        };
        setEditorPositions(editorPositions);
    }

    const handleChange = (
        textState: EditorState,
    ) => {
        setTextState(textState);
    }

    const saveTextValue = () => {
        const value = textState.getCurrentContent().getPlainText();
        updateVersionContent(data.id, value);
    }

    const setVersionViewable = () => {
        toggleVersionViewable(data.id);
    }

    const switchEditorPosition = () => {
        if (!textItem.current) {
            return;
        }

        const {
            offsetHeight,
        } = textItem.current;

        const newEditorPositions = {
            x: editorPositions.x,
            y: editorPositions.y === -34 ? offsetHeight : -34,
        };
        setEditorPositions(newEditorPositions);
    }

    const handleShortcuts = (
        event: React.KeyboardEvent,
    ) => {
        const {
            duplicateTextItem,
            deleteTextItem,
        } = context;

        const {
            key,
            altKey,
        } = event;

        if (key === '†' && altKey) {
            saveTextValue();
            setEditable(show => !show);
        }

        if (editable) {
            return;
        }

        switch(key) {
            case 't':
                setEditable(show => !show);
                setDraggable(false);
                break;
            case 'g':
                setEditable(false);
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
            case 'e':
                switchEditorPosition();
                break;
        }
    }

    const handleArrows = (
        event: React.KeyboardEvent,
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

    const incrementLocation = (
        x: number,
        y: number,
        pageX?: number,
        pageY?: number,
    ) => {
        if (!textItem.current) {
            return;
        }

        const {
            offsetLeft,
            offsetTop,
        } = textItem.current;

        const updatedPositions = {
            x: pageX || positions.x,
            y: pageY || positions.y,
        };
        setPositions(updatedPositions);

        const textXCoordinate = offsetLeft + x;
        const textYCoordinate = offsetTop + y;
        const textXCoord = textXCoordinate + 'px';
        const textYCoord = textYCoordinate + 'px';
        setTextXCoord(textXCoord);
        setTextYCoord(textYCoord);

        const xCoordPercentage = percentageFromValue(
            textXCoordinate,
            imageBoxDimensions.width,
        );
        const yCoordPercentage = percentageFromValue(
            textYCoordinate,
            imageBoxDimensions.height,
        );

        const coordinatesPercentage = {
            x: xCoordPercentage,
            y: yCoordPercentage,
        };

        updateTextCoordinates(
            data.id,
            coordinatesPercentage,
        );
    }

    const moveWithArrows = (
        event: React.KeyboardEvent,
        step: number = 1,
    ) => {
        const {
            key,
        } = event;

        switch(key) {
            case 'ArrowLeft': {
                incrementLocation(-step, 0);
                break;
            }
            case 'ArrowRight': {
                incrementLocation(step, 0);
                break;
            }
            case 'ArrowUp': {
                incrementLocation(0, -step);
                break;
            }
            case 'ArrowDown': {
                incrementLocation(0, step);
                break;
            }
        }
    }

    const handleKeyDown = (
        event: React.KeyboardEvent,
    ) => {
        if (event.isDefaultPrevented()) {
            return;
        }

        handleShortcuts(event);
        handleArrows(event);
    }

    const handleAction = () => {
        if (currentVersion && currentVersion.action.active) {
            emitAction(
                currentVersion.action.type,
                data.id,
            );
        }
    }

    const toggleDrawer = (
        drawer: string,
    ) => {
        if (editorDrawers.includes(drawer)) {
            const drawers = editorDrawers.filter(eDrawer => eDrawer !== drawer);
            setEditorDrawers(drawers);
        } else {
            const drawers = [
                ...editorDrawers,
                drawer,
            ];
            setEditorDrawers(drawers);
        }
    }


    /** effects */
    /**
     * Compute format.
     */
    useEffect(() => {
        if (currentVersion) {
            setTextXCoord(currentVersion.position.x * imageBoxDimensions.width / 100 + 'px');
            setTextYCoord(currentVersion.position.y * imageBoxDimensions.height / 100 + 'px');

            setPerspective(currentVersion.transform.perspective + 'px');
            setRotationX(currentVersion.transform.rx + 'deg');
            setRotationY(currentVersion.transform.ry + 'deg');
            setRotationZ(currentVersion.transform.rz + 'deg');
            setSkewX(currentVersion.transform.sx + 'deg');
            setSkewY(currentVersion.transform.sy + 'deg');

            setFontWeight(currentVersion.font.weight);
            setFontStyle(currentVersion.font.style);
            setFontFamily(currentVersion.font.family);
            setFontSize(currentVersion.font.size * imageBoxDimensions.height / 100 + 'px');
            setLetterSpacing(currentVersion.font.letterSpacing * imageBoxDimensions.width / 100 + 'px');
            setWordSpacing(currentVersion.font.wordSpacing * imageBoxDimensions.width / 100 + 'px');

            if (currentVersion.font.lineHeight === 0) {
                setLineHeight('auto');
            } else {
                setLineHeight(currentVersion.font.lineHeight * imageBoxDimensions.height / 100 + 'px');
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

            const pageX = event.pageX;
            const pageY = event.pageY;

            const differenceX = pageX - positions.x;
            const differenceY = pageY - positions.y;

            incrementLocation(
                differenceX,
                differenceY,
                pageX,
                pageY,
            );
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

    /** Transview Active. */
    useEffect(() => {
        const {
            active,
        } = currentVersion.transview;

        if (active === 'SOURCE') {
            const textState = EditorState.createWithContent(
                ContentState.createFromText(currentVersion.content)
            );
            setTextState(textState);
            setContent(currentVersion.content);
            setBackgrounded('');
            return;
        }

        const transview = currentVersion.transview.data.find(
            data => data.language === active
        );

        if (!transview) {
            const textState = EditorState.createWithContent(
                ContentState.createFromText(currentVersion.content)
            );
            setTextState(textState);
            setContent(currentVersion.content);
            setBackgrounded('');
            return;
        }

        if (transview.backgrounded) {
            if (currentVersion.color === 'black'
                || currentVersion.color === '#000'
                || currentVersion.color === '#000000'
            ) {
                setBackgrounded('white');
            } else {
                setBackgrounded('black');
            }
        }

        const textState = EditorState.createWithContent(
            ContentState.createFromText(transview.content)
        );
        setTextState(textState);
        setContent(transview.content);
    }, [
        currentVersion.transview.data,
        currentVersion.transview.active,
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
            onKeyDown={(event: React.KeyboardEvent) => handleKeyDown(event)}
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
                    backgrounded={backgrounded}
                    viewable={currentVersion && currentVersion.viewable}
                    actionable={currentVersion && currentVersion.action.active}
                    onClick={() => handleAction()}
                    color={currentVersion && currentVersion.color}
                    style={{
                        transform: `rotateX(${rotationX}) rotateY(${rotationY}) rotateZ(${rotationZ}) skew(${skewX}, ${skewY})`,
                    }}
                >
                    {currentVersion
                    && currentVersion.link.active
                    && !editableText
                    ? (
                        <StyledTextContentLink
                            href={currentVersion.link.to}
                            target="_blank"
                            viewable={currentVersion.viewable}
                            revealed={revealedText}
                            color={currentVersion.color}
                        >
                            <StyledEditableDiv
                                editableText={editableText}
                                revealedText={revealedText}
                                viewable={currentVersion.viewable}
                            >
                                {editable ? (
                                    <Editor
                                        editorState={textState}
                                        onChange={handleChange}
                                    />
                                ): (
                                    <>
                                        {content}
                                    </>
                                )}
                            </StyledEditableDiv>
                        </StyledTextContentLink>
                    ) : (
                        <StyledEditableDiv
                            editableText={editableText}
                            revealedText={revealedText}
                            viewable={currentVersion.viewable}
                        >
                            {editable ? (
                                <Editor
                                    editorState={textState}
                                    onChange={handleChange}
                                />
                            ): (
                                <>
                                    {content}
                                </>
                            )}
                        </StyledEditableDiv>
                    )}
                </StyledTextContent>
            )}

            {/* {showEditor
            && currentVersion
            && !dragging
            && ( */}
                <TextlineEditor
                    /** required */
                    /** - values */
                    textItem={data}
                    currentVersion={currentVersion}
                    editable={editable}
                    draggable={draggable}
                    drawers={editorDrawers}
                    /** - methods */
                    setEditable={setEditable}
                    setDraggable={setDraggable}
                    setViewable={setVersionViewable}
                    saveTextValue={saveTextValue}
                    toggleDrawer={toggleDrawer}
                />
            {/* )} */}

            {/* {showEditor
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
                    drawers={editorDrawers}
                    toggleDrawer={toggleDrawer}
                    setWidth={setEditorWidth}
                    fullWidth={editorFullWidth}

                    saveTextValue={saveTextValue}
                />
            )} */}
        </StyledTextItem>
    );
}


export default Textline;
/** [END] component */
