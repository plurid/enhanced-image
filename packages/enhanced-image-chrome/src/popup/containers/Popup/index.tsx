import React, {
    useState,
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



const Popup: React.FC<any> = (properties) => {
    const [extensionOnOff, setExtensionOnOff] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const context: any = useContext(Context);

    const {
        theme,
    } = context;

    const openOptions = () => {
        chrome.runtime.openOptionsPage();
    }

    const loginView = (
        <LoginView
            theme={theme}
            cancelLoginView={() => setShowLogin(false)}
        />
    );

    // chrome.runtime.onMessage.addListener(
    //     function(request, sender, sendResponse) {
    //         console.log(request);

    //         console.log(sender.tab ?
    //                     "from a content script:" + sender.tab.url :
    //                     "from the extension");
    //         if (request.greeting == "hello") {
    //             sendResponse({farewell: "goodbye"});
    //         }
    //     }
    // );

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
                                        caveljan
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
                                    {/* <div>
                                        <a
                                            href="https://account.plurid.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <ButtonInline
                                                atClick={() => {}}
                                                theme={theme}
                                                styles={{display: 'flex', alignItems: 'center'}}
                                            >
                                                <div>
                                                    create account
                                                </div>

                                                <div
                                                    style={{display: 'flex', alignItems: 'center'}}
                                                >
                                                    {ExternalLinkIcon}
                                                </div>
                                            </ButtonInline>
                                        </a>
                                    </div> */}
                                </StyledOptionsItemLeftRight>
                            )
                        }

                        {loggedIn && (
                            <StyledOptionsItemLeftRight>
                                <div>
                                    transformations
                                </div>

                                <div style={{textAlign: 'right'}}>
                                    50 <br/> get more
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
