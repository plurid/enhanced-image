import React, {
    useContext,
} from 'react';

import Context from '../../context';

import Dropdown from '../../components/Dropdown';

import {
    StyledOptions,
    StyledOptionsItemLeftRight,
} from './styled';

import themes from '@plurid/apps.utilities.themes';



const Options: React.FC<any> = (properties) => {
    const context: any = useContext(Context);

    const {
        theme,
        setTheme,
    } = context;

    // chrome.runtime.sendMessage({greeting: "hello"}, function(response: any) {
    //     console.log(response.farewell);
    // });

    return (
        <StyledOptions>
            <h1>
                Options
            </h1>

            <StyledOptionsItemLeftRight>
                <div>
                    theme
                </div>

                <Dropdown
                    theme={theme}
                    selected={theme.name}
                    items={Object.keys(themes)}
                    onSelect={setTheme}
                />
            </StyledOptionsItemLeftRight>
        </StyledOptions>
    );
}


export default Options;
