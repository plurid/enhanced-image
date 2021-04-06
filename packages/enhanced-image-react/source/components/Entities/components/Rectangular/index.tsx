/** [START] imports */
/** libraries */
import React, {
    useContext,
    useRef,
    useState,
    useEffect,
} from 'react';


/** external */
import ShapeResizer from '~components/Entities/components/Common/ShapeResizer';
import RegularShapesEditor from '~components/Entities/components/Common/RegularShapesEditor';

import {
    ImageEntityRectangular,
} from '~data/interfaces';

import {
    useGrab,
    useResize,
} from '~services/hooks';

import {
    Context,

    /** percentage */
    percentageFromValue,
    valueFromPercentage,

    /** ui */
    toggleDrawer,
} from '~services/utilities';


/** internal */
import {
    StyledRectangular,
    StyledRectangularView,
} from './styled';
/** [END] imports */



/** [START] component */
export interface RectangularProperties {
    entity: ImageEntityRectangular;
}

const Rectangular: React.FC<RectangularProperties> = (
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
        highlight,
        viewable,
    } = data;

    const absoluteWidth = width * imageBoxDimensions.width / 100 + 'px';
    const absoluteHeight = height * imageBoxDimensions.height / 100 + 'px';


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
        && !highlight
    ) {
        return (
            <></>
        );
    }

    return (
        <StyledRectangular
            tabIndex={0}
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}
            onMouseDown={(event) => handleMouseDownDrag(event)}
            draggingMode={dragging}
            dragMode={draggable}
            style={{
                top: yCoordinate,
                left: xCoordinate,
                width: absoluteWidth,
                height: absoluteHeight,
            }}
            ref={entityElement}
        >
            <StyledRectangularView
                style={{
                    backgroundColor: mouseOver && highlight && !editableEntities && !revealedEntities && !viewable
                        ? highlight
                        : !mouseOver && highlight && !editableEntities && !revealedEntities && !viewable
                            ? 'transparent'
                            : color,
                    border: editableEntities || revealedEntities || viewable
                        ? `${border.width}px solid ${border.color}`
                        : '',
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
        </StyledRectangular>
    );
}


export default Rectangular;
/** [END] component */
