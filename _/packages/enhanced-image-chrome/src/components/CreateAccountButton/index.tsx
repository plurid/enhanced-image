import React from 'react';

import {
    StyledCreateAccountButton,
} from './styled';

import ButtonInline from '../ButtonInline';

import ExternalLinkIcon from '../../assets/buttons/external-link-icon';



interface CreateAccountButtonProps {
    theme: any;
}

const PLURID_ACCOUNT_DOMAIN = 'https://account.plurid.com';

const CreateAccountButton: React.FC<CreateAccountButtonProps> = (props) => {
    const {
        theme,
    } = props;

    return (
        <StyledCreateAccountButton>
            <a
                href={PLURID_ACCOUNT_DOMAIN}
                target="_blank"
                rel="noopener noreferrer"
                style={{outline: 'none'}}
            >
                <ButtonInline
                    atClick={() => {}}
                    theme={theme}
                    styles={{display: 'flex', alignItems: 'center'}}
                >
                    <div>
                        create account
                    </div>

                    <div
                        style={{display: 'flex', alignItems: 'center'}}
                    >
                        {ExternalLinkIcon}
                    </div>
                </ButtonInline>
            </a>
        </StyledCreateAccountButton>
    );
}


export default CreateAccountButton;
