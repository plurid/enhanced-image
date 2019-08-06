import React, {
    useContext,
} from 'react';

import Context from '../../context';

import Dropdown from '../../../components/Dropdown';
import ButtonCheckmark from '../../../components/ButtonCheckmark';

import {
    StyledOptions,
    StyledOptionsContainer,
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
        <StyledOptions
            theme={theme}
        >
            <StyledOptionsContainer>
                <div style={{ width: '250px'}}>
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
                </div>
            </StyledOptionsContainer>
        </StyledOptions>
    );
}


export default Options;
