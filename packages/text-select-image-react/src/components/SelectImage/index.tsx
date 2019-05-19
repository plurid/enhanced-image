import React, { Component } from 'react';

import TextImage from '../TextImage';

import { ITextSelectImageData, ITextImage } from '../../interfaces/image-text';



interface ISelectImage {
    editable: boolean;
    imageWidth: number;
    imageHeight: number;
    selectText: ITextSelectImageData;
    deleteText: (id: string) => void;
    duplicateText: (id: string) => void;
    updateText: (id: string, text: ITextImage) => void;
}


class SelectImage extends Component<ISelectImage, any> {
    public render() {
        const {
            editable,
            imageWidth,
            imageHeight,
            selectText,
            duplicateText,
            updateText,
        } = this.props;
        const { imageText } = selectText;

        return (
            <div>
                {imageText.map(text => {
                    return (
                        <TextImage
                            key={text.id}

                            editable={editable}

                            textId={text.id}
                            textImage={text}
                            imageText={imageText}

                            updateText={updateText}
                            duplicateText={duplicateText}
                            removeText={this.removeText}

                            imageWidth={imageWidth}
                            imageHeight={imageHeight}
                        />
                    );
                })}
            </div>
        );
    }

    private removeText = (id: string) => {
        const { deleteText } = this.props;
        // const el = this.div.querySelector(`text-image[text-id=${id}]`);
        // this.div.removeChild(el);
        deleteText(id);
    }
}


export default SelectImage;
