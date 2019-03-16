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

    duplicateText = (id: string) => {
        const selectText = { ...this.selectText }

        let duplicatedText: ITextImage;
        const texts = [];
        selectText.imageText.map((text: ITextImage) => {
            // console.log(id);
            // console.log(text.id);
            if (text.id === id) {
                console.log(text);
                duplicatedText = {
                    ...text,
                    id: `${Math.ceil(Math.random()*10000000)}`,
                    xCoord: text.xCoord,
                    yCoord: text.yCoord + 50,
                };
                texts.push(duplicatedText);
                console.log('aaa', duplicatedText);
            }
            texts.push(text);
        });
        selectText.imageText = texts;
        this.selectText = { ...selectText };
        // console.log(this.selectText);
    }

    deleteText = (id: string) => {
        const selectText = { ...this.selectText }

        const texts = selectText.imageText.filter((text: ITextImage) => {
            if (text.id === id) {
                return false;
            }
            return text;
        });
        selectText.imageText = texts;
        this.selectText = { ...selectText };
        console.log(this.selectText);
    }

    addText = () => {
        const selectText = { ...this.selectText }

        const text = {
            id: `${Math.ceil(Math.random()*10000000)}`,
            begin: 0,
            end: 0,
            xPercentage: 0,
            yPercentage: 0,
            xCoord: 50,
            yCoord: 50,
            perspective: "string",
            rotation: "string",
            skew: "string",
            color: "white",
            fontFamily: "Helvetica",
            fontSize: 30,
            bold: false,
            italic: false,
            letterSpacing: 0,
            lineHeight: "auto",
            wordSpacing: 0,
            content: "New Text"
        }

        selectText.imageText.push(text);
        this.selectText = { ...selectText };
    }

    componentDidLoad() {
        this.imageWidth = this.image.offsetWidth;
    }

    render() {
        // console.log(this.selectText);

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
                    duplicateText={this.duplicateText}
                    deleteText={this.deleteText}
                />
                {this.showControl && (
                    <text-select-image-settings
                        toggledSettings={this.toggledSettings}
                        toggleSettings={this.toggleSettings}
                        editable={this.editable}
                        toggleEditable={this.toggleEditable}
                        addText={this.addText}
                    />
                )}
            </div>
        );
    }
}
