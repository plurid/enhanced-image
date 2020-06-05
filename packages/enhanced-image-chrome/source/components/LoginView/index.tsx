import React, {
    useState,
    useEffect,
} from 'react';

import {
    PluridPureButton,
} from '@plurid/plurid-ui-react';

import { Theme } from '@plurid/plurid-themes';

import {
    StyledLoginView,
    StyledLoginInput,
} from './styled';

import ButtonInline from '../ButtonInline';
import CreateAccountButton from '../CreateAccountButton';
import InputText from '../InputText';

import client from '../../services/graphql/client';
import {
    LOGIN_BY_IDENTONYM,
    LOGIN_BY_EMAIL,
} from '../../services/graphql/mutate';
import {
    CURRENT_OWNER,
} from '../../services/graphql/query';



interface LoginViewProps {
    theme: Theme;
    cancelLoginView: () => void;
    setLoggedInOwner: (owner: any) => any;
    setOwnerToken: (token: string) => void;
    setRefreshOwnerToken: (refreshToken: string) => void;
}


const isEmail = (value: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}


const LoginView: React.FC<LoginViewProps> = (props) => {
    const [identonym, setIdentonym] = useState('');
    const [password, setPassword] = useState('');
    const [showLoginButton, setShowLoginButton] = useState(false);
    const [loginWithEmail, setLoginWithEmail] = useState(false);
    const [loggingMessage, setLoggingMessage] = useState('');
    const [loadingButton, setLoadingButton] = useState(false);

    const {
        theme,
        cancelLoginView,
        setLoggedInOwner,
        setOwnerToken,
        setRefreshOwnerToken,
    } = props;

    useEffect(() => {
        if (identonym.length !== 0 && password.length !==0) {
            setShowLoginButton(true);
        } else {
            setShowLoginButton(false);
        }

        if (isEmail(identonym)) {
            setLoginWithEmail(true);
        } else {
            setLoginWithEmail(false);
        }
    }, [identonym, password]);

    const login = async () => {
        try {
            setLoadingButton(true);

            if (loginWithEmail) {
                const input = {
                    email: identonym,
                    password,
                };

                const mutate = await client.mutate({
                    mutation: LOGIN_BY_EMAIL,
                    variables: {
                        input,
                    },
                });

                const response = mutate.data.loginByEmail;
                setLoadingButton(false);

                if (!response.status) {
                    setLoggingMessage('could not login. try again');
                    setTimeout(() => {
                        setLoggingMessage('');
                    }, 2000);
                    return;
                }

                const {
                    data,
                } = response;

                const {
                    owner,
                    tokens,
                } = data;

                if (owner.products.depict !== null) {
                    setLoggedInOwner(owner);
                    setOwnerToken(tokens.access);
                    setRefreshOwnerToken(tokens.refresh);
                    cancelLoginView();
                    return;
                }
            }

            const input = {
                identonym,
                password,
            };

            const mutate = await client.mutate({
                mutation: LOGIN_BY_IDENTONYM,
                variables: {
                    input,
                },
            });

            const response = mutate.data.loginByIdentonym;
            console.log('response', response);
            setLoadingButton(false);

            if (!response.status) {
                setLoggingMessage('could not login. try again.');
                setTimeout(() => {
                    setLoggingMessage('');
                }, 2000);
                return;
            }

            const {
                data,
            } = response;

            const {
                owner,
                tokens,
            } = data;

            if (owner.products.depict !== null) {
                setLoggedInOwner(owner);
                setOwnerToken(tokens.access);
                setRefreshOwnerToken(tokens.refresh);
                cancelLoginView();
            }
        } catch (error) {
            console.log(error);
            setLoadingButton(false);
            setLoggingMessage('could not login. try again.');
            setTimeout(() => {
                setLoggingMessage('');
            }, 2000);
            return;
        }
    }

    return (
        <StyledLoginView>
            <StyledLoginInput>
                <InputText
                    theme={theme}
                    value={identonym}
                    placeholder="identonym or email"
                    atChange={(event: any) => setIdentonym(event.target.value)}
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
                style={{height: '40px', width: '90%', margin: '0 auto', marginBottom: '20px'}}
            >
                {showLoginButton && (
                    <PluridPureButton
                        theme={theme}
                        text={loginWithEmail ? 'Login with Email' : 'Login'}
                        atClick={login}
                        loading={loadingButton}
                        level={1}
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
