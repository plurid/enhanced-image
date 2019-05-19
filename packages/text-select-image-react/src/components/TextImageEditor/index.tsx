import React, { Component } from 'react';

import { StyledTextImageEditor } from './styled';

import Context from '../../context';

import TextImageEditorButtonDropdown from '../TextImageEditorButtonDropdown';
import TextImageEditorButtonIncrements from '../TextImageEditorButtonIncrements';
import TextImageEditorButtonInput from '../TextImageEditorButtonInput';
import TextImageEditorButtonToggle from '../TextImageEditorButtonToggle';

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



class TextImageEditor extends Component<any, any> {
    static contextType = Context;

    public render() {
        const {
            textEditable,
            toggleTextEditable,
            draggable,
            toggleDraggable,
            toggleTextViewable,
            textViewable,

            changeValue,
            fontSizeValue,

            toggleElement,
            textBold,
            textItalic,
            letterSpacingValue,
            wordSpacingValue,

            toggleEditor,
            fontFamilyValue,
            textLink,
            textLinkToValue,
        } = this.props;

        const {
            theme,
        } = this.context;

        return (
            <StyledTextImageEditor
                theme={theme}
            >
                 <TextImageEditorButtonToggle
                    theme={theme}
                    toggle={toggleTextEditable}
                    toggled={textEditable}
                    icon={SelectTextIcon}
                />

                 <TextImageEditorButtonToggle
                    theme={theme}
                    toggle={toggleDraggable}
                    toggled={draggable}
                    icon={GrabIcon}
                />

                <TextImageEditorButtonToggle
                    theme={theme}
                    toggle={toggleTextViewable}
                    toggled={textViewable}
                    icon={textViewable ? ViewableIcon : NotViewableIcon}
                />

                <span className="text-image-editor-vertical-divider">&nbsp;</span>

                <TextImageEditorButtonIncrements
                    theme={theme}
                    type="fontSize"
                    changeValue={changeValue}
                    value={fontSizeValue}
                    icon={FontSizeIcon}
                />

                <TextImageEditorButtonDropdown
                    type="fontFamily"
                    alterStyle="fontFamily"
                    selected={fontFamilyValue}
                    selectables={selectableFonts}
                    changeSelected={changeValue}
                    toggleEditor={toggleEditor}
                />

                <TextImageEditorButtonInput
                    theme={theme}
                    toggle={toggleElement.bind(this, 'textLink')}
                    toggled={textLink}
                    icon={LinkIcon}
                    value={textLinkToValue}
                    valueType="textLinkTo"
                    changeValue={changeValue}
                />

                <TextImageEditorButtonToggle
                    theme={theme}
                    toggle={toggleElement.bind(this, 'textBold')}
                    toggled={textBold}
                    icon={BoldIcon}
                />

                <TextImageEditorButtonToggle
                    theme={theme}
                    toggle={toggleElement.bind(this, 'textItalic')}
                    toggled={textItalic}
                    icon={ItalicIcon}
                />

                <TextImageEditorButtonIncrements
                    theme={theme}
                    type="letterSpacing"
                    changeValue={changeValue}
                    value={letterSpacingValue}
                    icon={LetterSpacingIcon}
                    step={0.1}
                />

                <TextImageEditorButtonIncrements
                    theme={theme}
                    type="wordSpacing"
                    changeValue={changeValue}
                    value={wordSpacingValue}
                    icon={WordSpacingIcon}
                    step={0.1}
                />

                {/* <span className="text-image-editor-button-colors">
                    <span
                        className={`
                            text-image-editor-button-color text-image-editor-button-color-black
                            ${this.colorValue === 'black' ? 'text-image-editor-button-color-active' : ''}
                        `}
                        onClick={this.changeValue.bind(this, 'color', 'black')}
                    />
                    <span
                        className={`
                            text-image-editor-button-color text-image-editor-button-color-red
                            ${this.colorValue === 'red' ? 'text-image-editor-button-color-active' : ''}
                        `}
                        onClick={this.changeValue.bind(this, 'color', 'red')}
                    />
                    <span
                        className={`
                            text-image-editor-button-color text-image-editor-button-color-white
                            ${this.colorValue === 'white' ? 'text-image-editor-button-color-active' : ''}
                        `}
                        onClick={this.changeValue.bind(this, 'color', 'white')}
                    />
                </span>

                <span className="text-image-editor-vertical-divider">&nbsp;</span>
                */}

                <span
                    className="text-image-editor-button"
                    onClick={this.duplicate}
                >
                    <span
                        className="text-image-editor-button-icon"
                    >
                        {DuplicateIcon}
                    </span>
                </span>

                <span
                    className="text-image-editor-button"
                    onClick={this.remove}
                >
                    <span
                        className="text-image-editor-button-icon"
                    >
                        {DeleteIcon}
                    </span>
                </span>
            </StyledTextImageEditor>
        );
    }

    duplicate = () => {}
    remove = () => {}
}


export default TextImageEditor;
