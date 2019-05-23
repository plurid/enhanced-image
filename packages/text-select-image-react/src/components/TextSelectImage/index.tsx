import React, { Component } from 'react';

import { StyledTextSelectImage } from './styled';

import Context from '../../context';

import SelectImage from '../SelectImage';
import TextSelectImageSettings from '../TextSelectImageSettings';
import Spinner from '../Spinner';

import {
    UPDATE_DEBOUNCE,
    PLURID_API,
} from '../../data/constants';

import themes from '../../data/themes';

import computeContentId from '../../utils/contentId';
import uuidv4 from '../../utils/uuid';

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

    theme: any;
    themeName: string;
    about: boolean;
    controls: boolean;
    editorWidth: number;
    loading: boolean;

    imageLoaded: boolean;
    imageHeight: number;
    imageWidth: number;
    imageNaturalHeight: number;
    imageNaturalWidth: number;

    toggleSettingsButton: () => void;
    toggledSettingsButton: boolean;
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
    setEditorWidth: (value: number) => any;
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

            loading: false,
            editorWidth: 0,

            imageLoaded: false,
            imageHeight: 0,
            imageWidth: 0,
            imageNaturalHeight: 0,
            imageNaturalWidth: 0,

            toggleSettingsButton: this.toggleSettingsButton,
            toggledSettingsButton: false,
            toggleSettings: this.toggleSettings,
            toggledSettings: false,
            toggleEditable: this.toggleEditable,
            toggledEditable: false,

            createTextImage: this.createTextImage,
            duplicateTextImage: this.duplicateTextImage,
            updateTextImage: this.updateTextImage,
            updateTextImageField: this.updateTextImageField,
            deleteTextImage: this.deleteTextImage,
            setEditorWidth: this.setEditorWidth,
        }
    }

    async componentDidMount() {
        const {
            about,
            controls,
            theme
        } = this.props;

        const _about = about === undefined ? this.context.about : about;
        const _controls = controls === undefined ? this.context.controls : controls;
        const _theme = theme === undefined ? this.context.theme : themes[theme];
        const _themeName = theme === undefined ? this.context.themeName : theme;

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
            controls,
            theme,
            loading,
            imageWidth,
            toggledEditable,
            toggledSettingsButton,
            selectText,
        } = this.state;

        return (
            <Context.Provider value={this.state}>
                <StyledTextSelectImage
                    theme={theme}
                    toggledEditable={toggledEditable}
                    imageWidth={imageWidth}
                    onMouseEnter={this.toggleSettingsButton}
                    onMouseLeave={this.toggleSettingsButton}
                >
                    <img
                        src={src}
                        alt={alt || 'Image'}
                        onLoad={this.handleLoadedImage}
                    />

                    <SelectImage />

                    {toggledSettingsButton && controls && (
                        <TextSelectImageSettings />
                    )}

                    {loading && (
                        <Spinner />
                    )}
                </StyledTextSelectImage>
            </Context.Provider>
        );
    }


    private createTextImage = () => {
        const { selectText } = this.state;
        const { imageText } = selectText;

        const newTextImage = {
            id: `tsi-text-${uuidv4()}`,
            xPercentage: 0,
            yPercentage: 0,
            xCoord: 50,
            yCoord: 50,
            perspective: '',
            rotation: '',
            skew: '',
            color: 'red',
            fontFamily: 'Arial',
            fontSize: 24,
            bold: false,
            italic: false,
            letterSpacing: 1,
            lineHeight: 'auto',
            wordSpacing: 0,
            content: 'New Text',
            link: false,
            linkTo: '',
            wiewable: false,
        };

        imageText.push(newTextImage);
        selectText.imageText = imageText;

        this.setState({
            selectText,
        });
    }

    private duplicateTextImage = (duplicateId: string) => {
        const { selectText } = this.state;
        const { imageText } = selectText;

        const updatedImageText: any[] = [];
        imageText.map((imgText: any) => {
            if (imgText.id === duplicateId) {
                const duplicateText = { ...imgText };
                duplicateText.id = `tsi-text-${uuidv4()}`;
                duplicateText.yCoord = duplicateText.yCoord + 50;
                updatedImageText.push(duplicateText);
            }
            updatedImageText.push(imgText);
        });
        selectText.imageText = updatedImageText;

        this.setState({
            selectText,
        });
    }

    private updateTextImage = (text: any) => {
        const { selectText } = this.state;
        const { imageText } = selectText;

        const updatedImageText = imageText.map((imgText: any) => {
            if (imgText.id === text.id) {
                return text;
            }
            return imgText;
        });
        selectText.imageText = updatedImageText;

        this.setState({
            selectText,
        });
    }

    private updateTextImageField = (id: string, element: string, value: any) => {
        const { selectText } = this.state;
        const { imageText } = selectText;

        const updatedImageText = imageText.map((imgText: any) => {
            if (imgText.id === id) {
                imgText[element] = value;
                return imgText;
            }
            return imgText;
        });
        selectText.imageText = updatedImageText;

        this.setState({
            selectText,
        });
    }

    private deleteTextImage = (id: string) => {
        const { selectText } = this.state;
        const { imageText } = selectText;

        const updatedImageText = imageText.filter((imgText: any) => {
            if (imgText.id === id) {
                return false;
            }
            return imgText;
        });
        selectText.imageText = updatedImageText;

        this.setState({
            selectText,
        });
    }

    private toggleSettings = () => {
        this.setState((prevState: any) => ({
            toggledSettings: !prevState.toggledSettings,
        }));
    }

    private toggleSettingsButton = () => {
        this.setState((prevState: any) => ({
            toggledSettingsButton: !prevState.toggledSettingsButton,
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

    private handleLoadedImage = async (image: any) => {
        const {
            offsetHeight,
            offsetWidth,
            naturalHeight,
            naturalWidth,
        } = image.target;

        this.setState({
            imageLoaded: true,
            imageWidth: offsetWidth,
            imageHeight: offsetHeight,
            imageNaturalHeight: naturalHeight,
            imageNaturalWidth: naturalWidth,
        });
    }

    private setEditorWidth = (editorWidth: number) => {
        this.setState({
            editorWidth,
        });
    }
}


export default TextSelectImage;
