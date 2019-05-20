import React, { Component } from 'react';

import { StyledTextSelectImage } from './styled';

import Context from '../../context';

import SelectImage from '../SelectImage';
import TextSelectImageSettings from '../TextSelectImageSettings';

import {
    UPDATE_DEBOUNCE,
    PLURID_API,
} from '../../data/constants';

import themes from '../../data/themes';

import computeContentId from '../../utils/contentId';

import foodText from '../../test-data/data-food-text';



interface ITextSelectImageProps {
    about?: boolean;
    alt?: string;
    controls?: boolean;
    src: string;
    theme?: string;
    imageText?: any;

    // To be specified when using another API than https://api.plurid.com
    // GraphlQL-based
    apiEndpoint?: string;

    // The apiKey contains the domain allowed to make requests
    // To be specified when using as a service provider
    // apiKey obtained from https://depict.plurid.com/api
    apiKey?: string;

    updateDebounce?: number;
}

interface ITextSelectImageState {
    apiEndpoint: string;
    updateDebounce: number;
    about: boolean;
    controls: boolean;
    theme: any;
    themeName: string;
    toggleSettings: () => void;
    toggledSettings: boolean;
    toggleEditable: () => void;
    toggledEditable: boolean;
    selectText: any;

    createTextImage: () => any;
    duplicateTextImage: (duplicateId: string) => any;
    updateTextImage: (text: any) => any;
    updateTextImageField: (id: string, element: string, value: any) => any;
    deleteTextImage: (id: string) => any;
}


class TextSelectImage extends Component<
    ITextSelectImageProps, Partial<ITextSelectImageState>
> {
    static contextType = Context;

    constructor(props: ITextSelectImageProps) {
        super(props);

        this.state = {
            apiEndpoint: this.props.apiEndpoint || PLURID_API,
            updateDebounce: this.props.updateDebounce || UPDATE_DEBOUNCE,
            toggleSettings: this.toggleSettings,
            toggledSettings: false,
            toggleEditable: this.toggleEditable,
            toggledEditable: false,
            createTextImage: this.createTextImage,
            duplicateTextImage: this.duplicateTextImage,
            updateTextImage: this.updateTextImage,
            updateTextImageField: this.updateTextImageField,
            deleteTextImage: this.deleteTextImage,
        }
    }

    async componentDidMount() {
        const {
            about,
            controls,
            theme
        } = this.props;

        const _about = about ? about : this.context.about;
        const _controls = controls ? controls : this.context.controls;
        const _theme = theme ? themes[theme] : this.context.theme;
        const _themeName = theme ? theme : this.context.themeName;

        const selectText = await this.getText();

        this.setState({
            about: _about,
            controls: _controls,
            theme: _theme,
            themeName: _themeName,
            selectText,
        });
    }

    public render() {
        const {
            src,
            alt,
        } = this.props;
        const {
            theme,
            selectText,
        } = this.state;

        console.log(selectText);

        return (
            <Context.Provider value={this.state}>
                <StyledTextSelectImage
                    theme={theme}
                >
                    <img
                        src={src}
                        alt={alt || 'Image'}
                    />

                    <SelectImage />

                    <TextSelectImageSettings />
                </StyledTextSelectImage>
            </Context.Provider>
        )
    }


    private createTextImage = () => {
        console.log('createTextImage');

    }

    private duplicateTextImage = (duplicateId: string) => {
        console.log('duplicateTextImage', duplicateId);

    }

    private updateTextImage = (text: any) => {
        console.log('updateTextImage', text);
    }

    private updateTextImageField = (id: string, element: string, value: any) => {
        console.log('updateTextImage', id, element, value);
    }

    private deleteTextImage = (id: string) => {
        console.log('deleteTextImage', id);

    }

    private toggleSettings = () => {
        this.setState((prevState: any) => ({
            toggledSettings: !prevState.toggledSettings,
        }));
    }

    private toggleEditable = () => {
        this.setState((prevState: any) => ({
            toggledEditable: !prevState.toggledEditable,
        }));
    }

    private getText = async () => {
        // graphql query to the apiEndpoint
        // with apiKey if exists
        // to get the data
        // based on the contentId of the image

        const { apiEndpoint } = this.state;
        const { apiKey } = this.props;

        const contentId = computeContentId();

        // const data = (apiEndpoint, apiKey, contentId) => {
        //     return {};
        // };

        return foodText;
    }

    private updateText = () => {
        // to debounce the update to database every updateDebounce seconds

        const { updateDebounce } = this.state;
    }
}


export default TextSelectImage;
