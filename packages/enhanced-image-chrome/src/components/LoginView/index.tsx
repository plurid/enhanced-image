import React, {
    useState,
} from 'react';

import {
    StyledLoginView,
    StyledLoginInput,
} from './styled';

import ButtonInline from '../ButtonInline';
import CreateAccountButton from '../CreateAccountButton';
import InputText from '../InputText';



interface LoginViewProps {
    cancelLoginView: any;
    theme: any;
}


const LoginView: React.FC<LoginViewProps> = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {
        cancelLoginView,
        theme,
    } = props;

    return (
        <StyledLoginView>
            <StyledLoginInput>
                <InputText
                    theme={theme}
                    value={username}
                    placeholder="username"
                    atChange={(event: any) => setUsername(event.target.value)}
                />
            </StyledLoginInput>

            <StyledLoginInput>
                <InputText
                    theme={theme}
                    value={password}
                    placeholder="password"
                    password={true}
                    atChange={(event: any) => setPassword(event.target.value)}
                />
            </StyledLoginInput>

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
