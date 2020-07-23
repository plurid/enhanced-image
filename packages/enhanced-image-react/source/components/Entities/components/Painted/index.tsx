/** [START] imports */
/** libraries */
import React, {
    useContext,
    useRef,
    useState,
    useEffect,
} from 'react';

import {
    PluridIconPalette,
    PluridIconPlay,
    PluridIconSquare,
} from '@plurid/plurid-icons-react';


/** external */
import GrabIcon from '#assets/icons/text-editor/grab';

import Editor from '#components/Editor';

import Handlers from '#components/Editor/components/Handlers';
import VerticalDivider from '#components/Editor/components/VerticalDivider';
import ButtonToggle from '#components/Editor/components/ButtonToggle';
import ButtonIncrements from '#components/Editor/components/ButtonIncrements';
import ButtonInput from '#components/Editor/components/ButtonInput';
import SimpleInput from '#components/Editor/components/SimpleInput';
import Drawer from '#components/Editor/components/Drawer';

import TypeSelector from '#components/Entities/components/Common/TypeSelector';

import {
    ImageEntityPainted,
} from '#data/interfaces';

import {
    useGrab,
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
        dataURL,
        position,
        viewable,
    } = data;


    /** references */
    const timeoutMouseOver = useRef<any>(0);
    const canvasElement = useRef<HTMLCanvasElement>(null);
    const entityElement = useRef<HTMLDivElement>(null);


    /** state */
    const {
        xCoordinate,
        yCoordinate,
        draggable,
        setDraggable,
        dragging,
        coordinatesPercentage,
        handleMouseDown,
    } = useGrab(
        position,
        imageBoxDimensions,
        entityElement.current,
    );

    const [showEditor, setShowEditor] = useState(false);
    const [mouseOver, setMouseOver] = useState(false);

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


    /** effects */
    /** Handle editable entities */
    useEffect(() => {
        if (!editableEntities) {
            setShowEditor(false);
        }
    }, [
        editableEntities,
    ]);

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

    /**
     * Handle showEditor
     */
    useEffect(() => {
        if (dragging) {
            setShowEditor(false);
            return;
        }

        if (
            mouseOver
            // && editableText
        ) {
            setShowEditor(true);
        } else {
            setShowEditor(false);
        }
    }, [
        // editableText,
        mouseOver,
        dragging,
    ]);

    /** Update coordinates */
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
            onMouseDown={(event) => handleMouseDown(event)}
            dragMode={draggable}
            draggingMode={dragging}
            style={{
                top: yCoordinate,
                left: xCoordinate,
            }}
            ref={entityElement}
        >
            <canvas
                ref={canvasElement}
            />

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
                        {/* <div>
                            brush size

                            brush

                            eraser
                        </div> */}


                        {/* <SimpleInput
                            value={resolveColor(entity.data.color)}
                            valueType="color"
                            changeValue={() => {}}
                            theme={theme}
                            transparentUI={transparentUI}
                            Icon={PluridIconPalette}
                        /> */}

                        {/* <SimpleInput
                            value={resolveColor(entity.data.border.color)}
                            valueType="border.color"
                            changeValue={() => {}}
                            theme={theme}
                            transparentUI={transparentUI}
                            Icon={PluridIconSquare}
                        /> */}

                        {/* <SimpleInput
                            value={resolveColor(entity.data.border.width)}
                            valueType="border.width"
                            changeValue={() => {}}
                            theme={theme}
                            transparentUI={transparentUI}
                            Icon={PluridIconSquare}
                        /> */}

                        <ButtonInput
                            theme={theme}
                            transparentUI={transparentUI}
                            // toggle={() => toggleTextFormat('action.active', true)}
                            toggle={() => {}}
                            toggled={entity.data.action.active}
                            icon={(
                                <PluridIconPlay />
                            )}
                            value={entity.data.action.type}
                            valueType="action.type"
                            // changeValue={updateField}
                            // renderOutside={renderOutside}
                            // outsideKind={outsideKind}
                            // setOutsideKind={setOutsideKind}
                            changeValue={() => {}}
                            renderOutside={() => {}}
                            outsideKind={''}
                            setOutsideKind={() => {}}
                        />

                        <ButtonInput
                            theme={theme}
                            transparentUI={transparentUI}
                            toggle={() => {}}
                            toggled={entity.data.action.active}
                            icon={(
                                <div>
                                    CSS
                                </div>
                            )}
                            value={entity.data.action.type}
                            valueType="action.type"
                            // changeValue={updateField}
                            // renderOutside={renderOutside}
                            // outsideKind={outsideKind}
                            // setOutsideKind={setOutsideKind}
                            changeValue={() => {}}
                            renderOutside={() => {}}
                            outsideKind={''}
                            setOutsideKind={() => {}}
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
                                [
                                    {
                                        type: 'data.viewable',
                                        value: !viewable
                                    },
                                ],
                            );
                        }}
                        duplicate={() => {}}
                        obliterate={() => {}}
                    />
                </Editor>
            )}
        </StyledPainted>
    );
}


export default Painted;
/** [END] component */
