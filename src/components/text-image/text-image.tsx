import { Component, Element, Prop, State } from '@stencil/core';

import { ITextImage } from '../../interfaces/image-text';



@Component({
    tag: 'text-image',
    styleUrl: 'text-image.css',
    shadow: true
})
export class TextImage {
    @Element() element: HTMLElement;
    textImageSpan!: HTMLSpanElement;

    @Prop() text: ITextImage;
    @Prop() textSelectImage: any;

    @State() xCoord: number = 0;
    @State() yCoord: number = 0;

    @State() draggable: boolean = true;
    @State() dragging: boolean = false;
    @State() pos1: number = 0;
    @State() pos2: number = 0;
    @State() pos3: number = 0;
    @State() pos4: number = 0;

    componentWillLoad() {
        this.xCoord = this.text.xCoord;
        this.yCoord = this.text.yCoord;

        if (this.draggable) {
            this.element.onmousedown = this.dragMouseDown;
            this.element.onmouseup = this.mouseUp;
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

    render() {
        const text = this.text;

        return (
            <span
                class={`
                    text-image-span
                    ${this.draggable ? 'text-image-span-draggable' : '' }
                    ${this.dragging ? 'text-image-span-dragging' : '' }
                `}
                style={{
                    top: this.yCoord + 'px',
                    left: this.xCoord + 'px',
                    // color: text.color,
                    fontFamily: text.fontFamily,
                    fontSize: text.fontSize + 'px',
                    fontWeight: text.fontWeight + '',
                    letterSpacing: text.letterSpacing + 'px',
                }}
                ref={(el) => this.textImageSpan = el as HTMLSpanElement}
            >
                {text.content}
            </span>
        );
    }
}
