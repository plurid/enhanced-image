import React, { Component } from 'react';

import settingsIcon from '../../assets/settings-icon.svg';

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
                                <img src={settingsIcon} height={30} />
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
