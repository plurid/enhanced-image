/** [START] imports */
/** libraries */
import React, {
    useContext,
    useRef,
    useState,
    useEffect,
} from 'react';

import {
    objects,
 } from '@plurid/plurid-functions';

import {
    PluridIconPalette,
    PluridIconSpace,
    PluridIconPlay,

    PluridIconText,
    PluridIconGrab,
    PluridIconFontSize,
    PluridIconLink,
    PluridIconBold,
    PluridIconItalic,
    PluridIconLetterSpacing,
    PluridIconWordSpacing,
    PluridIconTransview,
} from '@plurid/plurid-icons-react';


/** external */
import VerticalDivider from '~components/Editor/components/VerticalDivider';
import ButtonDropdown from '~components/Editor/components/ButtonDropdown';
import ButtonIncrements from '~components/Editor/components/ButtonIncrements';
import ButtonInput from '~components/Editor/components/ButtonInput';
import ButtonToggle from '~components/Editor/components/ButtonToggle';
import ButtonToggleRender from '~components/Editor/components/ButtonToggleRender';
import ButtonsColors from '~components/Editor/components/ButtonsColors';
import SimpleInput from '~components/Editor/components/SimpleInput';
import Slider from '~components/Editor/components/Slider';
import Drawer from '~components/Editor/components/Drawer';

import Handlers from '~components/Editor/components/Handlers';

import {
    selectableFonts,
 } from '~data/constants/fonts';

import {
    ImageText,
    ImageTextVersionTextline,
} from '~data/interfaces';

import {
    Context,

    /** percentage */
    valueFromPercentage,
    percentageFromValue,

    /** color */
    resolveColor
} from '~services/utilities';


/** internal */
import TransviewContainer from './components/TransviewContainer';

import {
    StyledTextEditor,
    StyledOutside,
    StyledTransformSliders,
} from './styled';
/** [END] imports */



/** [START] component */
export interface TextEditorProperties {
    textItem: ImageText;
    currentVersion: ImageTextVersionTextline;

    editable: boolean;
    setEditable: React.Dispatch<React.SetStateAction<boolean>>;
    draggable: boolean;
    setDraggable: React.Dispatch<React.SetStateAction<boolean>>;
    setViewable: () => void;

    positions: {
        x: number;
        y: number;
    };
    drawers: string[];
    toggleDrawer: (
        drawer: string,
    ) => void;
    setWidth: React.Dispatch<React.SetStateAction<number>>;
    fullWidth: boolean;

    saveTextValue: () => void;
}

