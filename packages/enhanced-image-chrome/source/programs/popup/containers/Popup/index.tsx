import React, {
    useState,
    useEffect,
    useContext,
} from 'react';

import {
    graphql,
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
    CURRENT_OWNER,
} from '../../../../services/graphql/query';
import {
    LOGOUT,
} from '../../../../services/graphql/mutate';



const Popup: React.FC<any> = (properties) => {
    const [extensionOnOff, setExtensionOnOff] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [owner, setOwner] = useState(undefined);

    const context: any = useContext(Context);
    const {
        theme,
    } = context;

    const openOptions = () => {
        chrome.runtime.openOptionsPage();
    }

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
                mutation: LOGOUT,
            });
        } catch (err) {
        }
    }

    useEffect(() => {
        const fetchOwner = async () => {
            try {
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
