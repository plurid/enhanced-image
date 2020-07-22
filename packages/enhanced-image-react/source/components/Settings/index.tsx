/** [START] imports */
/** libraries */
import React, {
    useContext,
} from 'react';


/** external */
import SettingsIcon from '../../assets/icons/settings';

import {
    Context
} from '../../services/utilities';


/** internal */
import SettingsMenu from './components/SettingsMenu';

import {
    StyledSettings,
    StyledSettingsButton,
} from './styled';
/** [END] imports */



/** [START] component */
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
/** [END] component */
