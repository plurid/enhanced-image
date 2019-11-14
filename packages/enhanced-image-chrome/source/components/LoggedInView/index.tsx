import React from 'react';

import { Theme } from '@plurid/plurid-themes';

import {
    PluridPureButton,
} from '@plurid/plurid-ui-react';

import {
    StyledLoggedInView,
    StyledOptionsItemLeftRight,
    StyledGetMore,
} from './styled';

import TotalTransformations from '../TotalTransformations';
import ItemLoggedInAs from '../ItemLoggedInAs';
import ItemActivate from '../ItemActivate';

import { PLURID_ACCOUNT_DOMAIN } from '../../data/constants';



interface LoggedInViewProps {
    theme: Theme;
    user: any;
    logout: any;
}


const LoggedInView: React.FC<LoggedInViewProps> = (props) => {
    const {
        theme,
        user,
        logout,
    } = props;

    const {
        depict,
    } = user.products;

    return (
        <StyledLoggedInView
            theme={theme}
        >
            <ItemLoggedInAs
                theme={theme}
                username={user.username}
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
                    transformations
                </div>

                <div style={{textAlign: 'right'}}>
                    <TotalTransformations
                        theme={theme}
                        imageTransformations={depict.access.imageTransformations}
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
