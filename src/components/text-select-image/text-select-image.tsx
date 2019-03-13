import { Component, Prop, State } from '@stencil/core';

import { TextSelectImageData } from '../../interfaces/image-text';

import { styleStringToObject} from '../../utils/styleString';
import { loadJSON } from '../../utils/json';



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
    @Prop() textData: string;

    @State() styled: any;
    @State() showControl: boolean;
    @State() selectText: TextSelectImageData;

    componentWillLoad() {
        this.styled = this.styling ? styleStringToObject(this.styling) : {};
        this.showControl = this.control ? this.control : false;
        this.selectText = this.textData ? this.parseText(this.textData) : this.loadDummyText();
    }

    parseText = (data: string) => {
        console.log('data', data);
        let parsedData: TextSelectImageData;
        return parsedData;
    }

    loadDummyText = () => {
        let dummyData: TextSelectImageData;
        loadJSON('../../test-data/food-text.json', (data: TextSelectImageData) => {
            console.log(data);
        });

        return dummyData;
    }

    render() {
        console.log('select text', this.selectText);
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
