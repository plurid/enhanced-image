import { setImageSelect } from './image-select-core';



export class HTMLImageSelectElement extends HTMLElement {
    constructor() {
        super();

        setImageSelect(this);
    }
}


customElements.define('image-select', HTMLImageSelectElement);
