import React from 'react';

import {
    PluridPureButton,
} from '@plurid/plurid-ui-react';

import { Theme } from '@plurid/plurid-themes';

import {
    StyledLoggedInView,
    StyledOptionsItemLeftRight,
} from './styled';

import TotalTransformations from '../TotalTransformations';
import ItemLoggedInAs from '../ItemLoggedInAs';
import ItemActivate from '../ItemActivate';
import Button from '../Button';

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

    console.log(theme);

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

            <div style={{width: '180px', margin: '0px auto', marginTop: '30px'}}>
                <a
                    href={PLURID_ACCOUNT_DOMAIN}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button
                        theme={theme}
                        text="Get More"
                        atClick={() => {}}
                    />
                    {/* <PluridPureButton
                        theme={theme}
                        text="Get More"
                        atClick={() => {}}
                    /> */}
                </a>
            </div>
        </StyledLoggedInView>
    );
}


export default LoggedInView;
