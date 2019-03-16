import { Component, Element, Prop, State } from '@stencil/core';

import { ITextImage } from '../../interfaces/image-text';


const EDITOR_WIDTH = 724;


@Component({
    tag: 'text-image',
    styleUrl: 'text-image.css',
    shadow: true
})
export class TextImage {
    @Element() element: HTMLElement;
    textImageSpan!: HTMLSpanElement;
    textImageSpanContent!: HTMLSpanElement;

    @Prop() text: ITextImage;
    @Prop() textSelectImage: any;
    @Prop() editable: boolean;
    @Prop() imageWidth: number;
    @Prop() updateText: (id: string, record: object) => void;
    @Prop() duplicateText: (id: string) => void;
    @Prop() deleteText: (id: string) => void;

    @State() xCoord: number = 0;
    @State() yCoord: number = 0;

    @State() textEditable: boolean = false;
    @State() draggable: boolean = false;
    @State() dragging: boolean = false;
    @State() showEditor: boolean = false;
    @State() pos1: number = 0;
    @State() pos2: number = 0;
    @State() pos3: number = 0;
    @State() pos4: number = 0;

    @State() fontSizeValue: number = 12;
    @State() letterSpacingValue: number = 0;
    @State() wordSpacingValue: number = 0;
    @State() fontFamilyValue: string = 'Arial';
    @State() colorValue: string = '';
    @State() colorValueStyle: string = '';
    @State() textBold: boolean = false;
    @State() textItalic: boolean = false;
    @State() textContent: string = '';
    @State() textChanged: boolean = false;

    @State() editorXCoord: number = 0;

    private selectableFonts = [
        'serif',
        'sans-serif',
        'monospace',
        'cursive',
        'Arial', 'Arial Black',
        'Bookman', 'Book Antiqua',
        'Charcoal', 'Comic Sans MS', 'Courier', 'Courier New',
        'Garamond', 'Gadget', 'Geneva', 'Georgia',
        'Helvetica',
        'Impact',
        'Lucida Console', 'Lucida Grande', 'Lucida Sans Unicode',
        'Monaco',
        'Tahoma', 'Times', 'Times New Roman', 'Trebuchet MS',
        'Palatino', 'Palatino Linotype',
        'Verdana',
    ];

    componentWillLoad() {
        this.xCoord = this.text.xCoord;
        this.yCoord = this.text.yCoord;

        this.fontSizeValue = this.text.fontSize || this.fontSizeValue;
        this.fontFamilyValue = this.text.fontFamily || this.fontFamilyValue;
        this.letterSpacingValue = this.text.letterSpacing || this.letterSpacingValue;
        this.wordSpacingValue = this.text.wordSpacing || this.wordSpacingValue;
        this.textBold =  this.text.bold || this.textBold;
        this.textItalic =  this.text.italic || this.textItalic;
        // this.colorValue = this.text.color || this.colorValue;
        if(this.editable) {
            this.colorValue = this.text.color || 'black';
            this.colorValueStyle = this.colorValue;
        }
    }

    componentDidLoad() {
        this.textContent = this.textImageSpanContent.innerText;
    }

    componentWillUpdate() {
        if (this.draggable) {
            this.textImageSpanContent.onmousedown = this.dragMouseDown;
            this.textImageSpanContent.onmouseup = this.mouseUp;
        } else {
            this.textImageSpanContent.onmousedown = null;
            this.textImageSpanContent.onmouseup = null;
        }

        // Do not let editor to go to the right.
        if (this.textImageSpan.offsetLeft + EDITOR_WIDTH > this.imageWidth) {
            this.editorXCoord = -1 * (this.textImageSpan.offsetLeft + EDITOR_WIDTH - this.imageWidth);
        } else {
            this.editorXCoord = -17;
        }

        // Do not let editor to go to the left.
        if (this.textImageSpan.offsetLeft < 17) {
            this.editorXCoord = this.textImageSpan.offsetLeft * -1;
        }

        if (!this.editable) {
            this.colorValueStyle = '';
        } else {
            this.colorValueStyle = this.colorValue;
        }

        if (this.recordChanged()) {
            const record = { ...this.text };
            record.xCoord = this.xCoord;
            record.yCoord = this.yCoord;
            record.fontSize = this.fontSizeValue;
            record.letterSpacing = this.letterSpacingValue;
            record.wordSpacing = this.wordSpacingValue;
            record.fontFamily = this.fontFamilyValue;
            record.color = this.colorValue;
            record.bold = this.textBold;
            record.italic = this.textItalic;
            record.content = this.textImageSpanContent.innerText;

            this.updateText(this.text.id, record);
        }
    }

