import React, { Component } from 'react';

import Context from '../../context';

import AboutIcon from '../../assets/about-icon';
import AddTextIcon from '../../assets/add-text-icon';
import SaveImageTextIcon from '../../assets/save-image-text-icon';
import GetTextIcon from '../../assets/get-text-icon';
import ExtractTextIcon from '../../assets/extract-text-icon';

import { ABOUT_URL } from '../../data/constants';

import {
    StyledTextSelectImageSettingsMenu,
} from './styled';

import TextSelectImageButtonCheckmark from '../TextSelectImageButtonCheckmark';
import TextSelectImageButtonItem from '../TextSelectImageButtonItem';



class TextSelectImageSettingsMenu extends Component<any, any> {
    static contextType = Context;

    public render() {
        const {
            about,
            theme,
            toggleEditable,
            toggledEditable,
            textFunctions,
        } = this.context;

        return (
            <StyledTextSelectImageSettingsMenu
                theme={theme}
            >
                <ul>
                    <li>
                        <TextSelectImageButtonCheckmark
                            theme={theme}
                            toggle={toggleEditable}
                            text="Edit Text"
                            checked={toggledEditable}
                        />
                    </li>

                    <li>
                        <TextSelectImageButtonItem
                            theme={theme}
                            atClick={this.addText}
                            icon={AddTextIcon}
                            text="Add Text"
                        />
                    </li>

                    <li>
                        <TextSelectImageButtonItem
                            theme={theme}
                            atClick={this.saveText}
                            icon={SaveImageTextIcon}
                            text="Save Image Text"
                        />
                    </li>

                    <hr />

                    <li>
                        <TextSelectImageButtonItem
                            theme={theme}
                            atClick={this.getText}
                            icon={GetTextIcon}
                            text="Get Text"
                        />
                    </li>

                    <li>
                        <TextSelectImageButtonItem
                            theme={theme}
                            atClick={this.extractText}
                            icon={ExtractTextIcon}
                            text="Extract Text"
                        />
                    </li>

                    {about && (
                        <hr />
                    )}

                    {about && (
                        <li>
                            <TextSelectImageButtonItem
                                theme={theme}
                                atClick={this.about}
                                icon={AboutIcon}
                                text="About TSI"
                            />
                        </li>
                    )}
                </ul>
            </StyledTextSelectImageSettingsMenu>
        );
    }

    private addText = () => {
        const {
            // toggleSettings,
            createTextImage,
        } = this.context;

        // toggleSettings();
        createTextImage();
    }

    private saveText = () => {
        const {
            // toggleSettings,
            saveImageText,
        } = this.context;

        // toggleSettings();
        saveImageText();
    }

    private getText = async () => {
        const {
            toggleSettings,
            getAndSetText,
        } = this.context;

        toggleSettings();
        await getAndSetText();
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


export default TextSelectImageSettingsMenu;
