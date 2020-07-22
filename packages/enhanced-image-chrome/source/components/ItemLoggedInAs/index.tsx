import React, {
    useState,
} from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import ButtonInline from '../ButtonInline';

import {
    StyledItemLoggedInAs,
} from './styled';



export interface ItemLoggedInAsProperties {
    theme: Theme;
    identonym: string;
    logout: any;
}

const ItemLoggedInAs: React.FC<ItemLoggedInAsProperties> = (
    properties,
) => {
    /** properties */
    const {
        theme,
        identonym,
        logout,
    } = properties;


    /** state */
    const [
        mouseOver,
        setMouseOver,
    ] = useState(false);


    /** render */
    return (
        <StyledItemLoggedInAs
            theme={theme}
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
            onMouseMove={() => {!mouseOver ? setMouseOver(true) : null}}
        >
            <div>
                logged in as
            </div>

            {!mouseOver
            ? (
                <div>
                    {identonym}
                </div>
            ) : (
                <ButtonInline
                    theme={theme}
                    atClick={logout}
                >
                    logout
                </ButtonInline>
            )}
        </StyledItemLoggedInAs>
    );
}


export default ItemLoggedInAs;
