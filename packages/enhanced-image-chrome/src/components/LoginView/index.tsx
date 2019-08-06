import React, {
    useState,
    useEffect,
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
    theme: any;
    cancelLoginView: () => void;
    setLoggedInUser: (user: any) => any;
}


const isEmail = (value: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}


const LoginView: React.FC<LoginViewProps> = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showLoginButton, setShowLoginButton] = useState(false);
    const [loginWithEmail, setLoginWithEmail] = useState(false);
    const [loggingMessage, setLoggingMessage] = useState('');
    const [loadingButton, setLoadingButton] = useState(false);

    const {
        theme,
        cancelLoginView,
        setLoggedInUser,
    } = props;

    useEffect(() => {
        if (username.length !== 0 && password.length !==0) {
            setShowLoginButton(true);
        } else {
            setShowLoginButton(false);
        }

        if (isEmail(username)) {
            setLoginWithEmail(true);
        } else {
            setLoginWithEmail(false);
        }
    }, [username, password]);

    const login = async () => {
        setLoadingButton(true);
        if (loginWithEmail) {
            const mutate = await client.mutate({
                mutation: LOGIN_BY_EMAIL,
                variables: {
                    email: username,
                    password,
                }
            });
            console.log('login with email', mutate);

            const data = mutate.data.loginByEmail;
            setLoadingButton(false);

            if (!data.status) {
                setLoggingMessage('could not login');
                setTimeout(() => {
                    setLoggingMessage('');
                }, 2000);
                return;
            }

            setLoggedInUser(data.user);
            cancelLoginView();
        }

        const mutate = await client.mutate({
            mutation: LOGIN_BY_USERNAME,
            variables: {
                username,
                password,
            }
        });
        console.log('login with username', mutate);

        const data = mutate.data.loginByUsername;
        setLoadingButton(false);

        if (!data.status) {
            setLoggingMessage('could not login');
            setTimeout(() => {
                setLoggingMessage('');
            }, 2000);
            return;
        }

        setLoggedInUser(data.user);
        cancelLoginView();
        return;

        // const query = await client.query({
        //     query: CURRENT_USER,
        // });

        // console.log(query);

        // chrome.cookies.getAll({}, cookies => console.log(JSON.stringify(cookies)));
        // chrome.cookies.get({url: 'http://localhost:33600', name: 'token'}, (cookie: any) => {console.log(cookie)});
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
                style={{height: '40px', width: '90%', margin: '0 auto'}}
            >
                {showLoginButton && (
                    <Button
                        theme={theme}
                        text={loginWithEmail ? 'Login with Email' : 'Login'}
                        atClick={login}
                        loading={loadingButton}
                        loadingText="Logging in..."
                    />
                )}
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
