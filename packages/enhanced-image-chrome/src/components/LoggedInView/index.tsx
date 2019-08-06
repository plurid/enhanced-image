import React from 'react';

import {
    StyledLoggedInView,
    StyledOptionsItemLeftRight,
} from './styled';

import Button from '../Button';
import TotalTransformations from '../TotalTransformations';



interface LoggedInViewProps {
    theme: any;
    user: any;
}


const LoggedInView: React.FC<LoggedInViewProps> = (props) => {
    const {
        theme,
        user,
    } = props;

    const {
        depict,
    } = user.products;

    return (
        <StyledLoggedInView
            theme={theme}
        >
            <StyledOptionsItemLeftRight>
                <div>
                    logged in as
                </div>

                <div>
                    {user.username}
                </div>
            </StyledOptionsItemLeftRight>

            <StyledOptionsItemLeftRight>
                <div>
                    ingress
                </div>

                <div>
                    {depict.access.ingress.active ? 'active' : 'not active'}
                </div>
            </StyledOptionsItemLeftRight>

            <StyledOptionsItemLeftRight>
                <div>
                    subscription
                </div>

                <div>
                    {depict.access.subscription.active ? 'active' : 'not active'}
                </div>
            </StyledOptionsItemLeftRight>

            <StyledOptionsItemLeftRight>
                <div>
                    transformations
                </div>

                <div style={{textAlign: 'right'}}>
                    <TotalTransformations
                        imageTransformations={depict.access.imageTransformations}
                    />
                </div>
            </StyledOptionsItemLeftRight>

            <div style={{width: '50%', margin: '0px auto', marginTop: '10px'}}>
                <a
                    href="https://account.plurid.com/depict"
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
