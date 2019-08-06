import React, {
    useState,
    useEffect,
    useContext,
} from 'react';

import Context from '../../context';


import ButtonInline from '../../../components/ButtonInline';
import LoginView from '../../../components/LoginView';

import ItemExtensionOnOff from '../../../components/ItemExtensionOnOff';
import ItemNotLoggedIn from '../../../components/ItemNotLoggedIn';

import LoggedInView from '../../../components/LoggedInView';

import {
    StyledPopup,
    StyledPopupContainer,
    StyledPopupContainerItemsView,
    StyledViewOptionsButton,
} from './styled';

import {
    chromeStorage,
    deleteTypenames,
} from '../../../utils';



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

    const loginView = (
        <LoginView
            theme={theme}
            cancelLoginView={() => setShowLogin(false)}
            setLoggedInUser={setLoggedInUser}
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

    return (
        <StyledPopup
            theme={theme}
        >
            <StyledPopupContainer>
                {!showLogin && (
                    <StyledPopupContainerItemsView>
                        <ItemExtensionOnOff
                            theme={theme}
                            extensionOnOff={extensionOnOff}
                            setExtensionOnOff={() => setExtensionOnOff(!extensionOnOff)}
                        />

                        <div>
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
                                />
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
                )}

                {showLogin && (
                    <>
                        {loginView}
                    </>
                )}
            </StyledPopupContainer>
        </StyledPopup>
    );
}


export default Popup;
