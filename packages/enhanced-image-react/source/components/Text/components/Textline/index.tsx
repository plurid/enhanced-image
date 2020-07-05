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
        emitAction,
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

    const [textValue, setTextValue] = useState(currentVersion.content);

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
            duplicateTextItem,
            deleteTextItem,
        } = context;

        const {
            key,
            altKey,
        } = event;

        if (key === '†' && altKey) {
            setEditable(show => !show);
        }

        if (editable) {
            return;
        }

        switch(key) {
            case 't':
                setEditable(show => !show);
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
        event: KeyboardEvent,
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
        event: KeyboardEvent,
    ) => {
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
            setTextValue(currentVersion.content);
            return;
        }

        const transview = currentVersion.transview.data.find(
            data => data.language === active
        );

        if (!transview) {
            setTextValue(currentVersion.content);
            return;
        }

        setTextValue(transview.content);
    }, [
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
                                contentEditable={editable}
                                suppressContentEditableWarning={true}
                                onInput={(event: React.SyntheticEvent<HTMLDivElement>) => handleChange(event)}
                            >
                                {textValue}
                            </StyledEditableDiv>
                        </StyledTextContentLink>
                    ) : (
                        <StyledEditableDiv
                            editableText={editableText}
                            revealedText={revealedText}
                            viewable={currentVersion.viewable}
                            contentEditable={editable}
                            suppressContentEditableWarning={true}
                            onInput={(event: React.SyntheticEvent<HTMLDivElement>) => handleChange(event)}
                        >
                            {textValue}
                        </StyledEditableDiv>
                    )}
                </StyledTextContent>
            )}

            {/* {showEditor
            && currentVersion
            && !dragging
            && ( */}
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
                />
            {/* )} */}
        </StyledTextItem>
    );
}


export default Textline;
