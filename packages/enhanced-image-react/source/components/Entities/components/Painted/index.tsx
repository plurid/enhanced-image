/** [START] imports */
/** libraries */
import React, {
    useContext,
    useRef,
    useState,
    useEffect,
} from 'react';

import {
    PluridIconPaintBrush,
    PluridIconFrame,
    PluridIconObliterate,
    PluridIconEdit,
    PluridIconPaintBucket,
} from '@plurid/plurid-icons-react';


/** external */
import GrabIcon from '#assets/icons/text-editor/grab';

import Editor from '#components/Editor';

import Handlers from '#components/Editor/components/Handlers';
import VerticalDivider from '#components/Editor/components/VerticalDivider';
import ButtonToggle from '#components/Editor/components/ButtonToggle';
import ButtonIncrements from '#components/Editor/components/ButtonIncrements';
import SimpleInput from '#components/Editor/components/SimpleInput';
import Drawer from '#components/Editor/components/Drawer';

import TypeSelector from '#components/Entities/components/Common/TypeSelector';
import RegularShapesTransforms from '#components/Entities/components/Common/RegularShapesTransforms';
import GeneralTransforms from '#components/Entities/components/Common/GeneralTransforms';
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

    /** color */
    resolveColor,

    /** ui */
    toggleDrawer,
} from '#services/utilities';


