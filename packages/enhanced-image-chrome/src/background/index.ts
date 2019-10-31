import {
    MESSAGE_TYPES,
    logic,
} from '@plurid/enhanced-image-react';



function backgroundMain() {
    const contextMenu = {
        id: 'enhanced-image',
        title: 'Enhanced Image',
        contexts: ['image']
    }

    chrome.runtime.onInstalled.addListener(() => {
        chrome.contextMenus.create(contextMenu);
    });

    chrome.contextMenus.onClicked.addListener((clickData) => {
        if (clickData.menuItemId === 'enhanced-image') {
            window.open(clickData.srcUrl, '_blank');
        }
    });

    chrome.runtime.onMessage.addListener((request, sender) => {
        console.log(request.message);
        switch (request.message.type) {
            case MESSAGE_TYPES.GET_TEXT_WITH_API_KEY:
                // logic.getTextWithAPIKey();
                break;
            case MESSAGE_TYPES.GET_TEXT_WITH_USER_TOKEN:
                // logic.getTextWithUserToken();
                break;
            case MESSAGE_TYPES.GET_TEXT_WITH_IMAGE_ID:
                // logic.getTextWithImageID();
                break;

            case MESSAGE_TYPES.EXTRACT_TEXT_WITH_API_KEY:
                // logic.extractTextWithAPIKey();
                break;
            case MESSAGE_TYPES.EXTRACT_TEXT_WITH_USER_TOKEN:
                // logic.extractTextWithUserToken();
                break;
            case MESSAGE_TYPES.EXTRACT_TEXT_WITH_IMAGE_ID:
                // logic.extractTextWithImageID();
                break;

            case MESSAGE_TYPES.SAVE_TEXT_WITH_API_KEY:
                // logic.saveTextWithAPIKey();
                break;
            case MESSAGE_TYPES.SAVE_TEXT_WITH_USER_TOKEN:
                // logic.saveTextWithUserToken();
                break;
            case MESSAGE_TYPES.SAVE_TEXT_WITH_IMAGE_ID:
                // logic.saveTextWithImageID();
                break;

            default:
                return;
        }
    });
}

backgroundMain();
