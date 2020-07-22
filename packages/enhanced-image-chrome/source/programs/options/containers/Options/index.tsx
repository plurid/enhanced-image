import React, {
    useState,
    useContext,
    useEffect,
} from 'react';

import themes from '@plurid/plurid-themes';

import {
    graphql,
} from '@plurid/plurid-functions';

import Context from '../../context';

import LoginView from '../../../../components/LoginView';
import Dropdown from '../../../../components/Dropdown';
import ItemExtensionOnOff from '../../../../components/ItemExtensionOnOff';
import ItemNotLoggedIn from '../../../../components/ItemNotLoggedIn';
import ButtonCheckmark from '../../../../components/ButtonCheckmark';

import LoggedInView from '../../../../components/LoggedInView';

import {
    StyledOptions,
    StyledOptionsContainer,
    StyledOptionsWrapper,
    StyledOptionsItemLeftRight,
    StyledStateContainer,
    StyledUIContainer,
} from './styled';

import {
    chromeStorage,
} from '../../../../services/utilities';

import client from '../../../../services/graphql/client';
import {
    CURRENT_OWNER,
} from '../../../../services/graphql/query';
import {
    LOGOUT,
} from '../../../../services/graphql/mutate';



export interface OptionsProperties {
}

const Options: React.FC<OptionsProperties> = () => {
    const context: any = useContext(Context);
    const {
        theme,
        setTheme,
    } = context;

    const [extensionOnOff, setExtensionOnOff] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [owner, setOwner] = useState(undefined);

    const [getImageTextAtLoad, setGetImageTextAtLoad] = useState(false);
    const [transparentUI, setTransparentUI] = useState(true);

    const handleLoggedInOwner = (owner: any) => {
        setOwner(owner);
        setLoggedIn(true);
    }

    const setLoggedInOwner = async (_owner: any) => {
        const owner = graphql.deleteTypenames(_owner);
        handleLoggedInOwner(owner);
        await chromeStorage.set({owner});
    }

    const setOwnerToken = async (token: string) => {
        await chromeStorage.set({token});
    }

    const setRefreshOwnerToken = async (refreshToken: string) => {
        await chromeStorage.set({refreshToken});
    }

    const loginView = (
        <LoginView
            theme={theme}
            cancelLoginView={() => setShowLogin(false)}
            setLoggedInOwner={setLoggedInOwner}
            setOwnerToken={setOwnerToken}
            setRefreshOwnerToken={setRefreshOwnerToken}
        />
    );

    useEffect(() => {
        const getExtensionState = async () => {
            const { extensionOn } = await chromeStorage.get('extensionOn');
            setExtensionOnOff(!!extensionOn);
        }

        const getCurrentOwner = async () => {
            const { owner } = await chromeStorage.get('owner');
            if (owner) {
                handleLoggedInOwner(owner);
            }
        }

        getExtensionState();
        getCurrentOwner();
    }, []);

    useEffect(() => {
        const setExtensionState = async () => {
            await chromeStorage.set({extensionOn: extensionOnOff});
        }
        setExtensionState();
    }, [extensionOnOff]);

    const logout = async () => {
        setLoggedIn(false);
        setOwner(undefined);

        try {
            await chromeStorage.remove('owner');

            await client.mutate({
                mutation: LOGOUT
            });
        } catch (err) {
        }
    }

    useEffect(() => {
        const saveOptions = async () => {
            const { options } = await chromeStorage.get('options');
            const {
                getImageTextAtLoad,
                transparentUI,
            } = options;

            setGetImageTextAtLoad(getImageTextAtLoad);
            setTransparentUI(transparentUI);
        }
        saveOptions();
    }, []);

    useEffect(() => {
        const saveOptions = async () => {
            const options = {
                getImageTextAtLoad,
                transparentUI,
            };
            // console.log('saved options', options);
            await chromeStorage.set({options});
        }
        saveOptions();
    }, [
        getImageTextAtLoad,
        transparentUI,
    ]);

    useEffect(() => {
        const fetchOwner = async () => {
            try {
                const { token } = await chromeStorage.get('token');

                if (!token) {
                    return;
                }

                const query = await client.query({
                    query: CURRENT_OWNER,
                });
                const response = query.data.currentOwner;

                if (response.status) {
                    setLoggedInOwner(response.data);
                }
            } catch (error) {
                return;
            }
        }

        fetchOwner();
    }, []);

    return (
        <StyledOptions
            theme={theme}
        >
            <StyledOptionsContainer>
                <StyledOptionsWrapper>
                    <StyledStateContainer>
                        <h1>
                            state
                        </h1>

                        <ItemExtensionOnOff
                            theme={theme}
                            extensionOnOff={extensionOnOff}
                            setExtensionOnOff={() => setExtensionOnOff(!extensionOnOff)}
                        />

                        <div
                            style={{display: 'grid', alignItems: 'center'}}
                        >
                            {!showLogin && (
                                <>
                                    {!loggedIn && (
                                        <ItemNotLoggedIn
                                            theme={theme}
                                            setShowLogin={() => setShowLogin(true)}
                                        />
                                    )}

                                    {loggedIn &&(
                                        <LoggedInView
                                            theme={theme}
                                            owner={owner}
                                            logout={logout}
                                        />
                                    )}
                                </>
                            )}

                            {showLogin && (
                                <>
                                    {loginView}
                                </>
                            )}
                        </div>
                    </StyledStateContainer>

                    <StyledUIContainer>
                        <h1>
                            interface
                        </h1>

                        <StyledOptionsItemLeftRight>
                            <div>
                                theme
                            </div>

                            <Dropdown
                                theme={theme}
                                selected={theme.name}
                                items={Object.keys(themes)}
                                onSelect={setTheme}
                            />
                        </StyledOptionsItemLeftRight>

                        <div
                            style={{
                                margin: '20px 0'
                            }}
                        >
                            <ButtonCheckmark
                                checked={getImageTextAtLoad}
                                text="get image text at load"
                                theme={theme}
                                toggle={() => setGetImageTextAtLoad(!getImageTextAtLoad)}
                            />
                        </div>

                        <div
                            style={{
                                margin: '20px 0'
                            }}
                        >
                            <ButtonCheckmark
                                checked={transparentUI}
                                text="transparent UI"
                                theme={theme}
                                toggle={() => setTransparentUI((transparent: boolean) => !transparent)}
                            />
                        </div>
                    </StyledUIContainer>
                </StyledOptionsWrapper>
            </StyledOptionsContainer>
        </StyledOptions>
    );
}


export default Options;
