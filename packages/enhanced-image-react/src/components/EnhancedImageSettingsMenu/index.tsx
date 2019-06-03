import React, { Component } from 'react';

import Context from '../../context';

import AboutIcon from '../../assets/about-icon';
import AddTextIcon from '../../assets/add-text-icon';
import GetTextIcon from '../../assets/get-text-icon';
import ExtractTextIcon from '../../assets/extract-text-icon';
// import TransviewTextIcon from '../../assets/transview-text-icon';

// import GenerateImageIcon from '../../assets/generate-image-icon';
// import ColorizeImageIcon from '../../assets/colorize-image-icon';

import ResetIcon from '../../assets/reset-icon';
import FullscreenIcon from '../../assets/fullscreen-icon';
import ShareIcon from '../../assets/share-icon';
import SaveIcon from '../../assets/save-icon';

import { ABOUT_URL } from '../../data/constants';

import {
    StyledEnhancedImageSettingsMenu,
} from './styled';

import EnhancedImageButtonCheckmark from '../EnhancedImageButtonCheckmark';
import EnhancedImageButtonItem from '../EnhancedImageButtonItem';
import EnhancedImageSliderItem from '../EnhancedImageSliderItem';

import sliders from '../../data/sliders';

import {
    SLIDER_VALUE_DEFAULTS,
} from '../../data/constants';

import {
    loadImage,
    dataURIToBlob,
} from '../../utils/image';



class EnhancedImageSettingsMenu extends Component<any, any> {
    static contextType = Context;

    saveButton: any;

    state = {
        previousColorValues: {
            invertValue: 0,
            contrastValue: 100,
            hueValue: 0,
            saturationValue: 100,
            brightnessValue: 100,
        },
    };

    constructor(props: any) {
        super(props);

        this.saveButton = React.createRef();
    }

    public render() {
        const {
            about,
            theme,
            toggledEditable,
            toggledDefaults,

            invertValue,
            menuOpaque,
        } = this.context;

        return (
            <StyledEnhancedImageSettingsMenu
                theme={theme}
                menuOpaque={menuOpaque}
            >
                <ul>
                    <li>
                        <EnhancedImageButtonCheckmark
                            theme={theme}
                            toggle={this.toggleEditable}
                            text="Edit Text"
                            checked={toggledEditable}
                        />
                    </li>

                    <li>
                        <EnhancedImageButtonItem
                            theme={theme}
                            atClick={this.addText}
                            icon={AddTextIcon}
                            text="Add Text"
                        />
                    </li>

                    <hr />

                    <li>
                        <EnhancedImageButtonItem
                            theme={theme}
                            atClick={this.getText}
                            icon={GetTextIcon}
                            text="Get Text"
                        />
                    </li>

                    <li>
                        <EnhancedImageButtonItem
                            theme={theme}
                            atClick={this.extractText}
                            icon={ExtractTextIcon}
                            text="Extract Text"
                        />
                    </li>

                    {/* <li>
                        <EnhancedImageButtonItem
                            theme={theme}
                            atClick={this.transviewText}
                            icon={TransviewTextIcon}
                            text="Transview Text"
                        />
                    </li> */}

                    <hr />

                    {/* <li>
                        <EnhancedImageButtonItem
                            theme={theme}
                            atClick={this.generateImage}
                            icon={GenerateImageIcon}
                            text="Generate Image"
                        />
                    </li> */}

                    {/* <li>
                        <EnhancedImageButtonItem
                            theme={theme}
                            atClick={this.colorizeImage}
                            icon={ColorizeImageIcon}
                            text="Colorize Image"
                        />
                    </li> */}

                    <li>
                        <EnhancedImageButtonCheckmark
                            theme={theme}
                            toggle={this.toggleInvert}
                            text="Invert Colors"
                            checked={!!invertValue}
                        />
                    </li>

                    {
                        sliders.map(slider => {
                            const {
                                type,
                                min,
                                max,
                                valueSign
                            } = slider;

                            const sliderValue = `${slider.type}Value`;

                            return (
                                <li
                                    key={type}
                                >
                                    <EnhancedImageSliderItem
                                        theme={theme}
                                        type={type}
                                        min={min}
                                        max={max}
                                        value={this.context[sliderValue]}
                                        valueSign={valueSign}
                                    />
                                </li>
                            )
                        })
                    }

                    <li>
                        <EnhancedImageButtonCheckmark
                            theme={theme}
                            toggle={this.toggleDefaults}
                            text="Toggle Defaults"
                            checked={toggledDefaults}
                        />
                    </li>

                    <li>
                        <EnhancedImageButtonItem
                            theme={theme}
                            atClick={this.handleResetToDefaults}
                            icon={ResetIcon}
                            text="Reset to Defaults"
                        />
                    </li>

                    <hr />

                    <li>
                        <EnhancedImageButtonItem
                            theme={theme}
                            atClick={this.extractText}
                            icon={FullscreenIcon}
                            text="View Fullscreen"
                        />
                    </li>

                    <li>
                        <EnhancedImageButtonItem
                            theme={theme}
                            atClick={this.shareImage}
                            icon={ShareIcon}
                            text="Share Image"
                        />
                    </li>

                    <li
                        onMouseEnter={this.saveImage}
                    >
                        <a
                            ref={this.saveButton}
                        >
                            <EnhancedImageButtonItem
                                theme={theme}
                                atClick={this.saveImage}
                                icon={SaveIcon}
                                text="Save Image"
                            />
                        </a>
                    </li>

                    {about && (
                        <hr />
                    )}

                    {about && (
                        <li>
                            <EnhancedImageButtonItem
                                theme={theme}
                                atClick={this.about}
                                icon={AboutIcon}
                                text="About eImage"
                            />
                        </li>
                    )}
                </ul>
            </StyledEnhancedImageSettingsMenu>
        );
    }

