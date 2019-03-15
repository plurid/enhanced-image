import { Component, Prop, State } from '@stencil/core';

import selectTextIcon from '../../assets/select-text-icon.svg';
import grabIcon from '../../assets/grab-icon.svg';
import fontSizeIcon from '../../assets/font-size-icon.svg';
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

    @Prop() textEditable: boolean;
    @Prop() toggleTextEditable: () => void;

    @State() fontSizeValue: number = 12;
    @State() letterSpacingValue: number = 1;
    @State() wordSpacingValue: number = 0;

    changeValue = (type: string, value: number) => {
        const typeValue = `${type}Value`;
        this[typeValue] = value;
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

                <text-image-editor-button-increments
                    type='fontSize'
                    changeValue={this.changeValue}
                    value={this.fontSizeValue}
                    icon={fontSizeIcon}
                />

                <span class="text-image-editor-button">
                    Arial
                </span>

                <span class="text-image-editor-button">
                    Normal
                </span>

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

                <span class="text-image-editor-button text-image-editor-button-colors">
                    <span class="text-image-editor-button-color text-image-editor-button-color-black" />
                    <span class="text-image-editor-button-color text-image-editor-button-color-red" />
                    <span class="text-image-editor-button-color text-image-editor-button-color-white" />
                </span>

                <span class="text-image-editor-button">
                    <span
                        class="text-image-editor-button-icon"
                        innerHTML={duplicateIcon}
                    />
                </span>

                <span class="text-image-editor-button">
                    <span
                        class="text-image-editor-button-icon"
                        innerHTML={deleteIcon}
                    />
                </span>
            </span>
        );
    }
}
