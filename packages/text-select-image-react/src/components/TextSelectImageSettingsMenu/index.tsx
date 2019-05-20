import React, { Component } from 'react';

import Context from '../../context';

import AboutIcon from '../../assets/about-icon';
import AddTextIcon from '../../assets/add-text-icon';

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
            theme,
            toggledEditable,
        } = this.context;

        return (
            <StyledTextSelectImageSettingsMenu
                theme={theme}
            >
                <ul>
                    <li>
                        <TextSelectImageButtonCheckmark
                            theme={theme}
                            toggle={this.toggleEditable}
                            text="Edit"
                            checked={toggledEditable}
                        />
                    </li>
                    <li>
                        <TextSelectImageButtonItem
                            theme={theme}
                            atClick={this.addText}
                            icon={AddTextIcon}
                            text="Add text"
                        />
                    </li>

                    <hr />

                    <li>
                        <TextSelectImageButtonItem
                            theme={theme}
                            atClick={this.about}
                            icon={AboutIcon}
                            text="About TSI"
                        />
                    </li>
                </ul>
            </StyledTextSelectImageSettingsMenu>
        );
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
