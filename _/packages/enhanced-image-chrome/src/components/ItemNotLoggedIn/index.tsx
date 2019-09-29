import React from 'react';

import {
    StyledItemNotLoggedIn,
} from './styled';

import ButtonInline from '../ButtonInline';
import CreateAccountButton from '../CreateAccountButton';



interface ItemNotLoggedInProps {
    theme: any;
    setShowLogin: any;
}


const ItemNotLoggedIn: React.FC<ItemNotLoggedInProps> = (props) => {
    const {
        theme,
        setShowLogin,
    } = props;

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
