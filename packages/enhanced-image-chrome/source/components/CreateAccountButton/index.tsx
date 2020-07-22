import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import ButtonInline from '../ButtonInline';

import ExternalLinkIcon from '../../assets/buttons/external-link-icon';

import {
    StyledCreateAccountButton,
} from './styled';



const PLURID_ACCOUNT_DOMAIN = 'https://account.plurid.com';


export interface CreateAccountButtonProps {
    theme: Theme;
}

const CreateAccountButton: React.FC<CreateAccountButtonProps> = (
    properties,
) => {
    /** properties */
    const {
        theme,
    } = properties;


    /** render */
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
                        generate account
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
