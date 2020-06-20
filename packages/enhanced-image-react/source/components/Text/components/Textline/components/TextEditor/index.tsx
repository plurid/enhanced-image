import React, {
    useContext,
    useRef,
    useEffect,
} from 'react';

import {
    StyledTextEditor,
    StyledVerticalDivider,
} from './styled';

import Context from '../../../../../../services/utilities/context';

import ButtonDropdown from './components/ButtonDropdown';
import ButtonIncrements from './components/ButtonIncrements';
import ButtonInput from './components/ButtonInput';
import ButtonToggle from './components/ButtonToggle';
import ButtonsColors from './components/ButtonsColors';
import ButtonClick from './components/ButtonClick';
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



interface TextEditorProperties {
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
}

const TextEditor: React.FC<TextEditorProperties> = (properties) => {
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
    } = properties;

    const editor = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editor.current) {
            setWidth(editor.current.offsetWidth);
        }
    }, [
        editor,
        expandFormat,
    ]);

    const updateField = (type: string, value: number | string | boolean) => {
        switch (type) {
            case 'fontSize':
                if (typeof value === 'number') {
                    const fontSizePercentage = percentageFromValue(value, imageBoxDimensions.height);
                    updateTextItemField(textItem.id, 'fontSizePercentage', fontSizePercentage);
                }
                break;
            case 'fontFamily':
                updateTextItemField(textItem.id, 'fontFamily', value);
                break;
            case 'letterSpacing':
                if (typeof value === 'number') {
                    const letterSpacingPercentage = percentageFromValue(value, imageBoxDimensions.width);
                    updateTextItemField(textItem.id, 'letterSpacingPercentage', letterSpacingPercentage);
                }
                break;
            case 'wordSpacing':
                if (typeof value === 'number') {
                    const wordSpacingPercentage = percentageFromValue(value, imageBoxDimensions.width);
                    updateTextItemField(textItem.id, 'wordSpacingPercentage', wordSpacingPercentage);
                }
                break;
            case 'linkTo':
                updateTextItemField(textItem.id, 'linkTo', value);
                break;
            case 'color':
                updateTextItemField(textItem.id, 'color', value);
                break;
        }
    }

    const toggleTextFormat = (type: string, checkValue: string | boolean) => {
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

    return (
        <StyledTextEditor
            theme={theme}
            ref={editor}
            transparentUI={transparentUI}
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
                    // toggleEditor={toggleEditor}
                    // textDraggable={textDraggable}
                    // toggleTextDraggable={toggleTextDraggable}
                    // toggleTextSelected={toggleSelected}
                />

                <ButtonInput
                    theme={theme}
                    toggle={() => toggleTextFormat('link', true)}
                    toggled={currentVersion.link}
                    icon={LinkIcon}
                    value={currentVersion.linkTo}
                    valueType="linkTo"
                    changeValue={updateField}
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
    );
};


export default TextEditor;
