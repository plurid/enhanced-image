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



class TextImageEditor extends Component<any, any> {
    static contextType = Context;

    state = {
        id: this.props.text.id,
        xPercentage: this.props.text.xPercentage,
        yPercentage: this.props.text.yPercentage,
        perspective: this.props.text.perspective,
        rotation: this.props.text.rotation,
        skew: this.props.text.skew,
        color: this.props.text.color,
        fontFamily: this.props.text.fontFamily,
        fontSize: this.props.text.fontSize,
        bold: this.props.text.bold,
        italic: this.props.text.italic,
        letterSpacing: this.props.text.letterSpacing,
        lineHeight: this.props.text.lineHeight,
        wordSpacing: this.props.text.wordSpacing,
        content: this.props.text.content,
        link: this.props.text.link,
        linkTo: this.props.text.linkTo,
        viewable: this.props.text.viewable,

        text: this.props.text,
    };

    public render() {
        const {
            toggleTextEditable,
            textEditable,
            toggleTextDraggable,
            textDraggable,
            toggleTextViewable,
            textViewable,
            toggleEditor,
        } = this.props;

        const {
            theme,
        } = this.context;

        const {
            color,
            fontFamily,
            fontSize,
            bold,
            italic,
            letterSpacing,
            // lineHeight,
            wordSpacing,
            // content,
            link,
            linkTo,
            // viewable,
        } = this.state;

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
                    changeValue={this.changeValue}
                    value={fontSize}
                    icon={FontSizeIcon}
                />

                <TextImageEditorButtonDropdown
                    type="fontFamily"
                    alterStyle="fontFamily"
                    selected={fontFamily}
                    selectables={selectableFonts}
                    changeSelected={this.changeValue}
                    toggleEditor={toggleEditor}
                />

                <TextImageEditorButtonInput
                    theme={theme}
                    toggle={this.toggleElement.bind(this, 'link')}
                    toggled={link}
                    icon={LinkIcon}
                    value={linkTo}
                    valueType="textLinkTo"
                    changeValue={this.changeValue}
                />

                <TextImageEditorButtonToggle
                    theme={theme}
                    toggle={this.toggleElement.bind(this, 'bold')}
                    toggled={bold}
                    icon={BoldIcon}
                />

                <TextImageEditorButtonToggle
                    theme={theme}
                    toggle={this.toggleElement.bind(this, 'italic')}
                    toggled={italic}
                    icon={ItalicIcon}
                />

                <TextImageEditorButtonIncrements
                    theme={theme}
                    type="letterSpacing"
                    changeValue={this.changeValue}
                    value={letterSpacing}
                    icon={LetterSpacingIcon}
                    step={0.1}
                />

                <TextImageEditorButtonIncrements
                    theme={theme}
                    type="wordSpacing"
                    changeValue={this.changeValue}
                    value={wordSpacing}
                    icon={WordSpacingIcon}
                    step={0.1}
                />

                <TextImageEditorButtonsColors
                    changeValue={this.changeValue}
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


    private changeValue = () => {

        this.update();
    }

    private toggleElement = (element: string) => {
        this.setState((prevState: any) => ({
            [element]: !prevState[element],
        }));

        this.update();
    }

    private update = () => {
        const {
            updateTextImage,
        } = this.context;

        const {
            id,
        } = this.state;

        const text = {
            id,
        }

        updateTextImage(text);
    }

    private updateField = (element: any, value: any) => {
        const {
            updateTextImageField,
        } = this.context;

        const {
            id,
        } = this.state;

        updateTextImageField(id, element, value);
    }

    private duplicate = () => {
        const {
            duplicateTextImage,
        } = this.context;

        const {
            text
        } = this.state;

        duplicateTextImage(text.id);
    }

    private delete = () => {
        const {
            deleteTextImage,
        } = this.context;

        const {
            text,
        } = this.state;

        deleteTextImage(text.id);
    }
}


export default TextImageEditor;
