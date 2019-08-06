import React, {
    useState,
    useEffect,
    useContext,
} from 'react';

import Context from '../../context';


import Button from '../../../components/Button';
import ButtonSwitch from '../../../components/ButtonSwitch';
import ButtonInline from '../../../components/ButtonInline';
import CreateAccountButton from '../../../components/CreateAccountButton';
import LoginView from '../../../components/LoginView';
import TotalTransformations from '../../../components/TotalTransformations';

import {
    StyledPopup,
    StyledPopupContainer,
    StyledOptionsItemLeftRight,
    StyledHR,
} from './styled';

import {
    chromeStorage,
    deleteTypenames,
} from '../../../utils';


import client from '../../../graphql/client';
import {
    CURRENT_USER,
} from '../../../graphql/query';



const Popup: React.FC<any> = (properties) => {
    const [extensionOnOff, setExtensionOnOff] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [user, setUser] = useState(undefined);
    const [depict, setDepict] = useState(undefined);
    const context: any = useContext(Context);

    const {
        theme,
    } = context;

    const openOptions = () => {
        chrome.runtime.openOptionsPage();
    }

    const handleLoggedInUser = (user: any) => {
        setUser(user);
        const {
            depict,
        } = user.products;
        setDepict(depict);
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

            // const query = await client.query({
            //     query: CURRENT_USER,
            // });

            // const data = query.data.currentUser;

            // if (data.status) {
            //     console.log(query);
            //     // setLoggedInUser(data.user);
            // }
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
                    <>
                        <StyledOptionsItemLeftRight
                            style={{marginTop: '20px', display: 'flex', alignItems: 'center'}}
                        >
                            <div>
                                enhanced image is {extensionOnOff ? 'on' : 'off'}
                            </div>

                            <ButtonSwitch
                                checked={extensionOnOff}
                                toggle={() => setExtensionOnOff(!extensionOnOff)}
                                theme={theme}
                            />
                        </StyledOptionsItemLeftRight>

                        {!loggedIn && (
                            <StyledOptionsItemLeftRight
                                style={{display: 'flex', alignItems: 'center'}}
                            >
                                <ButtonInline
                                    atClick={() => setShowLogin(true)}
                                    theme={theme}
                                >
                                    login
                                </ButtonInline>


                                <CreateAccountButton
                                    theme={theme}
                                />
                            </StyledOptionsItemLeftRight>
                        )}

                        {loggedIn &&(
                            <>
                                <StyledOptionsItemLeftRight>
                                    <div>
                                        logged in as
                                    </div>

                                    <div>
                                        {user.username}
                                    </div>
                                </StyledOptionsItemLeftRight>

                                <StyledOptionsItemLeftRight>
                                    <div>
                                        ingress
                                    </div>

                                    <div>
                                        {depict.access.ingress.active ? 'active' : 'not active'}
                                    </div>
                                </StyledOptionsItemLeftRight>

                                <StyledOptionsItemLeftRight>
                                    <div>
                                        subscription
                                    </div>

                                    <div>
                                        {depict.access.subscription.active ? 'active' : 'not active'}
                                    </div>
                                </StyledOptionsItemLeftRight>

                                <StyledOptionsItemLeftRight>
                                    <div>
                                        transformations
                                    </div>

                                    <div style={{textAlign: 'right'}}>
                                        <TotalTransformations
                                            imageTransformations={depict.access.imageTransformations}
                                        />
                                    </div>
                                </StyledOptionsItemLeftRight>

                                <div style={{width: '50%', margin: '0px auto', marginTop: '10px'}}>
                                    <Button
                                        theme={theme}
                                        text="Get More"
                                        atClick={() => {}}
                                    />
                                </div>
                            </>
                        )}

                        {/* <StyledHR
                            theme={theme}
                        /> */}

                        <div
                            style={{textAlign: 'center', marginBottom: '20px'}}
                        >
                            <ButtonInline
                                theme={theme}
                                atClick={openOptions}
                            >
                                view options
                            </ButtonInline>
                        </div>
                    </>
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
