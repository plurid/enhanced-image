import React, { Component } from 'react';

import {
    StyledTextImageEditor,
    StyledTextImageEditorVerticalDivider,
} from './styled';

import Context from '../../context';

import TextImageEditorButtonDropdown from '../TextImageEditorButtonDropdown';
import TextImageEditorButtonIncrements from '../TextImageEditorButtonIncrements';
import TextImageEditorButtonInput from '../TextImageEditorButtonInput';
import TextImageEditorButtonToggle from '../TextImageEditorButtonToggle';
import TextImageEditorButtonsColors from '../TextImageEditorButtonsColors';
import TextImageEditorButtonClick from '../TextImageEditorButtonClick';

import { selectableFonts } from '../../data/fonts';

import SelectTextIcon from '../../assets/select-text-icon';
import GrabIcon from '../../assets/grab-icon';
import ViewableIcon from '../../assets/viewable-icon';
import NotViewableIcon from '../../assets/not-viewable-icon';
import FontSizeIcon from '../../assets/font-size-icon';
import LinkIcon from '../../assets/link-icon';
import BoldIcon from '../../assets/bold-icon';
import ItalicIcon from '../../assets/italic-icon';
import LetterSpacingIcon from '../../assets/letter-spacing-icon';
import WordSpacingIcon from '../../assets/word-spacing-icon';
import DuplicateIcon from '../../assets/duplicate-icon';
import DeleteIcon from '../../assets/delete-icon';

import {
    percentageFromValue,
    valueFromPercentage,
} from '../../utils/percentage';



class TextImageEditor extends Component<any, any> {
    static contextType = Context;
    public editor: any = React.createRef();

    public componentDidMount() {
        const {
            setEditorWidth,
        } = this.context

        const editorWidth = this.editor.current.offsetWidth;
        // console.log('editorWidth', editorWidth);
        setEditorWidth(editorWidth);
    }

