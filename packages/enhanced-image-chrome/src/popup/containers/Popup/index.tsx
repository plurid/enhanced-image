import React, {
    useState,
    useContext,
} from 'react';

import Context from '../../context';

import {
    StyledPopup,
    StyledPopupContainer,
    StyledOptionsItemLeftRight,
} from './styled';

import ExternalLinkIcon from '../../../assets/buttons/external-link-icon';



const Popup: React.FC<any> = (properties) => {
    const [extensionOnOff, setExtensionOnOff] = useState(false);
    const [loggedIn, setLoggedIn] = useState(true);
    const context: any = useContext(Context);

    const {
        theme,
    } = context;

    const openOptions = () => {
        chrome.runtime.openOptionsPage();
    }

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
                <StyledOptionsItemLeftRight
                    style={{marginTop: '30px'}}
                >
                    enhanced image is

                    <div
                        onClick={() => setExtensionOnOff(!extensionOnOff)}
                    >
                        {extensionOnOff ? 'on' : 'off'}
                    </div>
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
                        <StyledOptionsItemLeftRight>
                            <div>
                                login
                            </div>

                            <div>
                                <a href="https://account.plurid.com">
                                    create account
                                    <span>
                                        {ExternalLinkIcon}
                                    </span>
                                </a>
                            </div>
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

                <hr
                    style={{width: '70%'}}
                />

                <div
                    style={{textAlign: 'center', marginBottom: '30px'}}
                    onClick={openOptions}
                >
                    view options
                </div>
            </StyledPopupContainer>
        </StyledPopup>
    );
}


export default Popup;
