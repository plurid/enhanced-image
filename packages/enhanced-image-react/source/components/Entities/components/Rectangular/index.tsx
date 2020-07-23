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
} from '@plurid/plurid-icons-react';


/** external */
import GrabIcon from '#assets/icons/text-editor/grab';
import ViewableIcon from '#assets/icons/text-editor/viewable';
import NotViewableIcon from '#assets/icons/text-editor/not-viewable';
import DuplicateIcon from '#assets/icons/text-editor/duplicate';
import DeleteIcon from '#assets/icons/text-editor/delete';

import Editor from '#components/Editor';

import VerticalDivider from '#components/Editor/components/VerticalDivider';
import ButtonToggle from '#components/Editor/components/ButtonToggle';
import ButtonIncrements from '#components/Editor/components/ButtonIncrements';
import ButtonClick from '#components/Editor/components/ButtonClick';
import ButtonInput from '#components/Editor/components/ButtonInput';
import SimpleInput from '#components/Editor/components/SimpleInput';
import Drawer from '#components/Editor/components/Drawer';

import {
    ImageEntityRectangular,
} from '#data/interfaces';

import {
    Context,

    /** percentage */
    valueFromPercentage,
    percentageFromValue,

    /** color */
    resolveColor
} from '#services/utilities';


/** internal */
import {
    StyledRectangular,
} from './styled';
/** [END] imports */




const toggleDrawer = (
    drawer: string,
    editorDrawers: string[],
    setEditorDrawers: any,
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
    } = context;


    /** properties */
    const {
        entity,
    } = properties;

    const {
        color,
        height,
        width,
        position,
    } = entity.data;

    const absoluteWidth = width * imageBoxDimensions.width / 100 + 'px';
    const absoluteHeight = height * imageBoxDimensions.height / 100 + 'px';

    const absoluteX = position.x * imageBoxDimensions.width / 100 + 'px';
    const absoluteY = position.y * imageBoxDimensions.height / 100 + 'px';


    /** references */
    const timeoutMouseOver = useRef<any>(0);


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


    /** effects */
    /**
     * Handle showEditor
     */
    useEffect(() => {
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
        <StyledRectangular
            tabIndex={0}
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}
            style={{
                top: absoluteY,
                left: absoluteX,
                width: absoluteWidth,
                height: absoluteHeight,
                backgroundColor: color,
            }}
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
                        toggle={() => {

                        }}
                        toggled={false}
                        icon={GrabIcon}
                    />

                    {/* rectangular type */}
                    <ButtonToggle
                        theme={theme}
                        toggle={() => {
                        }}
                        toggled={false}
                        icon={GrabIcon}
                    />

                    {/* radial type */}
                    <ButtonToggle
                        theme={theme}
                        toggle={() => {
                        }}
                        toggled={false}
                        icon={GrabIcon}
                    />

                    {/* painted type */}
                    <ButtonToggle
                        theme={theme}
                        toggle={() => {
                        }}
                        toggled={false}
                        icon={GrabIcon}
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
                            changeValue={() => {}}
                            value={Math.round(valueFromPercentage(entity.data.width, imageBoxDimensions.width))}
                            icon={(
                                <div>W</div>
                            )}
                        />

                        <ButtonIncrements
                            theme={theme}
                            transparentUI={transparentUI}
                            type="data.height"
                            changeValue={() => {}}
                            value={Math.round(valueFromPercentage(entity.data.height, imageBoxDimensions.height))}
                            icon={(
                                <div>H</div>
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
                            value={resolveColor(entity.data.border)}
                            valueType="border"
                            changeValue={() => {}}
                            theme={theme}
                            transparentUI={transparentUI}
                            Icon={PluridIconPalette}
                        />

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

                    <ButtonToggle
                        theme={theme}
                        toggle={() => {}}
                        toggled={false}
                        icon={NotViewableIcon}
                        // icon={false ? ViewableIcon : NotViewableIcon}
                    />

                    <ButtonClick
                        theme={theme}
                        atClick={() => {}}
                        icon={DuplicateIcon}
                    />

                    <ButtonClick
                        theme={theme}
                        atClick={() => {}}
                        icon={DeleteIcon}
                    />
                </Editor>
            )}
        </StyledRectangular>
    );
}


export default Rectangular;
/** [END] component */
