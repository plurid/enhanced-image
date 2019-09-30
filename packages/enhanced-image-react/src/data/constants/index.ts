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
    invert: 0,
    contrast: 100,
    hue: 0,
    saturation: 100,
    brightness: 100,
};

export const SLIDER_INPUT_DEFAULTS = {
    min: 0,
    max: 100,
    valueSign: '%',
};