    private shareImage = async () => {
        const {
            imageSha,
            invertValue,
            contrastValue,
            hueValue,
            saturationValue,
            brightnessValue,
        } = this.context;

        const invertStr = invertValue ? 'I100' : 'I0';
        const contrastStr = 'C' + contrastValue;
        const hueStr = 'H' + hueValue;
        const saturationStr = 'S' + saturationValue;
        const lightnessStr = 'L' + brightnessValue;
        const enhance = `${invertStr}-${contrastStr}-${hueStr}-${saturationStr}-${lightnessStr}`;

        const baseLink = 'https://depict.plurid.com/';
        const imageLink = imageSha + '/' + enhance;
        const url = baseLink + imageLink;
        window.open(url, '_blank');

        // to check if image is already uploaded to depict,
        // if it is, then go to the link
        // else, upload, and go to link
    }

    private saveImage = async () => {
        const {
            imageSrc,
            invertValue,
            contrastValue,
            hueValue,
            saturationValue,
            brightnessValue,
        } = this.context;

        const imageName = imageSrc;
        const image: any = await loadImage(imageSrc);
        const { height, width } = image;

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context: any = canvas.getContext('2d');
        context.filter = `
            invert(${invertValue ? 100 : 0}%)
            contrast(${contrastValue}%)
            hue-rotate(${hueValue}deg)
            saturate(${saturationValue}%)
            brightness(${brightnessValue}%)
        `;
        context.drawImage(image, 0, 0, width, height);
        const imageData = canvas.toDataURL('image/png');
        const blob = dataURIToBlob(imageData);

        this.download(blob, imageName);
    }

    private download = async (image: any, imageName: string) => {
        (this.saveButton as any).current.href = await URL.createObjectURL(image);
        (this.saveButton as any).current.download = imageName;
    }

    private toggleInvert = () => {
        const {
            invertValue,
            setColorValue,
        } = this.context;

        invertValue === 0 ? setColorValue('invert', 1) : setColorValue('invert', 0);
    }

    private toggleDefaults = () => {
        const {
            invertValue,
            contrastValue,
            hueValue,
            saturationValue,
            brightnessValue,
            toggledDefaults,
        } = this.context;

        if (toggledDefaults) {
            const {
                previousColorValues,
            } = this.state;

            const {
                toggleDefaults,
                setColorValue,
            } = this.context;

            const previousInvertValue = previousColorValues.invertValue;
            const previousContrastValue = previousColorValues.contrastValue;
            const previousHueValue = previousColorValues.hueValue;
            const previousSaturationValue = previousColorValues.saturationValue;
            const previousBrightnessValue = previousColorValues.brightnessValue;

            setColorValue('invert', previousInvertValue);
            setColorValue('contrast', previousContrastValue);
            setColorValue('hue', previousHueValue);
            setColorValue('saturation', previousSaturationValue);
            setColorValue('brightness', previousBrightnessValue);

            toggleDefaults();
        } else {
            const {
                toggleDefaults,
            } = this.context;

            const previousColorValues = {
                invertValue,
                contrastValue,
                hueValue,
                saturationValue,
                brightnessValue,
            };

            this.setState({
                previousColorValues,
            },
                () => {
                    toggleDefaults();
                    this.resetToDefaults();
                }
            );
        }
    }

    private resetToDefaults = () => {
        const {
            setColorValue
        } = this.context;

        setColorValue('invert', 0);

        for (let slider of sliders) {
            const { type } = slider;

            setColorValue(type, SLIDER_VALUE_DEFAULTS[type]);
        }
    }

    private handleResetToDefaults = () => {
        const {
            toggleDefaults,
            toggledDefaults,
        } = this.context;

        if (toggledDefaults) {
            toggleDefaults();
        }
        this.resetToDefaults();
    }

    private toggleEditable = () => {
        const {
            toggleEditable,
        } = this.context;

        toggleEditable();
    }

    private addText = () => {
        const {
            toggleSettings,
            textSelectImage,
        } = this.context;

        toggleSettings();
        textSelectImage.current.createTextImage();
    }

    private getText = async () => {
        const {
            toggleSettings,
            getText,
        } = this.context;

        toggleSettings();
        await getText();
    }

    private extractText = async () => {
        const {
            toggleSettings,
            extractText,
        } = this.context;

        toggleSettings();
        await extractText();
    }

    private about = () => {
        const {
            toggleSettings,
        } = this.context;

        toggleSettings();
        const aboutURL = ABOUT_URL;
        window.open(aboutURL, '_blank');
    }
}


export default EnhancedImageSettingsMenu;
