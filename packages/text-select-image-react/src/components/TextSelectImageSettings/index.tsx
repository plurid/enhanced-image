import React, { Component } from 'react';

import SettingsIcon from '../../assets/settings-icon';

import {
    StyledTextSelectImageSettings,
    StyledTextSelectImageSettingsButton,
} from './styled';

import Context from '../../context';

import TextSelectImageSettingsMenu from '../TextSelectImageSettingsMenu';



class TextSelectImageSettings extends Component<any, any> {
    public render() {
        return (
            <Context.Consumer>
                {context => {
                    const {
                        theme,
                        toggleSettings,
                        toggledSettings,
                    } = context;

                    return (
                        <StyledTextSelectImageSettings
                            theme={theme}
                        >
                            <StyledTextSelectImageSettingsButton
                                onClick={toggleSettings}
                            >
                                {SettingsIcon}
                            </StyledTextSelectImageSettingsButton>

                            {toggledSettings && (
                                <TextSelectImageSettingsMenu
                                />
                            )}
                        </StyledTextSelectImageSettings>
                    )
                }}
            </Context.Consumer>
        );
    }
}


export default TextSelectImageSettings;
