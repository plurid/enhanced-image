import { logic } from '@plurid/enhanced-image-react';



function backgroundMain() {
    const contextMenu = {
        id: 'enhanced-image',
        title: 'Enhanced Image',
        contexts: ['image']
    }

    chrome.runtime.onInstalled.addListener(function() {
        chrome.contextMenus.create(contextMenu);
    });

    chrome.contextMenus.onClicked.addListener((clickData) => {
        if (clickData.menuItemId === 'enhanced-image') {
            window.open(clickData.srcUrl, '_blank');
        }
    });


    chrome.runtime.onMessage.addListener(function(request, sender) {
        console.log(request.message);
        switch (request.message.type) {
            case 'A':
                // logic.getTextWithAPIKey();
            default:
                return;
        }
    });
}

backgroundMain();
