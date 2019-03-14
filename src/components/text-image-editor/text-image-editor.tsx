import { Component, Prop } from '@stencil/core';

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

    render() {
        return (
            <span class="text-image-editor">
                <span class="text-image-editor-button">
                    T
                </span>
                <span class="text-image-editor-button">
                    <span
                        class={`
                            text-image-editor-button-icon
                            ${this.draggable ? 'text-image-editor-button-icon-active': ''}
                        `}
                        onClick={this.toggleDraggable}
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
                <span class="text-image-editor-button">
                    Color
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
