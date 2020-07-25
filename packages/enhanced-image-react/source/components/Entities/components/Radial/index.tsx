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
import RegularShapesEditor from '#components/Entities/components/Common/RegularShapesEditor';

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

    const absoluteRadius = valueFromPercentage(
        radius,
        imageBoxDimensions.width,
    );

    const absoluteWidth = (absoluteRadius * 2) + 'px';
    const absoluteHeight = (absoluteRadius * 2) + 'px';


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
            radiusValue + x / 2,
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
                <RegularShapesEditor
                    /** required */
                    /** - values */
                    draggable={draggable}
                    drawers={editorDrawers}
                    entity={entity}
                    /** - methods */
                    setDraggable={setDraggable}
                    setDrawers={setEditorDrawers}
                />
            )}
        </StyledRadial>
    );
}


export default Radial;
/** [END] component */
