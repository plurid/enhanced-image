import React from 'react';

import {
    StyledLoginView,
} from './styled';

import ButtonInline from '../ButtonInline';
import CreateAccountButton from '../CreateAccountButton';



interface LoginViewProps {
    cancelLoginView: any;
    theme: any;
}


const LoginView: React.FC<LoginViewProps> = (props) => {
    const {
        cancelLoginView,
        theme,
    } = props;

    return (
        <StyledLoginView>
            <div>
                username
            </div>

            <div>
                password
            </div>

            <div>
                login
            </div>

            <div
                style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}
            >
                <ButtonInline
                    atClick={cancelLoginView}
                    theme={theme}
                >
                    cancel
                </ButtonInline>

                <CreateAccountButton
                    theme={theme}
                />
            </div>
        </StyledLoginView>
    );
}


export default LoginView;
