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




class EnhancedImageSettingsMenu extends Component<any, any> {
    static contextType = Context;

    public render() {
        const {
            about,
            theme,
            toggledEditable,

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
                            toggle={this.toggleEditable}
                            text="Toggle Defaults"
                            checked={toggledEditable}
                        />
                    </li>

                    <li>
                        <EnhancedImageButtonItem
                            theme={theme}
                            atClick={this.extractText}
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
                            atClick={this.extractText}
                            icon={ShareIcon}
                            text="Share Image"
                        />
                    </li>

                    <li>
                        <EnhancedImageButtonItem
                            theme={theme}
                            atClick={this.extractText}
                            icon={SaveIcon}
                            text="Save Image"
                        />
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


    private toggleInvert = () => {
        const {
            invertValue,
            setColorValue,
        } = this.context;

        invertValue === 0 ? setColorValue('invert', 1) : setColorValue('invert', 0);
    }

    private toggleEditable = () => {
        const {
            toggleSettings,
            toggleEditable,
        } = this.context;

        toggleSettings();
        toggleEditable();
    }

    private addText = () => {
        const {
            toggleSettings,
            createTextImage,
        } = this.context;

        toggleSettings();
        createTextImage();
    }

    private getText = () => {
    }

    private extractText = () => {
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
