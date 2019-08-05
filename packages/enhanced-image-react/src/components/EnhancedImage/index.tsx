import React, { Component } from 'react';

import './styles.css';

import {
    StyledEnhancedImage,
} from './styled';

import {
    EnhancedImageProps,
    EnhancedImageState,
} from './interfaces';

import Context from '../../context';

// import SelectImage from '../SelectImage';
import EnhancedImageSettings from '../EnhancedImageSettings';
// import Spinner from '../Spinner';

import {
    UPDATE_DEBOUNCE,
    PLURID_API,
} from '../../data/constants';

import themes from '../../data/themes';

import TextSelectImage from '@plurid/text-select-image-react';



class EnhancedImage extends Component<EnhancedImageProps, EnhancedImageState> {
    static contextType = Context;

    textSelectImage: any;

    constructor(props: any) {
        super(props);

        const apiEndpoint = this.props.apiEndpoint || PLURID_API;
        // this.client = apolloClient(apiEndpoint);

        this.textSelectImage = React.createRef();

        this.state = {
            apiEndpoint,
            updateDebounce: this.props.updateDebounce || UPDATE_DEBOUNCE,

            loading: false,
            editorWidth: 0,

            imageLoaded: false,
            imageHeight: 0,
            imageWidth: 0,
            imageNaturalHeight: 0,
            imageNaturalWidth: 0,
            imageSha: '',
            imageSrc: this.props.src,

            toggleSettingsButton: this.toggleSettingsButton,
            toggledSettingsButton: false,
            toggleSettings: this.toggleSettings,
            toggledSettings: false,
            toggleEditable: this.toggleEditable,
            toggledEditable: false,

            invertValue: 0,
            contrastValue: 100,
            hueValue: 0,
            saturationValue: 100,
            brightnessValue: 100,
            setColorValue: this.setColorValue,

            menuOpaque: true,
            toggleMenuOpaque: this.toggleMenuOpaque,

            toggledDefaults: false,
            toggleDefaults: this.toggleDefaults,

            textSelectImage: this.textSelectImage,

            getText: this.getText,
            extractText: this.extractText,
        };
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

        // const selectText = await this.getText();

        this.setState({
            about: _about,
            controls: _controls,
            theme: _theme,
            themeName: _themeName,
            selectText: {},
        });
    }

    public render() {
        const {
            src,
            alt,
            height,
            width,
        } = this.props;
        const {
            controls,
            theme,
            imageLoaded,
            loading,
            imageWidth,
            toggledEditable,
            toggledSettingsButton,
            selectText,
            invertValue,
            contrastValue,
            hueValue,
            saturationValue,
            brightnessValue,
            apiEndpoint,
        } = this.state;

        return (
            <Context.Provider value={this.state}>
                <StyledEnhancedImage
                    theme={theme}
                    // toggledEditable={toggledEditable}
                    imageWidth={imageWidth}
                    onMouseEnter={this.toggleSettingsButton}
                    onMouseLeave={this.toggleSettingsButton}
                    onMouseMove={this.handleMouseMove}
                >
                    <TextSelectImage
                        src={src || ''}
                        alt={alt || 'Image'}
                        theme={theme}
                        apiEndpoint={apiEndpoint}
                        atLoad={this.handleLoadedImage}
                        imageStyle={{
                            filter: `
                                invert(${invertValue})
                                contrast(${contrastValue}%)
                                hue-rotate(${hueValue}deg)
                                saturate(${saturationValue}%)
                                brightness(${brightnessValue}%)
                            `,
                            width: width ? width + 'px' : '100%',
                            height: height ? height + 'px' : 'auto',
                        }}
                        ref={this.textSelectImage}
                    />

                    {toggledSettingsButton && controls && (
                        <EnhancedImageSettings />
                    )}

                    {/* {loading && (
                        <Spinner />
                    )} */}
                </StyledEnhancedImage>
            </Context.Provider>
        );
    }

    private toggleSettingsButton = () => {
        this.setState((prevState: any) => ({
            toggledSettingsButton: !prevState.toggledSettingsButton,
        }));
    }

    private toggleSettings = () => {
        this.setState((prevState: any) => ({
            toggledSettings: !prevState.toggledSettings,
        }));
    }

    private toggleDefaults = () => {
        this.setState((prevState: any) => ({
            toggledDefaults: !prevState.toggledDefaults,
        }));
    }

    private toggleEditable = () => {
        this.toggleSettings();
        this.textSelectImage.current.toggleEditable();

        this.setState((prevState: any) => ({
            toggledEditable: !prevState.toggledEditable,
        }));
    }

    private getText = async () => {
        await this.textSelectImage.current.getAndSetText();
    }

    private extractText = async () => {
        await this.textSelectImage.current.extractText();
    }

    private setColorValue = (type: string, value: number) => {
        const colorItem = `${type}Value`;
        this.setState({
            [colorItem]: value,
        });
    }

    private toggleMenuOpaque = () => {
        this.setState((prevState: any) => ({
            menuOpaque: !prevState.menuOpaque,
        }));
    }

    private handleLoadedImage = async (image: any) => {
        const {
            offsetHeight,
            offsetWidth,
            naturalHeight,
            naturalWidth,
        } = image.target;

        // this.computeImageSha();

        this.setState({
            imageLoaded: true,
            imageWidth: offsetWidth,
            imageHeight: offsetHeight,
            imageNaturalHeight: naturalHeight,
            imageNaturalWidth: naturalWidth,
        });
    }

    private handleMouseMove = () => {
        const {
            toggledSettingsButton,
        } = this.state;

        if (!toggledSettingsButton) {
            this.toggleSettingsButton();
        }
    }

    private computeImageSha = async () => {
        // const {
        //     src
        // } = this.props;

        // const image: any = await loadImage(src);
        // const { height, width } = image;
        // const canvas = document.createElement('canvas');
        // canvas.width = width;
        // canvas.height = height;
        // const context: any = canvas.getContext('2d');
        // context.drawImage(image, 0, 0, width, height);
        // const imageData = context.getImageData(0, 0, width, height);
        // const buffer = imageData.data;
        // const imageSha = sha256(arrayBufferToWordArray(buffer)).toString();

        // this.setState({
        //     imageSha,
        // });
    }
}


export default EnhancedImage;
