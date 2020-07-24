/** [START] imports */
/** libraries */
import React, {
    useContext,
    useRef,
    useState,
    useEffect,
} from 'react';


/** external */
import GrabIcon from '#assets/icons/text-editor/grab';

import Editor from '#components/Editor';

import Handlers from '#components/Editor/components/Handlers';
import VerticalDivider from '#components/Editor/components/VerticalDivider';
import ButtonToggle from '#components/Editor/components/ButtonToggle';
import Drawer from '#components/Editor/components/Drawer';

import TypeSelector from '#components/Entities/components/Common/TypeSelector';
import RegularShapesTransforms from '#components/Entities/components/Common/RegularShapesTransforms';
import GeneralTransforms from '#components/Entities/components/Common/GeneralTransforms';
import ShapeResizer from '#components/Entities/components/Common/ShapeResizer';

import {
    ImageEntityRadial,
} from '#data/interfaces';

import {
    useGrab,
    useResize,
} from '#services/hooks';

import {
    Context,

    /** percentage */
    percentageFromValue,
    valueFromPercentage,

    /** ui */
    toggleDrawer,
} from '#services/utilities';


/** internal */
import {
    StyledRadial,
    StyledRadialView,
} from './styled';
/** [END] imports */



/** [START] component */
export interface RadialProperties {
    entity: ImageEntityRadial;
}

const Radial: React.FC<RadialProperties> = (
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
        radius,
        color,
        position,
        border,
        opacity,
        viewable,
    } = data;

    const absoluteRadius = radius * imageBoxDimensions.width / 100;

    const absoluteWidth = absoluteRadius + 'px';
    const absoluteHeight = absoluteRadius + 'px';


    /** references */
    const timeoutMouseOver = useRef<any>(0);
    const entityElement = useRef<HTMLDivElement>(null);


    /** state */
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

    const updateSize = (
        x: number,
        y: number,
    ) => {
        const radiusValue = Math.round(
            valueFromPercentage(
                radius,
                imageBoxDimensions.width,
            )
        );

        const percentageRadius = percentageFromValue(
            radiusValue + x,
            imageBoxDimensions.width,
        );

        updateEntityField(
            id,
            [
                {
                    type: 'data.radius',
                    value: percentageRadius,
                },
            ],
        );
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
        handleMouseDown: handleMouseDownResize,
    } = useResize(
        updateSize,
    );


    /** effects */
    /**
     * Handle showEditor
     */
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


    /** effects */
    /** Handle editable entities */
    useEffect(() => {
        if (!editableEntities) {
            setShowEditor(false);
        }
    }, [
        editableEntities,
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
        <StyledRadial
            tabIndex={0}
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}
            onMouseDown={(event) => handleMouseDownDrag(event)}
            dragMode={draggable}
            draggingMode={dragging}
            style={{
                top: yCoordinate,
                left: xCoordinate,
                width: absoluteWidth,
                height: absoluteHeight,
            }}
            ref={entityElement}
        >
            <StyledRadialView
                style={{
                    backgroundColor: color,
                    border: `${border.width}px solid ${border.color}`,
                    opacity,
                }}
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
        </StyledRadial>
    );
}


export default Radial;
/** [END] component */
