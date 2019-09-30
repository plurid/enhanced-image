import environment from '../../services/utilities/environment';


export const UPDATE_DEBOUNCE = 5000;

export const DEFAULT_THEME = 'gradient';

export const ABOUT_URL = 'https://github.com/plurid/enhanced-image';

const PLURID_API_ENDPOINT_DEV = 'https://api.plurid.dev/graphql';
const PLURID_API_ENDPOINT_PROD = 'https://api.plurid.com/graphql';
export const PLURID_API_ENDPOINT = environment.production
    ? PLURID_API_ENDPOINT_PROD
    : PLURID_API_ENDPOINT_DEV;


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
