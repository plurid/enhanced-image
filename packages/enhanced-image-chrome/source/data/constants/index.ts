import {
    environment,
} from '../../services/utilities';



export const API_URI = environment.production
    ? 'https://api.plurid.com/graphql'
    : 'http://localhost:33600/graphql';


export const PLURID_ACCOUNT_DOMAIN = 'https://account.plurid.com/depict';


export const PLURID_COM_DOMAIN_PRODUCTION = 'https://plurid.com';
export const PLURID_COM_DOMAIN_DEVELOPMENT = 'http://localhost:33700';
export const PLURID_COM_DOMAIN = environment.production
    ? PLURID_COM_DOMAIN_PRODUCTION
    : PLURID_COM_DOMAIN_DEVELOPMENT;


export const COOKIE_TOKEN_ACCESS = 'P_TKNA';
export const COOKIE_TOKEN_REFRESH = 'P_TKNR';


export const MESSAGE_TYPE_GET_PLURID_ACCESS_TOKEN = 'GET_PLURID_ACCESS_TOKEN';


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