    public render() {
        const {
            theme,
            imageHeight,
            imageWidth,
        } = this.context;

        const {
            toggleTextEditable,
            textEditable,
            toggleTextDraggable,
            textDraggable,
            toggleTextViewable,
            textViewable,
            toggleEditor,
            toggleSelected,
            xCoord,
            yCoord,
            version,
        } = this.props;

        const {
            color,
            fontSizePercentage,
            fontFamily,
            bold,
            italic,
            link,
            linkTo,
            wordSpacingPercentage,
            letterSpacingPercentage,
        } = version;

        const fontSize = Math.round(valueFromPercentage(fontSizePercentage, imageHeight));
        const letterSpacing = valueFromPercentage(letterSpacingPercentage, imageWidth);
        const wordSpacing = valueFromPercentage(wordSpacingPercentage, imageWidth);

        return (
            <StyledTextImageEditor
                theme={theme}
                style={{
                    left: xCoord + 'px',
                    top: yCoord + 'px',
                }}
                ref={this.editor}
            >
                <TextImageEditorButtonToggle
                    theme={theme}
                    toggle={toggleTextEditable}
                    toggled={textEditable}
                    icon={SelectTextIcon}
                />

                <TextImageEditorButtonToggle
                    theme={theme}
                    toggle={toggleTextDraggable}
                    toggled={textDraggable}
                    icon={GrabIcon}
                />

                <TextImageEditorButtonToggle
                    theme={theme}
                    toggle={toggleTextViewable}
                    toggled={textViewable}
                    icon={textViewable ? ViewableIcon : NotViewableIcon}
                />

                <StyledTextImageEditorVerticalDivider
                    theme={theme}
                >
                    &nbsp;
                </StyledTextImageEditorVerticalDivider>

                <TextImageEditorButtonIncrements
                    theme={theme}
                    type="fontSize"
                    changeValue={this.updateField}
                    value={fontSize}
                    icon={FontSizeIcon}
                />

                <TextImageEditorButtonDropdown
                    type="fontFamily"
                    alterStyle="fontFamily"
                    selected={fontFamily}
                    selectables={selectableFonts}
                    changeSelected={this.updateField}
                    toggleEditor={toggleEditor}
                    textDraggable={textDraggable}
                    toggleTextDraggable={toggleTextDraggable}
                    toggleTextSelected={toggleSelected}
                />

                <TextImageEditorButtonInput
                    theme={theme}
                    toggle={this.updateField.bind(this, 'link')}
                    toggled={link}
                    icon={LinkIcon}
                    value={linkTo}
                    valueType="linkTo"
                    changeValue={this.updateField}
                />

                <TextImageEditorButtonToggle
                    theme={theme}
                    toggle={this.updateField.bind(this, 'bold')}
                    toggled={bold}
                    icon={BoldIcon}
                />

                <TextImageEditorButtonToggle
                    theme={theme}
                    toggle={this.updateField.bind(this, 'italic')}
                    toggled={italic}
                    icon={ItalicIcon}
                />

                <TextImageEditorButtonIncrements
                    theme={theme}
                    type="letterSpacing"
                    changeValue={this.updateField}
                    value={letterSpacing}
                    icon={LetterSpacingIcon}
                    step={0.1}
                />

                <TextImageEditorButtonIncrements
                    theme={theme}
                    type="wordSpacing"
                    changeValue={this.updateField}
                    value={wordSpacing}
                    icon={WordSpacingIcon}
                    step={0.1}
                />

                <TextImageEditorButtonsColors
                    changeValue={this.updateField}
                    color={color}
                />

                <StyledTextImageEditorVerticalDivider
                    theme={theme}
                >
                    &nbsp;
                </StyledTextImageEditorVerticalDivider>

                <TextImageEditorButtonClick
                    theme={theme}
                    atClick={this.duplicate}
                    icon={DuplicateIcon}
                />

                <TextImageEditorButtonClick
                    theme={theme}
                    atClick={this.delete}
                    icon={DeleteIcon}
                />
            </StyledTextImageEditor>
        );
    }

    private updateField = (element: any, value?: any) => {
        const {
            updateTextImageField,
            imageHeight,
            imageWidth,
        } = this.context;

        const {
            textId,
            version,
        } = this.props;

        let el = element;
        let val: string | number | boolean | undefined = value;

        switch(element) {
            case 'fontSize':
                el = 'fontSizePercentage';
                val = percentageFromValue(value, imageHeight);
                break;
            case 'letterSpacing':
                el = 'letterSpacingPercentage';
                val = percentageFromValue(value, imageWidth);
                break;
            case 'wordSpacing':
                el = 'wordSpacingPercentage';
                val = percentageFromValue(value, imageWidth);
                break;
            case 'link':
                el = 'link';
                val = !version.link;
                break;
            case 'bold':
                el = 'bold';
                val = !version.bold;
                break;
            case 'italic':
                el = 'italic';
                val = !version.italic;
                break;
            default:
                el = element;
                val = value;
        }

        // console.log(el, val);

        updateTextImageField(textId, el, val);
    }

    private duplicate = () => {
        const {
            duplicateTextImage,
            toggleTextEditable,
            textEditable,
            toggleTextDraggable,
            textDraggable,
        } = this.context;

        if (textEditable) {
            toggleTextEditable();
        }

        if (textDraggable) {
            toggleTextDraggable();
        }

        const {
            textId
        } = this.props;

        duplicateTextImage(textId);
    }

    private delete = () => {
        const {
            deleteTextImage,
            toggleTextEditable,
            textEditable,
            toggleTextDraggable,
            textDraggable,
        } = this.context;

        if (textEditable) {
            toggleTextEditable();
        }

        if (textDraggable) {
            toggleTextDraggable();
        }

        const {
            textId,
        } = this.props;

        deleteTextImage(textId);
    }
}


export default TextImageEditor;
