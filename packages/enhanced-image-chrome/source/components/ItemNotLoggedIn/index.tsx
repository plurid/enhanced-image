import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import ButtonInline from '../ButtonInline';
import CreateAccountButton from '../CreateAccountButton';

import {
    StyledItemNotLoggedIn,
} from './styled';



export interface ItemNotLoggedInProperties {
    theme: Theme;
    setShowLogin: any;
}

const ItemNotLoggedIn: React.FC<ItemNotLoggedInProperties> = (
    properties,
) => {
    /** properties */
    const {
        theme,
        setShowLogin,
    } = properties;


    /** render */
    return (
        <StyledItemNotLoggedIn
            theme={theme}
        >
            <ButtonInline
                atClick={setShowLogin}
                theme={theme}
            >
                login
            </ButtonInline>

            <CreateAccountButton
                theme={theme}
            />
        </StyledItemNotLoggedIn>
    );
}


export default ItemNotLoggedIn;
