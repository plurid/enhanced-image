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
    ImageEntityRadial,
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
    StyledRadial,
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

        convertEntity,
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
        viewable,
    } = data;

    const absoluteRadius = radius * imageBoxDimensions.width / 100;

    const absoluteWidth = absoluteRadius + 'px';
    const absoluteHeight = absoluteRadius + 'px';

    const absoluteX = position.x * imageBoxDimensions.width / 100 + 'px';
    const absoluteY = position.y * imageBoxDimensions.height / 100 + 'px';


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
        handleMouseDown,
    } = useGrab(
        absoluteX,
        absoluteY,
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


    /** effects */
    /** Handle editable entities */
    useEffect(() => {
        if (!editableEntities) {
            setShowEditor(false);
        }
    }, [
        editableEntities,
    ]);


    /** render */
    return (
        <StyledRadial
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
                borderRadius: absoluteRadius / 2 + 'px',
                backgroundColor: color,
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
                            type="data.radius"
                            changeValue={() => {}}
                            value={Math.round(valueFromPercentage(entity.data.radius, imageBoxDimensions.width))}
                            icon={(
                                <div>W</div>
                            )}
                        />

                        <SimpleInput
                            value={resolveColor(entity.data.color)}
                            valueType="color"
                            changeValue={() => {}}
                            theme={theme}
                            transparentUI={transparentUI}
                            Icon={PluridIconPalette}
                        />

                        <SimpleInput
                            value={resolveColor(entity.data.border.color)}
                            valueType="border.color"
                            changeValue={() => {}}
                            theme={theme}
                            transparentUI={transparentUI}
                            Icon={PluridIconSquare}
                        />

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
                    />
                </Editor>
            )}
        </StyledRadial>
    );
}


export default Radial;
/** [END] component */
