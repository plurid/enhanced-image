/** [START] imports */
/** libraries */
import React, {
    useContext,
    useRef,
    useState,
    useEffect,
} from 'react';


/** external */
import ShapeResizer from '#components/Entities/components/Common/ShapeResizer';

import {
    ImageEntityPainted,
} from '#data/interfaces';

import {
    useGrab,
    useResize,
} from '#services/hooks';

import {
    Context,

    /** percentage */
    valueFromPercentage,
    percentageFromValue,
} from '#services/utilities';


/** internal */
import PaintedEditor from './components/PaintedEditor';

import {
    StyledPainted,
    StyledDisplayCanvas,
} from './styled';
/** [END] imports */



/** [START] component */
export interface PaintedProperties {
    entity: ImageEntityPainted;
}

const Painted: React.FC<PaintedProperties> = (
    properties,
) => {
    /** context */
    const context = useContext(Context);
    if (!context) {
        return (<></>);
    }

    const {
        theme,
        transparentUI,

        imageBoxDimensions,

        editableEntities,
        revealedEntities,
        convertEntity,
        updateEntityField,
        duplicateEntity,
        obliterateEntity,
    } = context;


    /** properties */
    const {
        entity,
    } = properties;

    const {
        id,
        type,
        data,
    } = entity;

    const {
        position,
        width,
        height,
        color,
        border,
        opacity,
        viewable,
        dataURL,
    } = data;

    const absoluteWidth = width * imageBoxDimensions.width / 100;
    const absoluteHeight = height * imageBoxDimensions.height / 100;


    /** references */
    const timeoutMouseOver = useRef<any>(0);
    const displayCanvasElement = useRef<HTMLCanvasElement>(null);
    const printCanvasElement = useRef<HTMLCanvasElement>(null);
    const entityElement = useRef<HTMLDivElement>(null);
    const brushDrawingContext = useRef({
        inProgress: false,
    });


    /** state */
    const [showEditor, setShowEditor] = useState(false);
    const [mouseOver, setMouseOver] = useState(false);
    const [brushDrawing, setBrushDrawing] = useState(false);
    const [enclosureDrawing, setEnclosureDrawing] = useState(false);
    const [enclosurePoints, setEnclosurePoints] = useState<any[]>([]);
    const [eraserMode, setEraserMode] = useState(false);
    const [brushSize, setBrushSize] = useState(20);
    const [brushColor, setBrushColor] = useState('#483d8b');

    const [editorDrawers, setEditorDrawers] = useState<string[]>([]);


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

    const handleMouseUp = () => {
        if (!dragging && !resizing) {
            saveContext();
        }

        if (brushDrawing) {
            if (!printCanvasElement.current) {
                return;
            }

            const context = printCanvasElement.current.getContext('2d');

            if (!context) {
                return;
            }

            brushDrawingContext.current.inProgress = false;
            context.closePath();
            context.save();
        }
    }

    const updateSize = (
        x: number,
        y: number,
    ) => {
        const widthValue = Math.round(
            valueFromPercentage(
                width,
                imageBoxDimensions.width,
            )
        );

        const heightValue = Math.round(
            valueFromPercentage(
                height,
                imageBoxDimensions.height,
            )
        );

        const percentageX = percentageFromValue(
            widthValue + x,
            imageBoxDimensions.width,
        );

        const percentageY = percentageFromValue(
            heightValue + y,
            imageBoxDimensions.height,
        );

        updateEntityField(
            id,
            [
                {
                    type: 'data.width',
                    value: percentageX,
                },
                {
                    type: 'data.height',
                    value: percentageY,
                },
            ],
        );
    }

    const loadContext = () => {
        if (!printCanvasElement.current) {
            return;
        }

        const context = printCanvasElement.current.getContext('2d');
        if (!context) {
            return;
        }

        const image = new Image;
        image.onload = () => {
            if (!printCanvasElement.current) {
                return;
            }

            context.drawImage(
                image,
                0,
                0,
                image.width,
                image.height,
            );
        };
        image.src = dataURL;
    }

    const saveContext = () => {
        if (!printCanvasElement.current) {
            return;
        }

        const dataURL = printCanvasElement.current.toDataURL();

        updateEntityField(
            id,
            [{
                type: 'data.dataURL',
                value: dataURL,
            }],
        );
    }

    const resizeCanvasToDisplaySize = (
        canvas: HTMLCanvasElement,
    ) => {
        // look up the size the canvas is being displayed
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        // If it's resolution does not match change it
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            return true;
        }

        return false;
    }

    const setDrawingMode = (
        mode: 'brush' | 'enclosure',
    ) => {
        switch (mode) {
            case 'brush':
                setBrushDrawing(draw => !draw);
                setEnclosureDrawing(false);
                break;
            case 'enclosure':
                setBrushDrawing(false);
                setEnclosureDrawing(draw => !draw);
                break;
        }
    }


    /** DRAWING */
    const mouseDownSetPosition = (
        event: any,
    ) => {
        if (event.target !== entityElement.current) {
            return;
        }

        if (enclosureDrawing) {
            if (!entityElement.current) {
                return;
            }

            const {
                left,
                top,
            } = entityElement.current.getBoundingClientRect();

            const position = {
                x: event.clientX - left,
                y: event.clientY - top,
            };

            drawEnclosurePoint(
                position.x,
                position.y,
            );

            const updatedEnclosurePoints = [
                ...enclosurePoints,
                {
                    ...position,
                },
            ];
            setEnclosurePoints(updatedEnclosurePoints);
        }
    }

    const draw = (
        event: any,
    ) => {
        if (!editableEntities) {
            return;
        }

        if (draggable || resizing) {
            return;
        }

        if (!brushDrawing) {
            return;
        }

        if (!entityElement.current) {
            return;
        }

        const {
            left,
            top,
        } = entityElement.current.getBoundingClientRect();

        const x = event.clientX - left;
        const y = event.clientY - top;

        drawBrushDiameter(x, y);

        // mouse left button must be pressed
        if (event.buttons !== 1) {
            return;
        }

        if (!printCanvasElement.current) {
            return;
        }

        const context = printCanvasElement.current.getContext('2d');

        if (!context) {
            return;
        }

        context.lineWidth = brushSize;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = brushColor;

        context.shadowColor = brushColor;
        context.shadowBlur = 1;

        const {
            inProgress,
        } = brushDrawingContext.current;

        if (!inProgress) {
            context.beginPath();
            context.moveTo(x, y);

            brushDrawingContext.current.inProgress = true;
        } else {
            context.lineTo(x,y);
        }

        context.stroke();
    }

    const drawEnclosurePoint = (
        x: number,
        y: number,
    ) => {
        if (!printCanvasElement.current) {
            return;
        }

        const canvas = printCanvasElement.current;
        const context = canvas.getContext('2d');
        if (!context) {
            return;
        }

        const radius = 1;

        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI, false);
        context.lineWidth = 1;
        context.strokeStyle = brushColor;
        context.stroke();
    }

    const drawEnclosure = (
        enclosurePoints: any[],
    ) => {
        if (!printCanvasElement.current) {
            return;
        }

        const context = printCanvasElement.current.getContext('2d');

        if (!context) {
            return;
        }

        const region = new Path2D();

        region.moveTo(
            enclosurePoints[0].x,
            enclosurePoints[0].y,
        );

        for (const point of enclosurePoints) {
            region.lineTo(
                point.x,
                point.y,
            );
        }

        region.closePath();

        context.fillStyle = brushColor;
        context.fill(region, 'evenodd');
    }

    const clearDisplayCanvas = () => {
        if (!displayCanvasElement.current) {
            return;
        }

        const canvas = displayCanvasElement.current;
        const context = canvas.getContext('2d');
        if (!context) {
            return;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    const drawBrushDiameter = (
        x: number,
        y: number,
    ) => {
        if (!displayCanvasElement.current) {
            return;
        }

        const canvas = displayCanvasElement.current;
        const context = canvas.getContext('2d');
        if (!context) {
            return;
        }

        clearDisplayCanvas();

        const radius = brushSize / 2;

        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI, false);
        context.lineWidth = 1;
        context.strokeStyle = '#000000';
        context.stroke();
    }

    const toggleEraser = (
        active: boolean,
    ) => {
        if (!printCanvasElement.current) {
            return;
        }

        const context = printCanvasElement.current.getContext('2d');

        if (!context) {
            return;
        }

        if (active) {
            context.globalCompositeOperation = 'destination-out';
        } else {
            context.globalCompositeOperation = 'source-over';
        }
    }


    /** hooks */
    const {
        xCoordinate,
        yCoordinate,
        draggable,
        setDraggable,
        dragging,
        coordinatesPercentage,
        handleMouseDown: handleMouseDownDrag,
    } = useGrab(
        position,
        imageBoxDimensions,
        entityElement.current,
    );

    const {
        resizing,
        handleMouseDown: handleMouseDownResize,
    } = useResize(
        updateSize,
    );


    /** effects */
    /** Handle editable entities */
    useEffect(() => {
        if (!editableEntities) {
            setShowEditor(false);
        }
    }, [
        editableEntities,
    ]);

    /** Handle first load. */
    useEffect(() => {
        if (!printCanvasElement.current) {
            return;
        }

        const context = printCanvasElement.current.getContext('2d');
        if (!context) {
            return;
        }

        const image = new Image;
        image.onload = () => {
            if (!printCanvasElement.current) {
                return;
            }

            // Clear Old Image and Reset Bounds
            context.clearRect(0, 0, printCanvasElement.current.width, printCanvasElement.current.height);
            printCanvasElement.current.height = image.height;
            printCanvasElement.current.width = image.width;

            // Redraw Image
            context.drawImage(
                image,
                0,
                0,
                image.width,
                image.height,
            );
        };
        image.src = dataURL;
    }, []);

    /** Handle showEditor */
    useEffect(() => {
        if (!editableEntities) {
            setShowEditor(false);
            return;
        }

        if (dragging) {
            setShowEditor(false);
            return;
        }

        if (!mouseOver) {
            setShowEditor(false);
            return;
        }

        setShowEditor(true);
    }, [
        mouseOver,
        dragging,
        editableEntities,
    ]);

    /** Update coordinates. */
    useEffect(() => {
        const fields = [
            {
                type: 'data.position.x',
                value: coordinatesPercentage.x,
            },
            {
                type: 'data.position.y',
                value: coordinatesPercentage.y,
            },
        ];

        updateEntityField(
            id,
            fields,
        );
    }, [
        coordinatesPercentage,
    ]);

    /** Handle resize. */
    useEffect(() => {
        if (printCanvasElement.current && displayCanvasElement.current) {
            resizeCanvasToDisplaySize(printCanvasElement.current);
            resizeCanvasToDisplaySize(displayCanvasElement.current);
        }
    }, [
        width,
        height,
    ]);

    /** Handle save/load context. */
    useEffect(() => {
        if (resizing) {
            saveContext();
        } else {
            loadContext();
        }
    }, [
        resizing,
    ]);

    /** Handle load context. */
    useEffect(() => {
        if (editableEntities || revealedEntities) {
            loadContext();

            if (printCanvasElement.current) {
                resizeCanvasToDisplaySize(printCanvasElement.current);
            }
        }
    }, [
        editableEntities,
        revealedEntities,
    ]);

    /** Draw enclosure. */
    useEffect(() => {
        if (enclosureDrawing && enclosurePoints.length > 0) {
            drawEnclosure(enclosurePoints);
        }
    }, [
        enclosurePoints,
    ]);

    /** Clear enclosure */
    useEffect(() => {
        if (!enclosureDrawing) {
            setEnclosurePoints([]);
        }
    }, [
        enclosureDrawing,
    ]);

    /** Clear display canvas. */
    useEffect(() => {
        if (!brushDrawing) {
            clearDisplayCanvas();
        }
    }, [
        brushDrawing,
    ]);


    /** render */
    if (
        !editableEntities
        && !revealedEntities
        && !viewable
    ) {
        return (
            <></>
        );
    }

    return (
        <StyledPainted
            tabIndex={0}
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}
            onMouseDown={(event) => {
                mouseDownSetPosition(event);
                handleMouseDownDrag(event);
            }}
            onMouseUp={() => handleMouseUp()}
            onMouseMove={(event) => draw(event)}
            dragMode={draggable}
            draggingMode={dragging}
            brushDrawing={brushDrawing}
            enclosureDrawing={enclosureDrawing}
            style={{
                top: yCoordinate,
                left: xCoordinate,
                width: absoluteWidth + 'px',
                height: absoluteHeight + 'px',
            }}
            ref={entityElement}
        >
            <StyledDisplayCanvas
                style={{
                    width: absoluteWidth + 'px',
                    height: absoluteHeight + 'px',
                }}
                ref={displayCanvasElement}
            />

            <canvas
                style={{
                    opacity,
                    width: absoluteWidth + 'px',
                    height: absoluteHeight + 'px',
                    backgroundColor: showEditor ? color : 'transparent',
                }}
                ref={printCanvasElement}
            />

            {showEditor && (
                <ShapeResizer
                    theme={theme}
                    handleMouseDownResize={handleMouseDownResize}
                />
            )}

            {showEditor && (
                <PaintedEditor
                    /** required */
                    /** - values */
                    draggable={draggable}
                    drawers={editorDrawers}
                    entity={entity}

                    brushDrawing={brushDrawing}
                    enclosureDrawing={enclosureDrawing}
                    eraserMode={eraserMode}
                    brushSize={brushSize}
                    brushColor={brushColor}

                    /** - methods */
                    setDraggable={setDraggable}
                    setDrawers={setEditorDrawers}

                    setDrawingMode={setDrawingMode}
                    toggleEraser={toggleEraser}
                    setEraserMode={setEraserMode}
                    setBrushSize={setBrushSize}
                    setBrushColor={setBrushColor}
                />
            )}
        </StyledPainted>
    );
}


export default Painted;
/** [END] component */
