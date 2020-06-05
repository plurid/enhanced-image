import {
    MESSAGE_TYPES,
    logic,
} from '@plurid/enhanced-image-react';

import client from '../../services/graphql/client';

import {
    chromeStorage,
} from '../../services/utilities/chrome';



function backgroundMain() {
    const contextMenu = {
        id: 'enhanced-image',
        title: 'Enhanced Image',
        contexts: ['image']
    }

    chrome.runtime.onInstalled.addListener(async () => {
        chrome.contextMenus.create(contextMenu);

        const options = {
            getImageTextAtLoad: false,
            transparentUI: true,
        };
        await chromeStorage.set({options});
    });

    chrome.contextMenus.onClicked.addListener((clickData) => {
        if (clickData.menuItemId === 'enhanced-image') {
            window.open(clickData.srcUrl, '_blank');
        }
    });

    chrome.runtime.onMessage.addListener(async (request, sender) => {
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
                    chrome.tabs.sendMessage(
                        tabID,
                        { message: { ...response } },
                    );
                    break;
                }
            case MESSAGE_TYPES.GET_TEXT_WITH_OWNER_TOKEN:
                {
                    const response = await logic.getTextWithOwnerToken(
                        input,
                        client,
                    );
                    chrome.tabs.sendMessage(
                        tabID,
                        { message: { ...response } },
                    );
                    break;
                }
            case MESSAGE_TYPES.GET_TEXT_WITH_IMAGE_ID:
                {
                    const response = await logic.getTextWithImageID(
                        input,
                        client,
                    );
                    chrome.tabs.sendMessage(
                        tabID,
                        { message: { ...response } },
                    );
                    break;
                }

            case MESSAGE_TYPES.EXTRACT_TEXT_WITH_API_KEY:
                {
                    const response = await logic.extractTextWithAPIKey(
                        input,
                        client,
                    );
                    chrome.tabs.sendMessage(
                        tabID,
                        { message: { ...response } },
                    );
                    break;
                }
            case MESSAGE_TYPES.EXTRACT_TEXT_WITH_OWNER_TOKEN:
                {
                    const response = await logic.extractTextWithOwnerToken(
                        input,
                        client,
                    );
                    chrome.tabs.sendMessage(
                        tabID,
                        { message: { ...response } },
                    );
                    break;
                }
            case MESSAGE_TYPES.EXTRACT_TEXT_WITH_IMAGE_ID:
                {
                    const response = await logic.extractTextWithImageID(
                        input,
                        client,
                    );
                    chrome.tabs.sendMessage(
                        tabID,
                        { message: { ...response } },
                    );
                    break;
                }

            case MESSAGE_TYPES.SAVE_TEXT_WITH_API_KEY:
                {
                    console.log(input);
                    const response = await logic.saveTextWithAPIKey(
                        input,
                        client,
                    );
                    chrome.tabs.sendMessage(
                        tabID,
                        { message: { ...response } },
                    );
                    break;
                }
            case MESSAGE_TYPES.SAVE_TEXT_WITH_OWNER_TOKEN:
                {
                    const response = await logic.saveTextWithOwnerToken(
                        input,
                        client,
                    );
                    chrome.tabs.sendMessage(
                        tabID,
                        { message: { ...response } },
                    );
                    break;
                }
            case MESSAGE_TYPES.SAVE_TEXT_WITH_IMAGE_ID:
                {
                    const response = await logic.saveTextWithImageID(
                        input,
                        client,
                    );
                    chrome.tabs.sendMessage(
                        tabID,
                        { message: { ...response } },
                    );
                    break;
                }
            default:
                const response = {
                    status: false,
                };
                chrome.tabs.sendMessage(
                    tabID,
                    { message: { ...response } },
                );
                return;
        }
    });
}

backgroundMain();
