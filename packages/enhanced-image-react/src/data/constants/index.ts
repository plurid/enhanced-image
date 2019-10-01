import environment from '../../services/utilities/environment';


export const UPDATE_DEBOUNCE = 5000;

export const DEFAULT_THEME = 'plurid';

export const ABOUT_URL = 'https://github.com/plurid/enhanced-image';

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


export const SETTINGS_MENU_HEIGHT_DIFFERENCE = 70;

export const SLIDER_NAMES = {
    Contrast: 'Contrast',
    Hue: 'Hue Rotation',
    Saturation: 'Saturation',
    Brightness: 'Lightness',
};

export const SLIDER_VALUE_DEFAULTS = {
    Invert: 0,
    Contrast: 100,
    Hue: 0,
    Saturation: 100,
    Brightness: 100,
};

export const SLIDER_INPUT_DEFAULTS = {
    min: 0,
    max: 100,
    valueSign: '%',
};


export const REQUEST_ERRORS = {
    BAD_REQUEST: 'BAD_REQUEST',
}
