import React, {
    useState,
} from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import ButtonInline from '../ButtonInline';

import {
    PLURID_ACCOUNT_DOMAIN,
} from '../../data/constants';

import {
    StyledItemLoggedInAs,
} from './styled';



export interface ItemLoggedInAsProperties {
    theme: Theme;
    active: boolean;
    type: string;
}

const ItemLoggedInAs: React.FC<ItemLoggedInAsProperties> = (
    properties,
) => {
    /** properties */
    const {
        theme,
        active,
        type,
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
                {type}
            </div>

            {(!mouseOver || active)
            ? (
                <div>
                    {active ? 'active' : 'not active'}
                </div>
            ) : (
                <a
                    href={PLURID_ACCOUNT_DOMAIN}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <ButtonInline
                        theme={theme}
                        atClick={() => {}}
                    >
                        activate
                    </ButtonInline>
                </a>
            )}
        </StyledItemLoggedInAs>
    );
}


export default ItemLoggedInAs;
