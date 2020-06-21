import React, {
    useContext,
    useRef,
    useState,
    useEffect,
} from 'react';

import {
    PluridIconPalette,
    PluridIconSpace,
} from '@plurid/plurid-icons-react';

import {
    StyledTextEditor,
    StyledOutside,
    StyledVerticalDivider,
    StyledTransformSliders,
} from './styled';

import Context from '../../../../../../services/utilities/context';

import ButtonDropdown from './components/ButtonDropdown';
import ButtonIncrements from './components/ButtonIncrements';
import ButtonInput from './components/ButtonInput';
import ButtonToggle from './components/ButtonToggle';
import ButtonsColors from './components/ButtonsColors';
import ButtonClick from './components/ButtonClick';
import SimpleInput from './components/SimpleInput';
import Slider from './components/Slider';
import Drawer from './components/Drawer';

import { selectableFonts } from '../../../../../../data/constants/fonts';

import SelectTextIcon from '../../../../../../assets/icons/text-editor/select-text';
import GrabIcon from '../../../../../../assets/icons/text-editor/grab';
import ViewableIcon from '../../../../../../assets/icons/text-editor/viewable';
import NotViewableIcon from '../../../../../../assets/icons/text-editor/not-viewable';
import FontSizeIcon from '../../../../../../assets/icons/text-editor/font-size';
import LinkIcon from '../../../../../../assets/icons/text-editor/link';
import BoldIcon from '../../../../../../assets/icons/text-editor/bold';
import ItalicIcon from '../../../../../../assets/icons/text-editor/italic';
import LetterSpacingIcon from '../../../../../../assets/icons/text-editor/letter-spacing';
import WordSpacingIcon from '../../../../../../assets/icons/text-editor/word-spacing';
import DuplicateIcon from '../../../../../../assets/icons/text-editor/duplicate';
import DeleteIcon from '../../../../../../assets/icons/text-editor/delete';

import {
    ImageText,
    ImageTextVersionTextline,
} from '../../../../../../data/interfaces';

import {
    valueFromPercentage,
    percentageFromValue,
} from '../../../../../../services/utilities/percentage';