/** internal */
import {
    StyledPainted,
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
    const canvasElement = useRef<HTMLCanvasElement>(null);
    const entityElement = useRef<HTMLDivElement>(null);


    /** state */
    const [showEditor, setShowEditor] = useState(false);
    const [mouseOver, setMouseOver] = useState(false);
    const [brushDrawing, setBrushDrawing] = useState(false);
    const [enclosureDrawing, setEnclosureDrawing] = useState(false);
    const [enclosurePoints, setEnclosurePoints] = useState<any[]>([]);
    const [eraserMode, setEraserMode] = useState(false);
    const [brushSize, setBrushSize] = useState(20);
    const [brushColor, setBrushColor] = useState('#483d8b');

    const [positions, setPositions] = useState({
        x: 0,
        y: 0,
    });

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
        if (!canvasElement.current) {
            return;
        }

        const context = canvasElement.current.getContext('2d');
        if (!context) {
            return;
        }

        const image = new Image;
        image.onload = () => {
            if (!canvasElement.current) {
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
        if (!canvasElement.current) {
            return;
        }

        const dataURL = canvasElement.current.toDataURL();

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

        const position = {
            x: event.pageX,
            y: event.pageY,
        };

        setPositions(position);

        if (enclosureDrawing) {
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

        // mouse left button must be pressed
        if (event.buttons !== 1) {
            return;
        }

        if (!entityElement.current) {
            return;
        }

        const {
            left,
            top,
        } = entityElement.current.getBoundingClientRect();

        if (!canvasElement.current) {
            return;
        }

        const context = canvasElement.current.getContext('2d');

        if (!context) {
            return;
        }

        context.beginPath();

        context.lineWidth = brushSize;
        context.lineCap = 'round';
        context.strokeStyle = brushColor;

        context.moveTo(positions.x - left, positions.y - top);
        mouseDownSetPosition(event);
        context.lineTo(positions.x - left, positions.y - top);

        context.stroke();
        context.closePath();
    }

    const drawEnclosure = (
        enclosurePoints: any[],
    ) => {
        if (!entityElement.current) {
            return;
        }

        const {
            left,
            top,
        } = entityElement.current.getBoundingClientRect();

        if (!canvasElement.current) {
            return;
        }

        const context = canvasElement.current.getContext('2d');

        if (!context) {
            return;
        }

        const region = new Path2D();

        region.moveTo(
            enclosurePoints[0].x - left,
            enclosurePoints[0].y - top,
        );

        for (const point of enclosurePoints) {
            region.lineTo(
                point.x - left,
                point.y - top,
            );
        }

        region.closePath();

        context.fillStyle = brushColor;
        context.fill(region, 'evenodd');
    }

    const toggleEraser = (
        active: boolean,
    ) => {
        if (!canvasElement.current) {
            return;
        }

        const context = canvasElement.current.getContext('2d');

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
        if (!canvasElement.current) {
            return;
        }

        const context = canvasElement.current.getContext('2d');
        if (!context) {
            return;
        }

        const image = new Image;
        image.onload = () => {
            if (!canvasElement.current) {
                return;
            }

            // Clear Old Image and Reset Bounds
            context.clearRect(0, 0, canvasElement.current.width, canvasElement.current.height);
            canvasElement.current.height = image.height;
            canvasElement.current.width = image.width;

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
        if (canvasElement.current) {
            resizeCanvasToDisplaySize(canvasElement.current);
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

            if (canvasElement.current) {
                resizeCanvasToDisplaySize(canvasElement.current);
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
            onMouseMove={(event) => draw(event)}
            onMouseUp={(event) => {
                if (!dragging && !resizing) {
                    saveContext();
                }
            }}
            dragMode={draggable}
            draggingMode={dragging}
            style={{
                top: yCoordinate,
                left: xCoordinate,
                width: absoluteWidth + 'px',
                height: absoluteHeight + 'px',
            }}
            ref={entityElement}
        >
            <canvas
                style={{
                    opacity,
                    width: absoluteWidth + 'px',
                    height: absoluteHeight + 'px',
                    backgroundColor: showEditor ? color : 'transparent',
                }}
                ref={canvasElement}
            />

            {showEditor && (
                <ShapeResizer
                    theme={theme}
                    handleMouseDownResize={handleMouseDownResize}
                />
            )}

            {showEditor && (
                <Editor
                    positions={{
                        x: -17,
                        y: -34,
                    }}
                    drawers={[]}
                    toggleDrawer={() => {}}
                    setWidth={() => {}}
                    fullWidth={false}
                >
                    <ButtonToggle
                        theme={theme}
                        toggle={() => setDraggable(drag => !drag)}
                        toggled={draggable}
                        icon={GrabIcon}
                    />

                    <TypeSelector
                        theme={theme}
                        id={id}
                        type={type}
                        convertEntity={convertEntity}
                    />

                    <VerticalDivider
                        theme={theme}
                    />

                    <Drawer
                        theme={theme}
                        title="Data"
                        expand={editorDrawers.includes('DATA')}
                        toggleExpand={() => toggleDrawer('DATA', editorDrawers, setEditorDrawers)}
                    >
                        <ButtonToggle
                            theme={theme}
                            toggle={() => setDrawingMode('brush')}
                            toggled={brushDrawing}
                            icon={(
                                <PluridIconPaintBrush />
                            )}
                        />

                        <ButtonToggle
                            theme={theme}
                            toggle={() => setDrawingMode('enclosure')}
                            toggled={enclosureDrawing}
                            icon={(
                                <PluridIconFrame />
                            )}
                        />

                        <ButtonToggle
                            theme={theme}
                            toggle={() => {
                                toggleEraser(!eraserMode);
                                setEraserMode(mode => !mode);
                            }}
                            toggled={eraserMode}
                            icon={(
                                <PluridIconObliterate />
                            )}
                        />

                        <ButtonIncrements
                            theme={theme}
                            transparentUI={transparentUI}
                            type={'brush.size'}
                            changeValue={(
                                type: any,
                                value: any,
                            ) => {
                                setBrushSize(value);
                            }}
                            value={brushSize}
                            icon={(
                                <PluridIconEdit />
                            )}
                        />

                        <SimpleInput
                            value={resolveColor(brushColor)}
                            valueType="brush.color"
                            changeValue={(
                                type: any,
                                value: any,
                            ) => {
                                setBrushColor(value);
                            }}
                            theme={theme}
                            transparentUI={transparentUI}
                            Icon={PluridIconPaintBucket}
                        />

                        <RegularShapesTransforms
                            theme={theme}
                            transparentUI={transparentUI}
                            imageBoxDimensions={imageBoxDimensions}
                            entity={entity}
                            updateEntityField={updateEntityField}
                        />

                        <GeneralTransforms
                            theme={theme}
                            transparentUI={transparentUI}
                            entity={entity}
                            updateEntityField={updateEntityField}
                        />
                    </Drawer>

                    <VerticalDivider
                        theme={theme}
                    />

                    <Handlers
                        theme={theme}
                        viewable={viewable}
                        toggleViewable={() => {
                            updateEntityField(
                                id,
                                [{
                                    type: 'data.viewable',
                                    value: !viewable,
                                }],
                            );
                        }}
                        duplicate={() => duplicateEntity(id)}
                        obliterate={() => obliterateEntity(id)}
                    />
                </Editor>
            )}
        </StyledPainted>
    );
}


export default Painted;
/** [END] component */
