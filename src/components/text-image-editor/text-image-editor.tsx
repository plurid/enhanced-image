import { Component, Prop } from '@stencil/core';

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

    render() {
        return (
            <span class="text-image-editor">
                <span
                    class={`
                        text-image-editor-button
                        ${this.textEditable ? 'text-image-editor-button-icon-active': ''}
                    `}
                    onClick={this.toggleTextEditable}
                >
                    <span
                        class="text-image-editor-button-icon"
                        innerHTML={selectTextIcon}
                    />
                </span>

                <span
                    class={`
                        text-image-editor-button
                        ${this.draggable ? 'text-image-editor-button-icon-active': ''}
                    `}
                    onClick={this.toggleDraggable}
                >
                    <span
                        class="text-image-editor-button-icon"
                        innerHTML={grabIcon}
                    />
                </span>

                <span class="text-image-editor-button">
                    <span
                        class="text-image-editor-button-icon"
                        innerHTML={fontSizeIcon}
                    />
                    <input type="text" value="12"/>
                    <span>px</span>
                </span>
                <span class="text-image-editor-button">
                    Arial
                </span>
                <span class="text-image-editor-button">
                    Normal
                </span>
                <span class="text-image-editor-button">
                    <span
                        class="text-image-editor-button-icon"
                        innerHTML={letterSpacingIcon}
                    />
                    <input type="text" value="1"/>
                    <span>px</span>
                </span>
                {/* <span class="text-image-editor-button">
                    Line Height
                </span> */}
                <span class="text-image-editor-button">
                    <span
                        class="text-image-editor-button-icon"
                        innerHTML={wordSpacingIcon}
                    />
                    <input type="text" value="0"/>
                    <span>px</span>
                </span>
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
