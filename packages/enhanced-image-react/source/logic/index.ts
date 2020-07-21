import {
    getTextWithAPIKey,
    getTextWithOwnerToken,
    getTextWithImageID,
} from './getText';

import {
    extractTextWithAPIKey,
    extractTextWithImageID,
    extractTextWithOwnerToken,
} from './extractText';

import {
    saveTextWithAPIKey,
    saveTextWithOwnerToken,
    saveTextWithImageID,
} from './saveText';



const logic = {
    getTextWithAPIKey,
    getTextWithOwnerToken,
    getTextWithImageID,

    extractTextWithAPIKey,
    extractTextWithImageID,
    extractTextWithOwnerToken,

    saveTextWithAPIKey,
    saveTextWithOwnerToken,
    saveTextWithImageID,
};


export default logic;
