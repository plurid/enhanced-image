import {
    environment,
} from '../../../services/utilities';



const PLURID_API_ENDPOINT_PROD = 'https://api.plurid.com/graphql';
const PLURID_API_ENDPOINT_DEV = 'https://api.plurid.dev/graphql';
const PLURID_API_ENDPOINT_LOCAL = 'http://localhost:33600/graphql';
export const PLURID_API_ENDPOINT = environment.production
    ? PLURID_API_ENDPOINT_PROD
    : environment.local
        ? PLURID_API_ENDPOINT_LOCAL
        : PLURID_API_ENDPOINT_DEV;


const DEPICT_DOMAIN_PROD = 'https://depict.plurid.com';
const DEPICT_DOMAIN_DEV = 'https://depict.plurid.dev';
export const DEPICT_DOMAIN = environment.production
    ? DEPICT_DOMAIN_PROD
    : DEPICT_DOMAIN_DEV;
