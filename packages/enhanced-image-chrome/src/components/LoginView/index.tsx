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

import client from '../../graphql/client';
import {
    LOGIN_BY_USERNAME,
    LOGIN_BY_EMAIL,
} from '../../graphql/mutate';
import {
    CURRENT_USER,
} from '../../graphql/query';



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


    const login = async () => {
        const mutate = await client.mutate({
            mutation: LOGIN_BY_USERNAME,
            variables: {
                username,
                password,
            }
        });

        const query = await client.query({
            query: CURRENT_USER,
        });

        console.log(mutate);
        console.log(query);
        // chrome.cookies.getAll({}, cookies => console.log(JSON.stringify(cookies)));
        // chrome.cookies.get({url: 'http://localhost:33600', name: 'token'}, (cookie: any) => {console.log(cookie)});
        // setLoggingMessage('could not login');
    }

    return (
        <StyledLoginView>
            <StyledLoginInput>
                <InputText
                    theme={theme}
                    value={username}
                    placeholder="username or email"
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
