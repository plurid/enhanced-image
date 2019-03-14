import { Component, Prop, State, Element } from '@stencil/core';

import { ITextSelectImageData } from '../../interfaces/image-text';

import { styleStringToObject} from '../../utils/styleString';



@Component({
    tag: 'text-select-image',
    styleUrl: 'text-select-image.css',
    shadow: true
})
export class TextSelectImage {
    @Element() element: HTMLElement;

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
    @State() selectText: ITextSelectImageData;
    @State() editable: boolean = false;

    async componentWillLoad() {
        this.styled = this.styling ? styleStringToObject(this.styling) : {};
        this.showControl = this.control ? this.control : false;
        this.selectText = this.textData ? this.parseText(this.textData) : await this.loadDummyText();
    }

    parseText = (data: string) => {
        console.log('data', data);
        let parsedData: ITextSelectImageData;
        return parsedData;
    }

    loadDummyText = async () => {
        let response = await fetch('../../test-data/food-text.json');
        let dummyData: ITextSelectImageData = await response.json();
        // console.log('dummyData', dummyData);
        return dummyData;
    }

    toggleEditable = () => {
        this.editable = !this.editable;
    }

    render() {
        // console.log('select text', this.selectText);
        return (
            <div
                style={ {...this.styled} }
                class="text-select-image-container"
            >
                <img src={this.src} alt={this.alt || ''} />
                <select-image
                    textSelectImage={this.element}
                    selectText={this.selectText}
                    editable={this.editable}
                />
                {this.showControl && (
                    <text-select-image-settings
                        editable={this.editable}
                        toggleEditable={this.toggleEditable}
                    />
                )}
            </div>
        );
    }
}
