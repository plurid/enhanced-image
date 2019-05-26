import React, { Component } from 'react';

import SettingsIcon from '../../assets/settings-icon';

import {
    StyledEnhancedImageSettings,
    StyledEnhancedImageSettingsButton,
} from './styled';

import Context from '../../context';

import EnhancedImageSettingsMenu from '../EnhancedImageSettingsMenu';



class EnhancedImageSettings extends Component<any, any> {
    static contextType = Context;

    public render() {
        const {
            theme,
            toggleSettings,
            toggledSettings,
        } = this.context;

        return (
            <StyledEnhancedImageSettings
                theme={theme}
            >
                <StyledEnhancedImageSettingsButton
                    onClick={toggleSettings}
                >
                    {SettingsIcon}
                </StyledEnhancedImageSettingsButton>

                {toggledSettings && (
                    <EnhancedImageSettingsMenu
                    />
                )}
            </StyledEnhancedImageSettings>
        );
    }
}


export default EnhancedImageSettings;
