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
    PluridIconFrame,
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
import Transforms from '#components/Entities/components/Common/Transforms';

import {
    ImageEntityRectangular,
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
    StyledRectangular,
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
        action,
        customStyle,
        annotation,
        labels,
        viewable,
    } = data;

    const absoluteWidth = width * imageBoxDimensions.width / 100 + 'px';
    const absoluteHeight = height * imageBoxDimensions.height / 100 + 'px';


    /** references */
    const timeoutMouseOver = useRef<any>(0);
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
        <StyledRectangular
            tabIndex={0}
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}
            onMouseDown={(event) => handleMouseDown(event)}
            dragMode={draggable}
            draggingMode={dragging}
            style={{
                top: yCoordinate,
                left: xCoordinate,
                width: absoluteWidth,
                height: absoluteHeight,
                backgroundColor: color,
                opacity,
                border: `${border.width}px solid ${border.color}`,
            }}
            ref={entityElement}
        >
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
                        <ButtonIncrements
                            theme={theme}
                            transparentUI={transparentUI}
                            type="data.width"
                            changeValue={(
                                type: any,
                                value: any,
                            ) => {
                                const percentage = percentageFromValue(
                                    value,
                                    imageBoxDimensions.width,
                                );

                                updateEntityField(
                                    id,
                                    [{
                                        type,
                                        value: percentage,
                                    }],
                                );
                            }}
                            value={Math.round(valueFromPercentage(entity.data.width, imageBoxDimensions.width))}
                            icon={(
                                <div>W</div>
                            )}
                        />

                        <ButtonIncrements
                            theme={theme}
                            transparentUI={transparentUI}
                            type="data.height"
                            changeValue={(
                                type: any,
                                value: any,
                            ) => {
                                const percentage = percentageFromValue(
                                    value,
                                    imageBoxDimensions.height,
                                );

                                updateEntityField(
                                    id,
                                    [{
                                        type,
                                        value: percentage,
                                    }],
                                );
                            }}
                            value={Math.round(valueFromPercentage(entity.data.height, imageBoxDimensions.height))}
                            icon={(
                                <div>H</div>
                            )}
                        />

                        <SimpleInput
                            value={resolveColor(entity.data.color)}
                            valueType="data.color"
                            changeValue={(
                                type: any,
                                value: any,
                            ) => {
                                updateEntityField(
                                    id,
                                    [{
                                        type,
                                        value,
                                    }],
                                );
                            }}
                            theme={theme}
                            transparentUI={transparentUI}
                            Icon={PluridIconPalette}
                        />

                        <Transforms
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
        </StyledRectangular>
    );
}


export default Rectangular;
/** [END] component */
