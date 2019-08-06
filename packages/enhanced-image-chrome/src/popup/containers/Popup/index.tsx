import React, {
    useState,
    useEffect,
    useContext,
} from 'react';

import Context from '../../context';

import ButtonSwitch from '../../../components/ButtonSwitch';
import ButtonInline from '../../../components/ButtonInline';
import CreateAccountButton from '../../../components/CreateAccountButton';
import LoginView from '../../../components/LoginView';

import {
    StyledPopup,
    StyledPopupContainer,
    StyledOptionsItemLeftRight,
    StyledHR,
} from './styled';

import { chromeStorage } from '../../../utils';




const TotalTransformations: React.FC<any> = (properties) => {
    const {
        imageTransformations,
    } = properties;

    const {
        free,
        paid,
        subscription,
    } = imageTransformations;

    const total = free + paid + subscription;

    return (
        <>
            {total}
        </>
    );
}

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

    const setLoggedInUser = (user: any) => {
        setLoggedIn(true);
        setUser(user);
        const {
            depict,
        } = user.products;
        setDepict(depict);

        console.log(user);
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
        getExtensionState();
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
                            style={{marginTop: '30px', display: 'flex', alignItems: 'center'}}
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

                        {loggedIn
                            ? (
                                <StyledOptionsItemLeftRight>
                                    <div>
                                        logged in as
                                    </div>

                                    <div>
                                        {user.username}
                                    </div>
                                </StyledOptionsItemLeftRight>
                            ) : (
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
                            )
                        }

                        {loggedIn && (
                            <StyledOptionsItemLeftRight>
                                <div>
                                    transformations
                                </div>

                                <div style={{textAlign: 'right'}}>
                                    <TotalTransformations
                                        imageTransformations={depict.access.imageTransformations}
                                    />
                                    <br/>
                                    get more
                                </div>
                            </StyledOptionsItemLeftRight>
                        )}

                        <StyledHR
                            theme={theme}
                        />

                        <div
                            style={{textAlign: 'center', marginBottom: '30px'}}
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
