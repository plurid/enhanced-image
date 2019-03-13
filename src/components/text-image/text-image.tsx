import { Component, Element, Prop, State } from '@stencil/core';

import { ITextImage } from '../../interfaces/image-text';



@Component({
    tag: 'text-image',
    styleUrl: 'text-image.css',
    shadow: true
})
export class TextImage {
    @Element() element: HTMLElement;

    @Prop() text: ITextImage;
    @Prop() textSelectImage: any;

    @State() xCoord: number;
    @State() yCoord: number;

    @State() pos1: number = 0;
    @State() pos2: number = 0;
    @State() pos3: number = 0;
    @State() pos4: number = 0;

    componentWillLoad() {
        this.xCoord = this.text.xCoord;
        this.yCoord = this.text.yCoord;
        this.element.onmousedown = this.dragMouseDown;
        // console.log('bbb', this.element);
    }

    dragMouseDown = (e: any) => {
        console.log(e);

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
        console.log(e);

        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        this.pos1 = this.pos3 - e.clientX;
        this.pos2 = this.pos4 - e.clientY;
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;

        console.log(e.clientX);

        // console.log(this.pos3);
        // console.log(this.pos4);

        // set the element's new position:
        // console.log('AAA', this.element.offsetTop - this.pos2);
        // this.xCoord = (this.element.offsetTop - this.pos2);
        // this.yCoord = (this.element.offsetLeft - this.pos1);

        this.xCoord = e.clientX - 100;
        this.yCoord = e.clientY - 200;
    }

    // @Listen('window:mouseup')
    closeDragElement = () => {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }

    render() {
        const text = this.text;
        // console.log('text', this.text);
        console.log('this.xCoord', this.xCoord);
        console.log('this.yCoord', this.yCoord);

        return (
            <span
                class="text-image-span text-image-span-draggable"
                style={{
                    top: this.yCoord + 'px',
                    left: this.xCoord + 'px',
                    // color: text.color,
                    fontFamily: text.fontFamily,
                    fontSize: text.fontSize + 'px',
                    fontWeight: text.fontWeight + '',
                    letterSpacing: text.letterSpacing + 'px',
                }}
            >
                {text.content}
            </span>
        );
    }
}
