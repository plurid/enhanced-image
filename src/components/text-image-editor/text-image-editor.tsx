import { Component, Prop } from '@stencil/core';

import selectTextIcon from '../../assets/select-text-icon.svg';
import grabIcon from '../../assets/grab-icon.svg';
import fontSizeIcon from '../../assets/font-size-icon.svg';
import boldIcon from '../../assets/bold-icon.svg';
import italicIcon from '../../assets/italic-icon.svg';
import letterSpacingIcon from '../../assets/letter-spacing-icon.svg';
import wordSpacingIcon from '../../assets/word-spacing-icon.svg';
import duplicateIcon from '../../assets/duplicate-icon.svg';
import deleteIcon from '../../assets/delete-icon.svg';



@Component({
    tag: 'text-image-editor',
    styleUrl: 'text-image-editor.css',
    shadow: true
})
export class TextImageEditor {
    @Prop() draggable: boolean;
    @Prop() toggleDraggable: () => void;

    @Prop() duplicateText: (id: string) => void;
    @Prop() deleteText: (id: string) => void;

    @Prop() textEditable: boolean;
    @Prop() toggleTextEditable: () => void;

    @Prop() toggleEditor: () => void;

    @Prop() textId: string;

    @Prop() fontSizeValue: number;
    @Prop() letterSpacingValue: number;
    @Prop() wordSpacingValue: number;
    @Prop() fontFamilyValue: string;
    @Prop() colorValue: string;
    @Prop() textBold: boolean;
    @Prop() textItalic: boolean;

    @Prop() selectableFonts: string[];

    @Prop() changeValue: (type: string, value: number | string) => void;
    @Prop() toggleElement: (element: string) => void;

    duplicate = () => {
        console.log('Duplicate', this.textId);
        this.duplicateText(this.textId);
    }

    delete = () => {
        console.log('Delete', this.textId);
        this.deleteText(this.textId);
    }

    render() {
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

                <span class="text-image-editor-vertical-divider">&nbsp;</span>

                <text-image-editor-button-increments
                    type='fontSize'
                    changeValue={this.changeValue}
                    value={this.fontSizeValue}
                    icon={fontSizeIcon}
                />

                <text-image-editor-button-dropdown
                    type='fontFamily'
                    alterStyle='fontFamily'
                    selected={this.fontFamilyValue}
                    selectables={this.selectableFonts}
                    changeSelected={this.changeValue}
                    toggleEditor={this.toggleEditor}
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
                    type='letterSpacing'
                    changeValue={this.changeValue}
                    value={this.letterSpacingValue}
                    icon={letterSpacingIcon}
                    step={0.1}
                />

                {/* <span class="text-image-editor-button">
                    Line Height
                </span> */}

                <text-image-editor-button-increments
                    type='wordSpacing'
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
                    onClick={this.delete}
                >
                    <span
                        class="text-image-editor-button-icon"
                        innerHTML={deleteIcon}
                    />
                </span>
            </span>
        );
    }
}
