import { setImageText } from './image-text-core';



export class HTMLImageTextElement extends HTMLElement {
    constructor() {
        super();

        setImageText(this);
    }
}


customElements.define('image-text', HTMLImageTextElement);
