import React, {
    useState,
    useEffect,
    useContext,
} from 'react';

import {
    deleteTypenames,
} from '@plurid/plurid-functions';

import Context from '../../context';

import ButtonInline from '../../../../components/ButtonInline';
import LoginView from '../../../../components/LoginView';

import ItemExtensionOnOff from '../../../../components/ItemExtensionOnOff';
import ItemNotLoggedIn from '../../../../components/ItemNotLoggedIn';

import LoggedInView from '../../../../components/LoggedInView';

import {
    StyledPopup,
    StyledPopupContainer,
    StyledPopupContainerItemsView,
    StyledViewOptionsButton,
} from './styled';

import {
    chromeStorage,
} from '../../../../services/utilities';

import client from '../../../../services/graphql/client';
import {
    CURRENT_USER,
} from '../../../../services/graphql/query';
import {
    LOGOUT,
} from '../../../../services/graphql/mutate';



const Popup: React.FC<any> = (properties) => {
    const [extensionOnOff, setExtensionOnOff] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [user, setUser] = useState(undefined);

    const context: any = useContext(Context);
    const {
        theme,
    } = context;

    const openOptions = () => {
        chrome.runtime.openOptionsPage();
    }

    const handleLoggedInUser = (user: any) => {
        setUser(user);
        setLoggedIn(true);
    }

    const setLoggedInUser = async (_user: any) => {
        const user = deleteTypenames(_user);
        handleLoggedInUser(user);
        await chromeStorage.set({user});
    }

    const setUserToken = async (token: string) => {
        await chromeStorage.set({token});
    }

    const setRefreshUserToken = async (refreshToken: string) => {
        await chromeStorage.set({refreshToken});
    }

    const loginView = (
        <LoginView
            theme={theme}
            cancelLoginView={() => setShowLogin(false)}
            setLoggedInUser={setLoggedInUser}
            setUserToken={setUserToken}
            setRefreshUserToken={setRefreshUserToken}
        />
    );

    useEffect(() => {
        const getExtensionState = async () => {
            const { extensionOn } = await chromeStorage.get('extensionOn');
            setExtensionOnOff(!!extensionOn);
        }

        const getCurrentUser = async () => {
            const { user } = await chromeStorage.get('user');
            if (user) {
                handleLoggedInUser(user);
            }
        }

        getExtensionState();
        getCurrentUser();
    }, []);

    useEffect(() => {
        const setExtensionState = async () => {
            await chromeStorage.set({extensionOn: extensionOnOff});
        }
        setExtensionState();
    }, [extensionOnOff]);

    const logout = async () => {
        setLoggedIn(false);
        setUser(undefined);

        try {
            await chromeStorage.remove('user');

            await client.mutate({
                mutation: LOGOUT,
            });
        } catch (err) {
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            const query = await client.query({
                query: CURRENT_USER,
            });
            const response = query.data.currentUser;
            if (response.status) {
                console.log(response);
                setLoggedInUser(response.data);
            }
        }

        fetchUser();
    });

    return (
        <StyledPopup
            theme={theme}
        >
            <StyledPopupContainer>
                <StyledPopupContainerItemsView>
                    <ItemExtensionOnOff
                        theme={theme}
                        extensionOnOff={extensionOnOff}
                        setExtensionOnOff={() => setExtensionOnOff(!extensionOnOff)}
                    />

                    <div>
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
                                        user={user}
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

                    <StyledViewOptionsButton>
                        <ButtonInline
                            theme={theme}
                            atClick={openOptions}
                        >
                            view options
                        </ButtonInline>
                    </StyledViewOptionsButton>
                </StyledPopupContainerItemsView>
            </StyledPopupContainer>
        </StyledPopup>
    );
}


export default Popup;