import {
    resolveColor
} from '../../../../../../services/utilities/color';



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
    expandFormat: boolean;
    setExpandFormat: React.Dispatch<React.SetStateAction<boolean>>;
    setWidth: React.Dispatch<React.SetStateAction<number>>;
    fullWidth: boolean;
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
        expandFormat,
        setExpandFormat,
        setWidth,
        fullWidth,
    } = properties;


    /** references */
    const editor = useRef<HTMLDivElement>(null);


    /** state */
    const [outside, setOutside] = useState(<></>);
    const [outsideTopBased, setOutsideTopBased] = useState(false);
    const [outsideLeft, setOutsideLeft] = useState(100);
    const [transformSlider, setTransformSlider] = useState('');


    /** handlers */
    const updateField = (
        type: string,
        value: number | string | boolean,
    ) => {
        switch (type) {
            case 'fontSize':
                if (typeof value === 'number') {
                    const fontSizePercentage = percentageFromValue(value, imageBoxDimensions.height);
                    updateTextItemField(textItem.id, 'fontSizePercent', fontSizePercentage);
                }
                break;
            case 'fontFamily':
                updateTextItemField(textItem.id, 'fontFamily', value);
                break;
            case 'letterSpacing':
                if (typeof value === 'number') {
                    const letterSpacingPercentage = percentageFromValue(value, imageBoxDimensions.width);
                    updateTextItemField(textItem.id, 'letterSpacingPercent', letterSpacingPercentage);
                }
                break;
            case 'wordSpacing':
                if (typeof value === 'number') {
                    const wordSpacingPercentage = percentageFromValue(value, imageBoxDimensions.width);
                    updateTextItemField(textItem.id, 'wordSpacingPercent', wordSpacingPercentage);
                }
                break;
            case 'linkTo':
                updateTextItemField(textItem.id, 'linkTo', value);
                break;
            case 'color':
                updateTextItemField(textItem.id, 'color', value);
                break;
            case 'perspective':
                if (typeof value === 'number') {
                    updateTextItemField(textItem.id, 'perspective', value - 1);
                }
                break;
            case 'xRotation':
                if (typeof value === 'number') {
                    updateTextItemField(textItem.id, 'xRotation', value - 1);
                }
                break;
            case 'yRotation':
                if (typeof value === 'number') {
                    updateTextItemField(textItem.id, 'yRotation', value - 1);
                }
                break;
            case 'zRotation':
                if (typeof value === 'number') {
                    updateTextItemField(textItem.id, 'zRotation', value - 1);
                }
                break;
            case 'xSkew':
                if (typeof value === 'number') {
                    updateTextItemField(textItem.id, 'xSkew', value - 1);
                }
                break;
            case 'ySkew':
                if (typeof value === 'number') {
                    updateTextItemField(textItem.id, 'ySkew', value - 1);
                }
                break;
        }
    }

    const toggleTextFormat = (
        type: string,
        checkValue: string | boolean,
    ) => {
        if (typeof checkValue === 'boolean') {
            if ((currentVersion as any)[type as any]) {
                updateTextItemField(textItem.id, type, false);
            } else {
                updateTextItemField(textItem.id, type, true);
            }
        } else {
            if ((currentVersion as any)[type as any] === checkValue) {
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

        const outsideLeft = positions.x + left;

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
        expandFormat,
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

    /** Expand format. */
    useEffect(() => {
        if (!expandFormat) {
            setTransformSlider('');
            renderOutside(<></>);
        }
    }, [
        expandFormat,
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
                        if (draggable) { setDraggable(false) }
                        setEditable(editable => !editable)
                    }}
                    toggled={editable}
                    icon={SelectTextIcon}
                />

                <ButtonToggle
                    theme={theme}
                    toggle={() => {
                        if (editable) { setEditable(false) }
                        setDraggable(draggable => !draggable)
                    }}
                    toggled={draggable}
                    icon={GrabIcon}
                />

                <StyledVerticalDivider
                    theme={theme}
                >
                    &nbsp;
                </StyledVerticalDivider>

                <Drawer
                    theme={theme}
                    title="Format"
                    expand={expandFormat}
                    toggleExpand={() => setExpandFormat(expand => !expand)}
                >
                    <ButtonIncrements
                        theme={theme}
                        transparentUI={transparentUI}
                        type="fontSize"
                        changeValue={updateField}
                        value={Math.round(valueFromPercentage(currentVersion.fontSizePercent, imageBoxDimensions.height))}
                        icon={FontSizeIcon}
                    />

                    <ButtonDropdown
                        theme={theme}
                        transparentUI={transparentUI}
                        type="fontFamily"
                        alterStyle="fontFamily"
                        selected={currentVersion.fontFamily}
                        selectables={selectableFonts}
                        changeSelected={updateField}
                        toggleEditor={() => {}}
                        textDraggable={false}
                        toggleTextDraggable={() => {}}
                        toggleTextSelected={() => {}}
                        renderOutside={renderOutside}
                    />

                    <ButtonInput
                        theme={theme}
                        transparentUI={transparentUI}
                        toggle={() => toggleTextFormat('link', true)}
                        toggled={currentVersion.link}
                        icon={LinkIcon}
                        value={currentVersion.linkTo}
                        valueType="linkTo"
                        changeValue={updateField}
                        renderOutside={renderOutside}
                    />

                    <ButtonToggle
                        theme={theme}
                        toggle={() => toggleTextFormat('fontWeight', 'bold')}
                        toggled={currentVersion.fontWeight === 'bold'}
                        icon={BoldIcon}
                    />

                    <ButtonToggle
                        theme={theme}
                        toggle={() => toggleTextFormat('fontStyle', 'italic')}
                        toggled={currentVersion.fontStyle === 'italic'}
                        icon={ItalicIcon}
                    />

                    <ButtonIncrements
                        theme={theme}
                        transparentUI={transparentUI}
                        type="letterSpacing"
                        changeValue={updateField}
                        value={valueFromPercentage(currentVersion.letterSpacingPercent, imageBoxDimensions.width)}
                        icon={LetterSpacingIcon}
                        step={0.1}
                    />

                    <ButtonIncrements
                        theme={theme}
                        transparentUI={transparentUI}
                        type="wordSpacing"
                        changeValue={updateField}
                        value={valueFromPercentage(currentVersion.wordSpacingPercent, imageBoxDimensions.width)}
                        icon={WordSpacingIcon}
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

                    <StyledTransformSliders>
                        <Slider
                            value={currentVersion.perspective + 1}
                            valueType="perspective"
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
                            value={currentVersion.xRotation + 1}
                            valueType="xRotation"
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
                            value={currentVersion.yRotation + 1}
                            valueType="yRotation"
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
                            value={currentVersion.zRotation + 1}
                            valueType="zRotation"
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
                            value={currentVersion.xSkew + 1}
                            valueType="xSkew"
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
                            value={currentVersion.ySkew + 1}
                            valueType="ySkew"
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

                <StyledVerticalDivider
                    theme={theme}
                >
                    &nbsp;
                </StyledVerticalDivider>

                <ButtonToggle
                    theme={theme}
                    toggle={() => setViewable()}
                    toggled={currentVersion.viewable}
                    icon={currentVersion.viewable ? ViewableIcon : NotViewableIcon}
                />

                <ButtonClick
                    theme={theme}
                    atClick={() => duplicateTextItem(textItem.id)}
                    icon={DuplicateIcon}
                />

                <ButtonClick
                    theme={theme}
                    atClick={() => deleteTextItem(textItem.id)}
                    icon={DeleteIcon}
                />
            </StyledTextEditor>

            <StyledOutside
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
