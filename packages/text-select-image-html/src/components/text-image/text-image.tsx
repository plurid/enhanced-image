import { Component, Element, Prop, State } from '@stencil/core';

import { ITextImage } from '../../interfaces/image-text';

import { selectableFonts } from '../../data/fonts';



const EDITOR_WIDTH = 798;



@Component({
    tag: 'text-image',
    styleUrl: 'text-image.css',
    shadow: true,
})
export class TextImage {
    @Element() private element: HTMLElement;
    private textImageSpan!: HTMLSpanElement;
    private textImageSpanContent!: HTMLSpanElement;

    @Prop({ reflectToAttr: true }) private textId: string;
    @Prop() private imageText: ITextImage[];
    @Prop() private textImage: ITextImage;
    @Prop() private editable: boolean;
    @Prop() private imageWidth: number;
    @Prop() private imageHeight: number;

    @Prop() private updateText: (id: string, text: ITextImage) => void;
    @Prop() private duplicateText: (id: string) => void;
    @Prop() private removeText: (id: string) => void;

    @State() private xCoord: number = 20;
    @State() private yCoord: number = 20;

    @State() private textEditable: boolean = false;
    @State() private draggable: boolean = false;
    @State() private dragging: boolean = false;
    @State() private showEditor: boolean = false;
    @State() private pos1: number = 0;
    @State() private pos2: number = 0;
    @State() private pos3: number = 0;
    @State() private pos4: number = 0;

    private text: ITextImage;

    @State() private fontSizeValue: number = 12;
    @State() private letterSpacingValue: number = 0;
    @State() private wordSpacingValue: number = 0;
    @State() private fontFamilyValue: string = 'Arial';
    @State() private colorValue: string = '';
    @State() private colorValueStyle: string = '';
    @State() private textLink: boolean = false;
    @State() private textLinkToValue: string = '';
    @State() private textBold: boolean = false;
    @State() private textItalic: boolean = false;
    @State() private textContent: string = '';
    @State() private textChanged: boolean = false;
    @State() private textViewable: boolean = false;

    @State() private editorXCoord: number = 0;
    @State() private editorYCoord: number = 0;

    public componentWillLoad() {
        this.text = this.textImage;
    }

    public componentDidLoad() {
        // this.textContent = 'this.textImageSpanContent.innerText;';
        // this.textContent = this.textImageSpanContent.innerText;

        this.xCoord = this.text.xCoord;
        this.yCoord = this.text.yCoord;

        this.fontSizeValue = this.text.fontSize || this.fontSizeValue;
        this.fontFamilyValue = this.text.fontFamily || this.fontFamilyValue;
        this.letterSpacingValue = this.text.letterSpacing || this.letterSpacingValue;
        this.wordSpacingValue = this.text.wordSpacing || this.wordSpacingValue;
        this.textLink = this.text.link || this.textLink;
        this.textLinkToValue = this.text.linkTo || this.textLinkToValue;
        this.textBold = this.text.bold || this.textBold;
        this.textItalic =  this.text.italic || this.textItalic;
        this.textViewable = this.text.viewable || this.textViewable;
        // this.colorValue = this.text.color || this.colorValue;
        if (this.editable) {
            this.colorValue = this.text.color || 'black';
            this.colorValueStyle = this.colorValue;
        }
    }

    public componentWillUpdate() {
        if (this.draggable) {
            // console.log('aa', this.textImageSpanContent);
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

        // Do not let editor to go to over the top.
        if (this.textImageSpan.offsetTop < 34) {
            this.editorYCoord = this.textImageSpan.offsetHeight;
        } else {
            this.editorYCoord = -34;
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

    public dragMouseDown = (e: any) => {
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

    public elementDrag = (e: any) => {
        e.preventDefault();

        // calculate the new cursor position:
        this.pos1 = this.pos3 - e.clientX;
        this.pos2 = this.pos4 - e.clientY;
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;

        this.xCoord = this.textImageSpan.offsetLeft - this.pos1;
        this.yCoord = this.textImageSpan.offsetTop - this.pos2;
    }

    public closeDragElement = () => {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }

    public mouseUp = () => {
        this.dragging = false;
    }

    public toggleEditor = () => {
        this.editable ? this.showEditor = !this.showEditor : null;
    }

    public toggleDraggable = () => {
        this.draggable = !this.draggable;

        if (this.textEditable) {
            this.textEditable = false;
        }
    }

    public toggleTextEditable = () => {
        this.textEditable = !this.textEditable;

        if (this.draggable) {
            this.draggable = false;
        }
    }

    public toggleTextViewable = () => {
        this.textViewable = !this.textViewable;
    }

    public changeValue = (type: string, value: number | string) => {
        const typeValue = `${type}Value`;
        this[typeValue] = value;
    }

    public toggleElement = (element: string) => {
        this[element] = !this[element];
    }

    public updateTextContent = () => {
        this.textContent = this.textImageSpanContent.innerText;
        this.textChanged = true;
    }

    public recordChanged = () => {
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
            || text.viewable !== this.textViewable
            // || this.textChanged
        ) {
            return true;
        }
        return false;
    }

    public render() {
        const text = this.text;
        // console.log('text-image :: text', this.textId, this.text);

        return (
            <span
                class={`
                    text-image-span
                    ${this.editable ? 'text-image-span-editable' : '' }
                    ${this.draggable ? 'text-image-span-draggable' : '' }
                    ${this.dragging ? 'text-image-span-dragging' : '' }
                    ${this.textViewable ? 'text-image-span-viewable' : '' }
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
                    {this.textLink
                        ? (<a href={this.textLinkToValue} target="_blank">
                            {text.content}
                        </a>)
                        : (<span>
                            {text.content}
                        </span>)
                    }
                </span>

                {this.showEditor && (
                    <span
                        style={{
                            left: `${this.editorXCoord}px`,
                            top: `${this.editorYCoord}px`,
                        }}
                        class="text-image-span-editor"
                    >
                        <text-image-editor
                            textEditable={this.textEditable}
                            toggleTextEditable={this.toggleTextEditable}
                            draggable={this.draggable}
                            toggleDraggable={this.toggleDraggable}
                            toggleEditor={this.toggleEditor}
                            textViewable={this.textViewable}
                            toggleTextViewable={this.toggleTextViewable}

                            textId={this.text.id}
                            fontSizeValue={this.fontSizeValue}
                            letterSpacingValue={this.letterSpacingValue}
                            wordSpacingValue={this.wordSpacingValue}
                            fontFamilyValue={this.fontFamilyValue}
                            colorValue={this.colorValue}
                            textLink={this.textLink}
                            textLinkToValue={this.textLinkToValue}
                            textBold={this.textBold}
                            textItalic={this.textItalic}

                            changeValue={this.changeValue}
                            toggleElement={this.toggleElement}

                            selectableFonts={selectableFonts}

                            duplicateText={this.duplicateText}
                            removeText={this.removeText}
                        />
                    </span>
                )}
            </span>
        );
    }
}
