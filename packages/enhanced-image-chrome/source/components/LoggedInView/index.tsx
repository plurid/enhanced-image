import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridPureButton,
} from '@plurid/plurid-ui-react';

import {
    StyledLoggedInView,
    StyledOptionsItemLeftRight,
    StyledGetMore,
} from './styled';

import TotalEnhances from '../TotalEnhances';
import ItemLoggedInAs from '../ItemLoggedInAs';
import ItemActivate from '../ItemActivate';

import {
    PLURID_ACCOUNT_DOMAIN,
} from '../../data/constants';



export interface LoggedInViewProps {
    theme: Theme;
    owner: any;
    logout: any;
}

const LoggedInView: React.FC<LoggedInViewProps> = (
    properties,
) => {
    /** properties */
    const {
        theme,
        owner,
        logout,
    } = properties;

    const {
        depict,
    } = owner.products;


    /** render */
    return (
        <StyledLoggedInView
            theme={theme}
        >
            <ItemLoggedInAs
                theme={theme}
                identonym={owner.identonym}
                logout={logout}
            />

            <ItemActivate
                theme={theme}
                type="ingress"
                active={depict.access.ingress.active}
            />

            <ItemActivate
                theme={theme}
                type="subscription"
                active={depict.access.subscription.active}
            />

            <StyledOptionsItemLeftRight>
                <div>
                    enhances
                </div>

                <div style={{textAlign: 'right'}}>
                    <TotalEnhances
                        theme={theme}
                        imageEnhances={depict.access.imageEnhances}
                    />
                </div>
            </StyledOptionsItemLeftRight>

            <StyledGetMore
                theme={theme}
            >
                <a
                    href={PLURID_ACCOUNT_DOMAIN}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <PluridPureButton
                        theme={theme}
                        text="Get More"
                        atClick={() => {}}
                        level={1}
                    />
                </a>
            </StyledGetMore>
        </StyledLoggedInView>
    );
}


export default LoggedInView;
