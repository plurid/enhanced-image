import {
    MESSAGE_TYPES,
    logic,
} from '@plurid/enhanced-image-react';

import client from '../../services/graphql/client';



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
            case MESSAGE_TYPES.GET_TEXT_WITH_USER_TOKEN:
                {
                    const response = await logic.getTextWithUserToken(
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
            case MESSAGE_TYPES.EXTRACT_TEXT_WITH_USER_TOKEN:
                {
                    const response = await logic.extractTextWithUserToken(
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
            case MESSAGE_TYPES.SAVE_TEXT_WITH_USER_TOKEN:
                {
                    const response = await logic.saveTextWithUserToken(
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
