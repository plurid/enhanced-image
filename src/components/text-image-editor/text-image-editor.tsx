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

                <span class="text-image-editor-button">
                    <span
                        class="text-image-editor-button-icon"
                        innerHTML={fontSizeIcon}
                    />
                    <span class="text-image-editor-button-increments">
                        <span class="text-image-editor-button-increment-button text-image-editor-button-increment-up">&#x25b2;</span>
                        <span class="text-image-editor-button-increment-button text-image-editor-button-increment-down">&#x25bc;</span>
                    </span>
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
                    <span class="text-image-editor-button-increments">
                        <span class="text-image-editor-button-increment-button text-image-editor-button-increment-up">&#x25b2;</span>
                        <span class="text-image-editor-button-increment-button text-image-editor-button-increment-down">&#x25bc;</span>
                    </span>
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
                    <span class="text-image-editor-button-increments">
                        <span class="text-image-editor-button-increment-button text-image-editor-button-increment-up">&#x25b2;</span>
                        <span class="text-image-editor-button-increment-button text-image-editor-button-increment-down">&#x25bc;</span>
                    </span>
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
