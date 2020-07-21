export const sendMessage = (
    message: any,
) => {
    chrome.runtime.sendMessage({
        message,
    });
}
