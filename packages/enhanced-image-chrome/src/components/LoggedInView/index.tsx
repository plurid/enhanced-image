import React from 'react';

import {
    StyledLoggedInView,
    StyledOptionsItemLeftRight,
} from './styled';

import Button from '../Button';
import TotalTransformations from '../TotalTransformations';
import ItemLoggedInAs from '../ItemLoggedInAs';
import ItemActivate from '../ItemActivate';

import { PLURID_ACCOUNT_DOMAIN } from '../../constants';



interface LoggedInViewProps {
    theme: any;
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

            <div style={{width: '50%', margin: '0px auto', marginTop: '30px'}}>
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
                </a>
            </div>
        </StyledLoggedInView>
    );
}


export default LoggedInView;
