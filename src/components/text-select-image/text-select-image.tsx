import { Component, Prop, State, Method } from '@stencil/core';

import { ITextSelectImageData, ITextImage } from '../../interfaces/image-text';

import { styleStringToObject } from '../../utils/styleString';
import { uuidv4 } from '../../utils/uuid';



@Component({
    tag: 'text-select-image',
    styleUrl: 'text-select-image.css',
    shadow: true
})
export class TextSelectImage {
    image!: HTMLImageElement;

    @Prop() src: string;
    @Prop() alt: string;
    @Prop() height: string;
    @Prop() width: string;
    @Prop() classes: string;
    @Prop() styling: string;
    @Prop() styleImage: any;
    @Prop() enhanced: boolean;

    @Prop() control: boolean;
    @Prop() textData: ITextSelectImageData;

    @State() styled: any;
    @State() showControl: boolean;
    @State() selectText: ITextSelectImageData;
    @State() editable: boolean = false;
    @State() toggledSettings: boolean = false;
    @State() imageWidth: number = 0;
    @State() imageHeight: number = 0;


    async componentWillLoad() {
        this.styled = this.styling
            ? styleStringToObject(this.styling)
            : {};
        this.showControl = this.control
            ? this.control
            : false;
        this.selectText = this.textData
            ? this.parseText(this.textData)
            : await this.loadDummyText();
    }

    componentDidLoad() {
        this.imageWidth = this.image.offsetWidth;
        this.imageHeight = this.image.offsetHeight;
    }

    parseText = (data: ITextSelectImageData) => {
        // if (typeof data === 'object') {
            return data;
        // }
        // console.log('data', data);
        // let parsedData: ITextSelectImageData;
        // return parsedData;
    }

    loadDummyText = async () => {
        const response = await fetch('../../test-data/food-text.json');
        const dummyData: ITextSelectImageData = await response.json();
        // console.log('dummyData', dummyData);
        return dummyData;
    }

    @Method()
    toggleEditable(): void {
        this.editable = !this.editable;
    }

    toggleEditableIntern = (): void => {
        this.editable = !this.editable;
        this.toggleSettings();
    }

    toggleSettings = () => {
        this.toggledSettings = !this.toggledSettings;
    }

    updateText = (id: string, record: ITextImage) => {
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
        const selectText = { ...this.selectText };
        const texts = [];
        let duplicatedText: ITextImage;

        selectText.imageText.map((text: ITextImage) => {
            texts.push(text);
            if (text.id === id) {
                duplicatedText = {
                    ...text,
                    id: `tsi-text-${uuidv4()}`,
                    yCoord: text.yCoord + 50,
                };
                texts.push(duplicatedText);
                // console.log('duplicate source', text);
                // console.log('duplicated text', duplicatedText);
            }
        });

        selectText.imageText = texts;
        this.selectText = { ...selectText };
    }

    deleteText = (id: string) => {
        const selectText = { ...this.selectText }

        const texts = selectText.imageText.filter((text: ITextImage) => {
            if (text.id === id) {
                return false;
            }
            return text;
        });
        // console.log(texts);

        selectText.imageText = texts;
        this.selectText = { ...selectText };
        // console.log(this.selectText);
    }

    @Method()
    addText(): void {
       this.addTextIntern();
    }

    addTextIntern = (): void => {
        const selectText = { ...this.selectText }
        console.log(selectText);

        const text = {
            id: `tsi-text-${uuidv4()}`,
            begin: 0,
            end: 0,
            xPercentage: 0,
            yPercentage: 0,
            xCoord: 50,
            yCoord: 50,
            perspective: '',
            rotation: '',
            skew: '',
            color: 'white',
            fontFamily: 'Helvetica',
            fontSize: 30,
            bold: false,
            italic: false,
            letterSpacing: 0,
            lineHeight: 'auto',
            wordSpacing: 0,
            content: 'New Text'
        }

        selectText.imageText.push(text);
        this.selectText = { ...selectText };
    }

    render() {
        // console.log('RENDER TSI', this.selectText);

        return (
            <div
                style={ {...this.styled} }
                class="text-select-image-container"
            >
                <img
                    src={this.src}
                    alt={this.alt || ''}
                    style={ { ...this.styleImage} }
                    ref={(imgEl) => this.image = imgEl as HTMLImageElement}
                />

                <select-image
                    selectText={this.selectText}
                    editable={this.editable}

                    imageWidth={this.imageWidth}
                    imageHeight={this.imageHeight}

                    updateText={this.updateText}
                    duplicateText={this.duplicateText}
                    deleteText={this.deleteText}
                />

                {this.showControl && (
                    <text-select-image-settings
                        toggledSettings={this.toggledSettings}
                        toggleSettings={this.toggleSettings}
                        editable={this.editable}
                        toggleEditable={this.toggleEditableIntern}
                        addText={this.addTextIntern}
                    />
                )}
            </div>
        );
    }
}
