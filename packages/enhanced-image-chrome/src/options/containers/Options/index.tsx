import React, {
    useState,
    useContext,
    useEffect,
} from 'react';
import themes from '@plurid/apps.utilities.themes';

import Context from '../../context';

import LoginView from '../../../components/LoginView';
import Dropdown from '../../../components/Dropdown';
import ItemExtensionOnOff from '../../../components/ItemExtensionOnOff';
import ItemNotLoggedIn from '../../../components/ItemNotLoggedIn';

import LoggedInView from '../../../components/LoggedInView';

import {
    StyledOptions,
    StyledOptionsContainer,
    StyledOptionsItemLeftRight,
    StyledStateContainer,
    StyledUIContainer,
} from './styled';

import {
    chromeStorage,
    deleteTypenames,
} from '../../../utils';

import client from '../../../graphql/client';
import {
    LOGOUT
} from '../../../graphql/mutate';



const Options: React.FC<any> = (properties) => {
    const [extensionOnOff, setExtensionOnOff] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [user, setUser] = useState(undefined);

    const context: any = useContext(Context);

    const {
        theme,
        setTheme,
    } = context;

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

    const logout = async () => {
        setLoggedIn(false);
        setUser(undefined);

        try {
            await chromeStorage.remove('user');

            await client.mutate({
                mutation: LOGOUT
            });
        } catch (err) {
        }
    }

    return (
        <StyledOptions
            theme={theme}
        >
            <StyledOptionsContainer>
                <div style={{ width: '250px'}}>
                    <StyledStateContainer>
                        <h1>
                            State
                        </h1>

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
                    </StyledStateContainer>

                    <StyledUIContainer>
                        <h1>
                            User Interface
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
                    </StyledUIContainer>

                </div>
            </StyledOptionsContainer>
        </StyledOptions>
    );
}


export default Options;
