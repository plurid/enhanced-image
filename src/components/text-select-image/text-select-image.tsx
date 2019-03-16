import { Component, Prop, State, Element } from '@stencil/core';

import { ITextSelectImageData, ITextImage } from '../../interfaces/image-text';

import { styleStringToObject} from '../../utils/styleString';



@Component({
    tag: 'text-select-image',
    styleUrl: 'text-select-image.css',
    shadow: true
})
export class TextSelectImage {
    @Element() element: HTMLElement;
    image!: HTMLImageElement;

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
    @State() toggledSettings: boolean = false;
    @State() imageWidth: number = 0;

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
        this.toggleSettings();
    }

    toggleSettings = () => {
        this.toggledSettings = !this.toggledSettings;
    }

    updateText = (id: string, record: object) => {
        const updatedTexts = this.selectText.imageText.map((text: ITextImage) => {
            if (text.id === id) {
                const updatedText: ITextImage = { ...text, ...record };
                return updatedText;
            }
            return text;
        });
        this.selectText.imageText = updatedTexts;

        this.textselectimageEvent();
    }

    textselectimageEvent = () => {
        const updatedTextSelectImage = new CustomEvent(
            "textselectimage",
            { detail: this.selectText }
        );
        document.dispatchEvent(updatedTextSelectImage);
    }

    componentDidLoad() {
        this.imageWidth = this.image.offsetWidth;
    }

    render() {
        return (
            <div
                style={ {...this.styled} }
                class="text-select-image-container"
            >
                <img
                    src={this.src}
                    alt={this.alt || ''}
                    ref={(el) => this.image = el as HTMLImageElement}
                />
                <select-image
                    textSelectImage={this.element}
                    selectText={this.selectText}
                    editable={this.editable}
                    imageWidth={this.imageWidth}
                    updateText={this.updateText}
                />
                {this.showControl && (
                    <text-select-image-settings
                        toggledSettings={this.toggledSettings}
                        toggleSettings={this.toggleSettings}
                        editable={this.editable}
                        toggleEditable={this.toggleEditable}
                    />
                )}
            </div>
        );
    }
}
