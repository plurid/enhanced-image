import {
    getTextWithAPIKey,
    getTextWithUserToken,
    getTextWithImageID,
} from './getText';

import {
    extractTextWithAPIKey,
    extractTextWithImageID,
    extractTextWithUserToken,
} from './extractText';

import {
    saveTextWithAPIKey,
    saveTextWithUserToken,
    saveTextWithImageID,
} from './saveText';



const logic = {
    getTextWithAPIKey,
    getTextWithUserToken,
    getTextWithImageID,

    extractTextWithAPIKey,
    extractTextWithImageID,
    extractTextWithUserToken,

    saveTextWithAPIKey,
    saveTextWithUserToken,
    saveTextWithImageID,
}


export default logic;