const TextEditor: React.FC<TextEditorProperties> = (
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

        duplicateTextItem,
        deleteTextItem,

        updateTextItemField,
    } = context;


    /** properties */
    const {
        textItem,
        currentVersion,

        editable,
        setEditable,
        draggable,
        setDraggable,
        setViewable,

        positions,
        drawers,
        toggleDrawer,
        setWidth,
        fullWidth,

        saveTextValue,
    } = properties;


    /** references */
    const editor = useRef<HTMLDivElement>(null);


    /** state */
    const [outside, setOutside] = useState(<></>);
    const [outsideKind, setOutsideKind] = useState('');
    const [outsideTopBased, setOutsideTopBased] = useState(false);
    const [outsideLeft, setOutsideLeft] = useState(100);
    const [transformSlider, setTransformSlider] = useState('');
    const [showTransview, setShowTransview] = useState(false);
    const [transviewContainer, setTransviewContainer] = useState((
        <TransviewContainer
            theme={theme}
            transparentUI={transparentUI}
            textID={textItem.id}
            transview={currentVersion.transview}
        />
    ));


    /** handlers */
    const updateField = (
        type: string,
        value: number | string | boolean,
    ) => {
        switch (type) {
            case 'font.size':
                if (typeof value === 'number') {
                    const fontSizePercentage = percentageFromValue(value, imageBoxDimensions.height);
                    updateTextItemField(textItem.id, 'font.size', fontSizePercentage);
                }
                break;
            case 'font.family':
                updateTextItemField(textItem.id, 'font.family', value);
                break;
            case 'font.letterSpacing':
                if (typeof value === 'number') {
                    const letterSpacingPercentage = percentageFromValue(value, imageBoxDimensions.width);
                    updateTextItemField(textItem.id, 'font.letterSpacing', letterSpacingPercentage);
                }
                break;
            case 'font.wordSpacing':
                if (typeof value === 'number') {
                    const wordSpacingPercentage = percentageFromValue(value, imageBoxDimensions.width);
                    updateTextItemField(textItem.id, 'font.wordSpacing', wordSpacingPercentage);
                }
                break;
            case 'link.to':
                updateTextItemField(textItem.id, 'link.to', value);
                break;
            case 'action.type':
                updateTextItemField(textItem.id, 'action.type', value);
                break;
            case 'color':
                updateTextItemField(textItem.id, 'color', value);
                break;
            case 'transform.perspective':
                if (typeof value === 'number') {
                    updateTextItemField(textItem.id, 'transform.perspective', value - 1);
                }
                break;
            case 'transform.rx':
                if (typeof value === 'number') {
                    updateTextItemField(textItem.id, 'transform.rx', value - 1);
                }
                break;
            case 'transform.ry':
                if (typeof value === 'number') {
                    updateTextItemField(textItem.id, 'transform.ry', value - 1);
                }
                break;
            case 'transform.rz':
                if (typeof value === 'number') {
                    updateTextItemField(textItem.id, 'transform.rz', value - 1);
                }
                break;
            case 'transform.sx':
                if (typeof value === 'number') {
                    updateTextItemField(textItem.id, 'transform.sx', value - 1);
                }
                break;
            case 'transform.sy':
                if (typeof value === 'number') {
                    updateTextItemField(textItem.id, 'transform.sy', value - 1);
                }
                break;
        }
    }

    const toggleTextFormat = (
        type: string,
        checkValue: string | boolean,
    ) => {
        const data = objects.getNested(currentVersion, type);

        if (typeof checkValue === 'boolean') {
            if (data) {
                updateTextItemField(textItem.id, type, false);
            } else {
                updateTextItemField(textItem.id, type, true);
            }
        } else {
            if (data === checkValue) {
                updateTextItemField(textItem.id, type, 'normal');
            } else {
                updateTextItemField(textItem.id, type, checkValue);
            }
        }
    }

    const renderOutside = (
        outside: JSX.Element,
        left: number = 0,
    ) => {
        setOutside(outside);

        const itemLeft = positions.x + left;
        const editorScrollLeft = editor.current
            ? editor.current.scrollLeft
            : 0;

        const outsideLeft = itemLeft - editorScrollLeft;

        setOutsideLeft(outsideLeft);
    }


    /** effects */
    /** Editor width. */
    useEffect(() => {
        if (editor.current) {
            setWidth(editor.current.offsetWidth);
        }
    }, [
        editor,
        drawers.length,
    ]);

    /** Outside top based. */
    useEffect(() => {
        if (positions.y > -34) {
            setOutsideTopBased(false);
        } else {
            setOutsideTopBased(true);
        }
    }, [
        positions.y,
    ]);

    /** Transview Container */
    useEffect(() => {
        const transviewContainer = (
            <TransviewContainer
                theme={theme}
                transparentUI={transparentUI}
                textID={textItem.id}
                transview={currentVersion.transview}
            />
        );

        setTransviewContainer(transviewContainer);
    }, [
        currentVersion.transview,
        currentVersion.transview.active,
        currentVersion.transview.data,
        currentVersion.transview.data.length,
    ]);

    /** Show Transview */
    useEffect(() => {
        if (outsideKind !== 'transview') {
            setShowTransview(false);
        }
    }, [
        outsideKind,
    ]);

    /** Drawers. */
    useEffect(() => {
        if (!drawers.includes('FONT')) {
            setOutsideKind('');
            renderOutside(<></>);
        }

        if (!drawers.includes('TRANSFORM')) {
            setTransformSlider('');
            renderOutside(<></>);
        }
    }, [
        drawers.length,
    ]);


    /** render */
    return (
        <>
            <StyledTextEditor
                theme={theme}
                ref={editor}
                transparentUI={transparentUI}
                imageBoxDimensions={imageBoxDimensions}
                fullWidth={fullWidth}
                style={{
                    left: positions.x + 'px',
                    top: positions.y + 'px',
                }}
            >
                <ButtonToggle
                    theme={theme}
                    toggle={() => {
                        if (draggable) {
                            setDraggable(false);
                        }

                        if (editable) {
                            saveTextValue();
                        }

                        setEditable(editable => !editable);
                    }}
                    toggled={editable}
                    icon={(
                        <PluridIconText />
                    )}
                />

                <ButtonToggle
                    theme={theme}
                    toggle={() => {
                        if (editable) {
                            saveTextValue();
                            setEditable(false);
                        }

                        setDraggable(draggable => !draggable)
                    }}
                    toggled={draggable}
                    icon={(
                        <PluridIconGrab />
                    )}
                />

                <VerticalDivider
                    theme={theme}
                />

                <Drawer
                    theme={theme}
                    title="Font"
                    expand={drawers.includes('FONT')}
                    toggleExpand={() => toggleDrawer('FONT')}
                >
                    <ButtonIncrements
                        theme={theme}
                        transparentUI={transparentUI}
                        type="font.size"
                        changeValue={updateField}
                        value={Math.round(valueFromPercentage(currentVersion.font.size, imageBoxDimensions.height))}
                        icon={(
                            <PluridIconFontSize />
                        )}
                    />

                    <ButtonDropdown
                        theme={theme}
                        transparentUI={transparentUI}
                        type="font.family"
                        alterStyle="font.family"
                        selected={currentVersion.font.family}
                        selectables={selectableFonts}
                        changeSelected={updateField}
                        toggleEditor={() => {}}
                        textDraggable={false}
                        toggleTextDraggable={() => {}}
                        toggleTextSelected={() => {}}
                        renderOutside={renderOutside}
                        outsideKind={outsideKind}
                        setOutsideKind={setOutsideKind}
                    />

                    <ButtonInput
                        theme={theme}
                        transparentUI={transparentUI}
                        toggle={() => toggleTextFormat('link.active', true)}
                        toggled={currentVersion.link.active}
                        icon={(
                            <PluridIconLink />
                        )}
                        value={currentVersion.link.to}
                        valueType="link.to"
                        changeValue={updateField}
                        renderOutside={renderOutside}
                        outsideKind={outsideKind}
                        setOutsideKind={setOutsideKind}
                        goToLink={true}
                    />

                    <ButtonInput
                        theme={theme}
                        transparentUI={transparentUI}
                        toggle={() => toggleTextFormat('action.active', true)}
                        toggled={currentVersion.action.active}
                        icon={(
                            <PluridIconPlay />
                        )}
                        value={currentVersion.action.type}
                        valueType="action.type"
                        changeValue={updateField}
                        renderOutside={renderOutside}
                        outsideKind={outsideKind}
                        setOutsideKind={setOutsideKind}
                    />

                    <ButtonToggleRender
                        theme={theme}
                        type={'transview'}
                        toggle={() => setShowTransview(show => !show)}
                        toggled={showTransview}
                        icon={(
                            <PluridIconTransview />
                        )}
                        renderOutside={renderOutside}
                        outsideKind={outsideKind}
                        setOutsideKind={setOutsideKind}
                        Outside={transviewContainer}
                    />

                    <ButtonToggle
                        theme={theme}
                        toggle={() => toggleTextFormat('font.weight', 'bold')}
                        toggled={currentVersion.font.weight === 'bold'}
                        icon={(
                            <PluridIconBold />
                        )}
                    />

                    <ButtonToggle
                        theme={theme}
                        toggle={() => toggleTextFormat('font.style', 'italic')}
                        toggled={currentVersion.font.style === 'italic'}
                        icon={(
                            <PluridIconItalic />
                        )}
                    />

                    <ButtonIncrements
                        theme={theme}
                        transparentUI={transparentUI}
                        type="font.letterSpacing"
                        changeValue={updateField}
                        value={valueFromPercentage(currentVersion.font.letterSpacing, imageBoxDimensions.width)}
                        icon={(
                            <PluridIconLetterSpacing />
                        )}
                        step={0.1}
                    />

                    <ButtonIncrements
                        theme={theme}
                        transparentUI={transparentUI}
                        type="font.wordSpacing"
                        changeValue={updateField}
                        value={valueFromPercentage(currentVersion.font.wordSpacing, imageBoxDimensions.width)}
                        icon={(
                            <PluridIconWordSpacing />
                        )}
                        step={0.1}
                    />

                    <ButtonsColors
                        theme={theme}
                        selectedColor={currentVersion.color}
                        changeValue={updateField}
                    />

                    <SimpleInput
                        value={resolveColor(currentVersion.color)}
                        valueType="color"
                        changeValue={updateField}
                        theme={theme}
                        transparentUI={transparentUI}
                        Icon={PluridIconPalette}
                    />
                </Drawer>

                <VerticalDivider
                    theme={theme}
                />

                <Drawer
                    theme={theme}
                    title="Transform"
                    expand={drawers.includes('TRANSFORM')}
                    toggleExpand={() => toggleDrawer('TRANSFORM')}
                >
                    <StyledTransformSliders>
                        <Slider
                            value={currentVersion.transform.perspective + 1}
                            valueType="transform.perspective"
                            changeValue={updateField}
                            theme={theme}
                            transparentUI={transparentUI}
                            Icon={PluridIconSpace}
                            renderOutside={renderOutside}
                            min={1}
                            step={10}
                            max={2001}
                            show={transformSlider}
                            setShow={setTransformSlider}
                        />

                        <Slider
                            value={currentVersion.transform.rx + 1}
                            valueType="transform.rx"
                            changeValue={updateField}
                            theme={theme}
                            transparentUI={transparentUI}
                            Icon={() => (
                                <div>
                                    Rx
                                </div>
                            )}
                            renderOutside={renderOutside}
                            min={1}
                            max={361}
                            show={transformSlider}
                            setShow={setTransformSlider}
                        />

                        <Slider
                            value={currentVersion.transform.ry + 1}
                            valueType="transform.ry"
                            changeValue={updateField}
                            theme={theme}
                            transparentUI={transparentUI}
                            Icon={() => (
                                <div>
                                    Ry
                                </div>
                            )}
                            renderOutside={renderOutside}
                            min={1}
                            max={361}
                            show={transformSlider}
                            setShow={setTransformSlider}
                        />

                        <Slider
                            value={currentVersion.transform.rz + 1}
                            valueType="transform.rz"
                            changeValue={updateField}
                            theme={theme}
                            transparentUI={transparentUI}
                            Icon={() => (
                                <div>
                                    Rz
                                </div>
                            )}
                            renderOutside={renderOutside}
                            min={1}
                            max={361}
                            show={transformSlider}
                            setShow={setTransformSlider}
                        />

                        <Slider
                            value={currentVersion.transform.sx + 1}
                            valueType="transform.sx"
                            changeValue={updateField}
                            theme={theme}
                            transparentUI={transparentUI}
                            Icon={() => (
                                <div>
                                    Sx
                                </div>
                            )}
                            renderOutside={renderOutside}
                            min={1}
                            max={361}
                            show={transformSlider}
                            setShow={setTransformSlider}
                        />

                        <Slider
                            value={currentVersion.transform.sy + 1}
                            valueType="transform.sy"
                            changeValue={updateField}
                            theme={theme}
                            transparentUI={transparentUI}
                            Icon={() => (
                                <div>
                                    Sy
                                </div>
                            )}
                            renderOutside={renderOutside}
                            min={1}
                            max={361}
                            show={transformSlider}
                            setShow={setTransformSlider}
                        />
                    </StyledTransformSliders>
                </Drawer>

                <VerticalDivider
                    theme={theme}
                />

                <Handlers
                    theme={theme}
                    viewable={currentVersion.viewable}
                    toggleViewable={() => setViewable()}
                    duplicate={() => duplicateTextItem(textItem.id)}
                    obliterate={() => deleteTextItem(textItem.id)}
                />
            </StyledTextEditor>

            <StyledOutside
                theme={theme}
                topBased={outsideTopBased}
                style={{
                    left: outsideLeft + 'px',
                    top: outsideTopBased
                        ? '0'
                        : (positions.y + 34) + 'px',
                }}
            >
                {outside}
            </StyledOutside>
        </>
    );
};


export default TextEditor;
/** [END] component */
