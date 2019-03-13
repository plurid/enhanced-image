import { Component, Prop, State } from '@stencil/core';

import { TextSelectImageData } from '../../interfaces/image-text';

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
    @Prop() textData: string;

    @State() styled: any;
    @State() showControl: boolean;
    @State() selectText: TextSelectImageData;

    async componentWillLoad() {
        this.styled = this.styling ? styleStringToObject(this.styling) : {};
        this.showControl = this.control ? this.control : false;
        this.selectText = this.textData ? this.parseText(this.textData) : await this.loadDummyText();
    }

    parseText = (data: string) => {
        console.log('data', data);
        let parsedData: TextSelectImageData;
        return parsedData;
    }

    loadDummyText = async () => {
        let dummyData: TextSelectImageData;

        let response = await fetch('../../test-data/food-text.json');
        let data = await response.json();
        console.log('data', data);

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
