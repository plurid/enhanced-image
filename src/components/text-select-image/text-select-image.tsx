import { Component, Prop, State } from '@stencil/core';

import { styleStringToObject} from '../../utils/styleString';



@Component({
    tag: 'text-select-image',
    styleUrl: 'text-select-image.css',
    shadow: true
})
export class TextSelectImage {
    @Prop() src: string;
    @Prop() alt: string;
    @Prop() height: string;
    @Prop() width: string;
    @Prop() classes: string;
    @Prop() styling: string;

    @Prop() control: boolean;

    @State() styled: any;
    @State() showControl: boolean;

    componentWillLoad() {
        this.styled = this.styling ? styleStringToObject(this.styling) : {};
        this.showControl = this.control ? this.control : false;
    }

    render() {
        return (
            <div
                style={ {...this.styled} }
                class="text-select-image-container"
            >
                <img src={this.src} alt={this.alt || ''} />
                <select-image />
            </div>
        );
    }
}
