import { Component, Prop } from '@stencil/core';

import selectTextIcon from '../../assets/select-text-icon.svg';
import grabIcon from '../../assets/grab-icon.svg';
import viewableIcon from '../../assets/viewable-icon.svg';
import notViewableIcon from '../../assets/not-viewable-icon.svg';
import fontSizeIcon from '../../assets/font-size-icon.svg';
import linkIcon from '../../assets/link-icon.svg';
import boldIcon from '../../assets/bold-icon.svg';
import italicIcon from '../../assets/italic-icon.svg';
import letterSpacingIcon from '../../assets/letter-spacing-icon.svg';
import wordSpacingIcon from '../../assets/word-spacing-icon.svg';
import duplicateIcon from '../../assets/duplicate-icon.svg';
import deleteIcon from '../../assets/delete-icon.svg';



@Component({
    tag: 'text-image-editor',
    styleUrl: 'text-image-editor.css',
    shadow: true,
})
export class TextImageEditor {
    @Prop() private draggable: boolean;
    @Prop() private toggleDraggable: () => void;

    @Prop() private duplicateText: (id: string) => void;
    @Prop() private removeText: (id: string) => void;

    @Prop() private textEditable: boolean;
    @Prop() private toggleTextEditable: () => void;

    @Prop() private textViewable: boolean;
    @Prop() private toggleTextViewable: () => void;

    @Prop() private toggleEditor: () => void;

    @Prop() private textId: string;

    @Prop() private fontSizeValue: number;
    @Prop() private letterSpacingValue: number;
    @Prop() private wordSpacingValue: number;
    @Prop() private fontFamilyValue: string;
    @Prop() private colorValue: string;
    @Prop() private textLink: boolean;
    @Prop() private textLinkToValue: string;
    @Prop() private textBold: boolean;
    @Prop() private textItalic: boolean;

    @Prop() private selectableFonts: string[];

    @Prop() private changeValue: (type: string, value: number | string) => void;
    @Prop() private toggleElement: (element: string) => void;

    public render() {
        return (
            <span class="text-image-editor">
                <text-image-editor-button-toggle
                    toggle={this.toggleTextEditable}
                    toggled={this.textEditable}
                    icon={selectTextIcon}
                />

                <text-image-editor-button-toggle
                    toggle={this.toggleDraggable}
                    toggled={this.draggable}
                    icon={grabIcon}
                />

                <text-image-editor-button-toggle
                    toggle={this.toggleTextViewable}
                    toggled={this.textViewable}
                    icon={this.textViewable ? viewableIcon : notViewableIcon}
                />

                <span class="text-image-editor-vertical-divider">&nbsp;</span>

                <text-image-editor-button-increments
                    type="fontSize"
                    changeValue={this.changeValue}
                    value={this.fontSizeValue}
                    icon={fontSizeIcon}
                />

                <text-image-editor-button-dropdown
                    type="fontFamily"
                    alterStyle="fontFamily"
                    selected={this.fontFamilyValue}
                    selectables={this.selectableFonts}
                    changeSelected={this.changeValue}
                    toggleEditor={this.toggleEditor}
                />

                <text-image-editor-button-input
                    toggle={this.toggleElement.bind(this, 'textLink')}
                    toggled={this.textLink}
                    icon={linkIcon}
                    value={this.textLinkToValue}
                    valueType="textLinkTo"
                    changeValue={this.changeValue}
                />

                <text-image-editor-button-toggle
                    toggle={this.toggleElement.bind(this, 'textBold')}
                    toggled={this.textBold}
                    icon={boldIcon}
                />

                <text-image-editor-button-toggle
                    toggle={this.toggleElement.bind(this, 'textItalic')}
                    toggled={this.textItalic}
                    icon={italicIcon}
                />

                <text-image-editor-button-increments
                    type="letterSpacing"
                    changeValue={this.changeValue}
                    value={this.letterSpacingValue}
                    icon={letterSpacingIcon}
                    step={0.1}
                />

                {/* <span class="text-image-editor-button">
                    Line Height
                </span> */}

                <text-image-editor-button-increments
                    type="wordSpacing"
                    changeValue={this.changeValue}
                    value={this.wordSpacingValue}
                    icon={wordSpacingIcon}
                    step={0.1}
                />

                <span class="text-image-editor-button-colors">
                    <span
                        class={`
                            text-image-editor-button-color text-image-editor-button-color-black
                            ${this.colorValue === 'black' ? 'text-image-editor-button-color-active' : ''}
                        `}
                        onClick={this.changeValue.bind(this, 'color', 'black')}
                    />
                    <span
                        class={`
                            text-image-editor-button-color text-image-editor-button-color-red
                            ${this.colorValue === 'red' ? 'text-image-editor-button-color-active' : ''}
                        `}
                        onClick={this.changeValue.bind(this, 'color', 'red')}
                    />
                    <span
                        class={`
                            text-image-editor-button-color text-image-editor-button-color-white
                            ${this.colorValue === 'white' ? 'text-image-editor-button-color-active' : ''}
                        `}
                        onClick={this.changeValue.bind(this, 'color', 'white')}
                    />
                </span>

                <span class="text-image-editor-vertical-divider">&nbsp;</span>

                <span
                    class="text-image-editor-button"
                    onClick={this.duplicate}
                >
                    <span
                        class="text-image-editor-button-icon"
                        innerHTML={duplicateIcon}
                    />
                </span>

                <span
                    class="text-image-editor-button"
                    onClick={this.remove}
                >
                    <span
                        class="text-image-editor-button-icon"
                        innerHTML={deleteIcon}
                    />
                </span>
            </span>
        );
    }

    private duplicate = () => {
        // console.log('Duplicate', this.textId);
        this.duplicateText(this.textId);
    }

    private remove = () => {
        // console.log('Remove text with id:', this.textId);
        this.removeText(this.textId);
    }
}
