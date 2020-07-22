import {
    MESSAGE_TYPES,
    logic,
} from '@plurid/enhanced-image-react';

import {
    contextMenu,
    logErrors,

    PLURID_COM_DOMAIN,
    COOKIE_TOKEN_ACCESS,
    COOKIE_TOKEN_REFRESH,

    MESSAGE_TYPE_GET_PLURID_ACCESS_TOKEN,
} from '../../data/constants';

import client from '../../services/graphql/client';

import {
    chromeStorage,
    chromeCookies,
} from '../../services/utilities/chrome';



const onInstalled = async () => {
    chrome.contextMenus.create(contextMenu);

    const options = {
        getImageTextAtLoad: false,
        transparentUI: true,
    };
    await chromeStorage.set({options});
}


const onClicked = (
    clickData: chrome.contextMenus.OnClickData,
) => {
    if (clickData.menuItemId === 'enhanced-image') {
        window.open(clickData.srcUrl, '_blank');
    }
}


const onMessage = async (
    request: any,
    sender: chrome.runtime.MessageSender,
) => {
    const {
        type,
        input,
    } = request.message;

    const tabID = sender.tab.id;

    switch (type) {
        case MESSAGE_TYPES.GET_TEXT_WITH_API_KEY:
            {
                const response = await logic.text.get.withAPIKey(
                    input,
                    client,
                    logErrors,
                );

                chrome.tabs.sendMessage(
                    tabID,
                    { message: { ...response } },
                );
                break;
            }
        case MESSAGE_TYPES.GET_TEXT_WITH_OWNER_TOKEN:
            {
                const response = await logic.text.get.withOwnerToken(
                    input,
                    client,
                    logErrors,
                );

                chrome.tabs.sendMessage(
                    tabID,
                    { message: { ...response } },
                );
                break;
            }
        case MESSAGE_TYPES.GET_TEXT_WITH_IMAGE_ID:
            {
                const response = await logic.text.get.withImageID(
                    input,
                    client,
                    logErrors,
                );

                chrome.tabs.sendMessage(
                    tabID,
                    { message: { ...response } },
                );
                break;
            }

        case MESSAGE_TYPES.EXTRACT_TEXT_WITH_API_KEY:
            {
                const response = await logic.text.extract.withAPIKey(
                    input,
                    client,
                    logErrors,
                );

                chrome.tabs.sendMessage(
                    tabID,
                    { message: { ...response } },
                );
                break;
            }
        case MESSAGE_TYPES.EXTRACT_TEXT_WITH_OWNER_TOKEN:
            {
                const response = await logic.text.extract.withOwnerToken(
                    input,
                    client,
                    logErrors,
                );

                chrome.tabs.sendMessage(
                    tabID,
                    { message: { ...response } },
                );
                break;
            }
        case MESSAGE_TYPES.EXTRACT_TEXT_WITH_IMAGE_ID:
            {
                const response = await logic.text.extract.withImageID(
                    input,
                    client,
                    logErrors,
                );

                chrome.tabs.sendMessage(
                    tabID,
                    { message: { ...response } },
                );
                break;
            }

        case MESSAGE_TYPES.SAVE_TEXT_WITH_API_KEY:
            {
                const response = await logic.text.save.withAPIKey(
                    input,
                    client,
                    logErrors,
                );

                chrome.tabs.sendMessage(
                    tabID,
                    { message: { ...response } },
                );
                break;
            }
        case MESSAGE_TYPES.SAVE_TEXT_WITH_OWNER_TOKEN:
            {
                const response = await logic.text.save.withOwnerToken(
                    input,
                    client,
                    logErrors,
                );

                chrome.tabs.sendMessage(
                    tabID,
                    { message: { ...response } },
                );
                break;
            }
        case MESSAGE_TYPES.SAVE_TEXT_WITH_IMAGE_ID:
            {
                const response = await logic.text.save.withImageID(
                    input,
                    client,
                    logErrors,
                );

                chrome.tabs.sendMessage(
                    tabID,
                    { message: { ...response } },
                );
                break;
            }

        case MESSAGE_TYPES.TRANSVIEW_TEXT_WITH_API_KEY:
            {
                const response = await logic.text.transview.withAPIKey(
                    input,
                    client,
                    logErrors,
                );

                chrome.tabs.sendMessage(
                    tabID,
                    { message: { ...response } },
                );
                break;
            }
        case MESSAGE_TYPES.TRANSVIEW_TEXT_WITH_OWNER_TOKEN:
            {
                const response = await logic.text.transview.withOwnerToken(
                    input,
                    client,
                    logErrors,
                );

                chrome.tabs.sendMessage(
                    tabID,
                    { message: { ...response } },
                );
                break;
            }
        case MESSAGE_TYPES.TRANSVIEW_TEXT_WITH_IMAGE_ID:
            {
                const response = await logic.text.transview.withImageID(
                    input,
                    client,
                    logErrors,
                );

                chrome.tabs.sendMessage(
                    tabID,
                    { message: { ...response } },
                );
                break;
            }

        case MESSAGE_TYPE_GET_PLURID_ACCESS_TOKEN:
            {
                const accessToken = await chromeCookies.get(
                    PLURID_COM_DOMAIN,
                    COOKIE_TOKEN_ACCESS,
                );
                const refreshAccessToken = await chromeCookies.get(
                    PLURID_COM_DOMAIN,
                    COOKIE_TOKEN_REFRESH,
                );

                chrome.tabs.sendMessage(
                    tabID,
                    {
                        message: {
                            accessToken,
                            refreshAccessToken,
                        },
                    },
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
}


const backgroundMain = () => {
    chrome.runtime.onInstalled.addListener(onInstalled);

    chrome.contextMenus.onClicked.addListener(onClicked);

    chrome.runtime.onMessage.addListener(onMessage);
}


backgroundMain();
