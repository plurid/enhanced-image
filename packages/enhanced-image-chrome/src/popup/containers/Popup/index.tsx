import React, {
    useContext,
} from 'react';

import Context from '../../context';

import {
    StyledPopup,
    StyledPopupContainer,
} from './styled';



const Popup: React.FC<any> = (properties) => {
    const context: any = useContext(Context);

    const {
        theme,
    } = context;

    // const openOptions = () => {
    //     chrome.runtime.openOptionsPage();
    // }

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
                Enhanced Image

                <div>
                    view options
                </div>
            </StyledPopupContainer>
        </StyledPopup>
    );
}


export default Popup;
