import { h } from '../enhanced-image-html.core.js';

const SLIDER_NAMES = {
    contrast: 'Contrast',
    hue: 'Hue Rotate',
    saturation: 'Saturation',
    brightness: 'Lightness',
};
const SLIDER_DEFAULTS = {
    invert: 0,
    contrast: 100,
    hue: 0,
    saturation: 100,
    brightness: 100,
};
const SLIDER_ITEM_DEFAULTS = {
    min: 0,
    max: 100,
    valueSign: '%',
};
const FULLSCREEN_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '100%',
    width: '100%',
    zIndex: '999',
};

export { SLIDER_DEFAULTS as a, FULLSCREEN_STYLES as b, SLIDER_ITEM_DEFAULTS as c, SLIDER_NAMES as d };
