import {
    MESSAGE_TYPES,
    logic,
} from '@plurid/enhanced-image-react';

import client from '../graphql/client';



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

    chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
        console.log(request.message);
        const {
            type,
            input,
        } = request.message;

        const tabID = sender.tab.id;

        switch (type) {
            case MESSAGE_TYPES.GET_TEXT_WITH_API_KEY:
                {
                    const response = await logic.getTextWithAPIKey(
                        input,
                        client,
                    );

                    chrome.tabs.sendMessage(tabID, response);
                    // sendResponse({response});
                    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                    //     chrome.tabs.sendMessage(tabs[0].id, {response}, function(response) {});
                    // });

                    // chrome.tabs.getSelected(null, function(tab) {
                    //     chrome.tabs.sendMessage(
                    //         tab.id, { response }
                    //     );
                    // });
                    console.log(response);
                    // break;
                    return response;
                }
            case MESSAGE_TYPES.GET_TEXT_WITH_USER_TOKEN:
                {
                    const response = await logic.getTextWithUserToken(
                        input,
                        client,
                    );
                    break;
                }
            case MESSAGE_TYPES.GET_TEXT_WITH_IMAGE_ID:
                {
                    const response = await logic.getTextWithImageID(
                        input,
                        client,
                    );
                    break;
                }

            case MESSAGE_TYPES.EXTRACT_TEXT_WITH_API_KEY:
                {
                    const response = await logic.extractTextWithAPIKey(
                        input,
                        client,
                    );
                    break;
                }
            case MESSAGE_TYPES.EXTRACT_TEXT_WITH_USER_TOKEN:
                {
                    const response = await logic.extractTextWithUserToken(
                        input,
                        client,
                    );
                    break;
                }
            case MESSAGE_TYPES.EXTRACT_TEXT_WITH_IMAGE_ID:
                {
                    const response = await logic.extractTextWithImageID(
                        input,
                        client,
                    );
                    break;
                }

            case MESSAGE_TYPES.SAVE_TEXT_WITH_API_KEY:
                {
                    const response = await logic.saveTextWithAPIKey(
                        input,
                        client,
                    );
                    break;
                }
            case MESSAGE_TYPES.SAVE_TEXT_WITH_USER_TOKEN:
                {
                    const response = await logic.saveTextWithUserToken(
                        input,
                        client,
                    );
                    break;
                }
            case MESSAGE_TYPES.SAVE_TEXT_WITH_IMAGE_ID:
                {
                    const response = await logic.saveTextWithImageID(
                        input,
                        client,
                    );
                    break;
                }

            default:
                return;
        }
    });
}

backgroundMain();
