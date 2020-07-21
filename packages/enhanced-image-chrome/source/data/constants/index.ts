import {
    environment,
} from '../../services/utilities';



export const API_URI = environment.production
    ? 'https://api.plurid.com/graphql'
    : 'http://localhost:33600/graphql';


export const PLURID_ACCOUNT_DOMAIN = 'https://account.plurid.com/depict';


export const initialTimedNotification = {
    text: '',
    time: 0,
};


export const contextMenu = {
    id: 'enhanced-image',
    title: 'Enhanced Image',
    contexts: [
        'image',
    ],
};


export const logErrors = !environment.production;
