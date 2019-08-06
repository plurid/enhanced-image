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
import Button from '../Button';



interface LoginViewProps {
    cancelLoginView: any;
    theme: any;
}


const LoginView: React.FC<LoginViewProps> = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggingMessage, setLoggingMessage] = useState('');

    const {
        cancelLoginView,
        theme,
    } = props;


    const login = () => {
        setLoggingMessage('could not login');
    }

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

            <div
                style={{width: '90%', margin: '0 auto'}}
            >
                <Button
                    theme={theme}
                    text="login"
                    atClick={login}
                    loadingText="logging in..."
                />
            </div>

            <div
                style={{display: 'flex', alignItems: 'center', height: '20px', justifyContent: 'space-around'}}
            >
                {!loggingMessage && (
                    <>
                        <ButtonInline
                            atClick={cancelLoginView}
                            theme={theme}
                        >
                            cancel
                        </ButtonInline>

                        <CreateAccountButton
                            theme={theme}
                        />
                    </>
                )}

                {loggingMessage && (
                    <div>
                        {loggingMessage}
                    </div>
                )}
            </div>
        </StyledLoginView>
    );
}


export default LoginView;
