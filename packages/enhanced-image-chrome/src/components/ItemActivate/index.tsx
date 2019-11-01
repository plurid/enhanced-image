import React, {
    useState,
} from 'react';

import {
    StyledItemLoggedInAs,
} from './styled';

import ButtonInline from '../ButtonInline';

import { PLURID_ACCOUNT_DOMAIN } from '../../data/constants';



interface ItemLoggedInAsProps {
    theme: any;
    active: boolean;
    type: string;
}


const ItemLoggedInAs: React.FC<ItemLoggedInAsProps> = (props) => {
    const [mouseOver, setMouseOver] = useState(false);

    const {
        theme,
        active,
        type,
    } = props;

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
