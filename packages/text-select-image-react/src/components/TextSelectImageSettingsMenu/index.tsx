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
    public render() {
        const {
            editable,
            toggleEditable,
        } = this.props;

        return (
            <Context.Consumer>
                {context => {
                    const {
                        theme,
                        // editable,
                        // toggleEditable,
                    } = context;

                    return (
                        <StyledTextSelectImageSettingsMenu
                            theme={theme}
                        >
                            <ul>
                                <li>
                                    <TextSelectImageButtonCheckmark
                                        toggle={toggleEditable}
                                        text="Edit"
                                        checked={editable}
                                        theme={theme}
                                    />
                                </li>
                                <li>
                                    <TextSelectImageButtonItem
                                        atClick={this.add}
                                        icon={AddTextIcon}
                                        text="Add text"
                                        theme={theme}
                                    />
                                </li>

                                <hr />

                                <li>
                                    <TextSelectImageButtonItem
                                        atClick={this.about}
                                        icon={AboutIcon}
                                        text="About TSI"
                                        theme={theme}
                                    />
                                </li>
                            </ul>
                        </StyledTextSelectImageSettingsMenu>
                    );
                }}
            </Context.Consumer>
        );
    }

    private add = () => {
        const {
            toggleMenu,
            addText,
        } = this.props;

        toggleMenu();
        addText();
    }

    private about = () => {
        const aboutURL = ABOUT_URL;
        window.open(aboutURL, '_blank');
    }
}


export default TextSelectImageSettingsMenu;