    dragMouseDown = (e: any) => {
        this.dragging = true;

        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;

        document.onmouseup = this.closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = this.elementDrag;
    }

    elementDrag = (e: any) => {
        e.preventDefault();

        // calculate the new cursor position:
        this.pos1 = this.pos3 - e.clientX;
        this.pos2 = this.pos4 - e.clientY;
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;

        this.xCoord = this.textImageSpan.offsetLeft - this.pos1;
        this.yCoord = this.textImageSpan.offsetTop - this.pos2;
    }

    closeDragElement = () => {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }

    mouseUp = () => {
        this.dragging = false;
    }

    toggleEditor = () => {
        this.editable ? this.showEditor = !this.showEditor : null;
    }

    toggleDraggable = () => {
        this.draggable = !this.draggable;

        if (this.textEditable) {
            this.textEditable = false;
        }
    }

    toggleTextEditable = () => {
        this.textEditable = !this.textEditable;

        if (this.draggable) {
            this.draggable = false;
        }
    }

    changeValue = (type: string, value: number | string) => {
        const typeValue = `${type}Value`;
        this[typeValue] = value;
    }

    toggleElement = (element: string) => {
        this[element] = !this[element];
    }

    updateTextContent = () => {
        this.textContent = this.textImageSpanContent.innerText;
        this.textChanged = true;
    }

    recordChanged = () => {
        const text = this.text;
        if (
            text.xCoord !== this.xCoord
            || text.yCoord !== this.yCoord
            || text.fontSize !== this.fontSizeValue
            || text.letterSpacing !== this.letterSpacingValue
            || text.wordSpacing !== this.wordSpacingValue
            || text.fontFamily !== this.fontFamilyValue
            || text.color !== this.colorValue
            || text.bold !== this.textBold
            || text.italic !== this.textItalic
            || this.textChanged
        ) {
            return true;
        }
        return false;
    }

    render() {
        const text = this.text;

        return (
            <span
                class={`
                    text-image-span
                    ${this.editable ? 'text-image-span-editable' : '' }
                    ${this.draggable ? 'text-image-span-draggable' : '' }
                    ${this.dragging ? 'text-image-span-dragging' : '' }
                `}
                style={{
                    top: this.yCoord + 'px',
                    left: this.xCoord + 'px',
                    color: this.colorValueStyle,
                    fontFamily: this.fontFamilyValue,
                    fontSize: this.fontSizeValue + 'px',
                    fontWeight: this.textBold ? 'bold' : 'normal',
                    fontStyle: this.textItalic ? 'italic' : 'normal',
                    letterSpacing: this.letterSpacingValue + 'px',
                    // lineHeight: text.lineHeight + '',
                    wordSpacing: this.wordSpacingValue + 'px',
                }}
                onMouseEnter={this.toggleEditor}
                onMouseLeave={this.toggleEditor}
                ref={(el) => this.textImageSpan = el as HTMLSpanElement}
            >
                <span
                    class="text-image-span-content"
                    ref={(el) => this.textImageSpanContent = el as HTMLSpanElement}
                    contentEditable={this.textEditable}
                    onKeyUp={this.updateTextContent}
                >
                    {text.content}
                </span>

                {this.showEditor && (
                    <span
                        style={{ left: `${this.editorXCoord}px`}}
                        class="text-image-span-editor"
                    >
                        <text-image-editor
                            textEditable={this.textEditable}
                            toggleTextEditable={this.toggleTextEditable}
                            draggable={this.draggable}
                            toggleDraggable={this.toggleDraggable}
                            toggleEditor={this.toggleEditor}

                            textId={this.text.id}
                            fontSizeValue={this.fontSizeValue}
                            letterSpacingValue={this.letterSpacingValue}
                            wordSpacingValue={this.wordSpacingValue}
                            fontFamilyValue={this.fontFamilyValue}
                            colorValue={this.colorValue}
                            textBold={this.textBold}
                            textItalic={this.textItalic}

                            changeValue={this.changeValue}
                            toggleElement={this.toggleElement}

                            selectableFonts={this.selectableFonts}

                            duplicateText={this.duplicateText}
                            deleteText={this.deleteText}
                        />
                    </span>
                )}
            </span>
        );
    }
}
