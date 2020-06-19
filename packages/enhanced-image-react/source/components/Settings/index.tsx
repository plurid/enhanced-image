import React, {
    useContext,
} from 'react';

import {
    StyledSettings,
    StyledSettingsButton,
} from './styled';

import Context from '../../services/utilities/context';

import SettingsIcon from '../../assets/icons/settings';

import SettingsMenu from './components/SettingsMenu';



const Settings: React.FC<any> = () => {
    /** context */
    const context = useContext(Context);
    if (!context) {
        return (<></>);
    }

    const {
        theme,

        showSettingsMenu,
        setShowSettingsMenu,
    } = context;


    /** render */
    return (
        <StyledSettings
            theme={theme}
        >
            <StyledSettingsButton
                theme={theme}
                onClick={() => setShowSettingsMenu(show => !show)}
            >
                {SettingsIcon}
            </StyledSettingsButton>

            {showSettingsMenu && (
                <SettingsMenu />
            )}
        </StyledSettings>
    );
}


export default Settings;
