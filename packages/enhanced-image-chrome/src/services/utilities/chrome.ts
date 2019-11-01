// https://github.com/akiomik/chrome-storage-promise/blob/master/src/chrome-storage-promise.js
export const chromeStorage = {
    get: (keys: any): Promise<any> => {
        let promise = new Promise((resolve, reject) => {
            chrome.storage.sync.get(keys, (items) => {
                let err = chrome.runtime.lastError;
                if (err) {
                    reject(err);
                } else {
                    resolve(items);
                }
            });
        });
        return promise;
    },
    set: (items: any) => {
        let promise = new Promise((resolve, reject) => {
            chrome.storage.sync.set(items, () => {
                let err = chrome.runtime.lastError;
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        return promise;
    },
    getBytesInUse: (keys: any) => {
        let promise = new Promise((resolve, reject) => {
            chrome.storage.sync.getBytesInUse(keys, (items) => {
                let err = chrome.runtime.lastError;
                if (err) {
                    reject(err);
                } else {
                    resolve(items);
                }
            });
        });
        return promise;
    },
    remove: (keys: any) => {
        let promise = new Promise((resolve, reject) => {
            chrome.storage.sync.remove(keys, () => {
                let err = chrome.runtime.lastError;
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        return promise;
    },
    clear: () => {
        let promise = new Promise((resolve, reject) => {
            chrome.storage.sync.clear(() => {
                let err = chrome.runtime.lastError;
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        return promise;
    }
}
