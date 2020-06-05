import React, {
    useState,
} from 'react';

import {
    StyledItemLoggedInAs,
} from './styled';

import ButtonInline from '../ButtonInline';



interface ItemLoggedInAsProps {
    theme: any;
    identonym: string;
    logout: any;
}

const ItemLoggedInAs: React.FC<ItemLoggedInAsProps> = (
    props,
) => {
    const [mouseOver, setMouseOver] = useState(false);

    const {
        theme,
        identonym,
        logout,
    } = props;

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
