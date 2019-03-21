
// EnhancedImageHtml: Custom Elements Define Library, ES Module/es5 Target

import { defineCustomElement } from './enhanced-image-html.core.js';
import { COMPONENTS } from './enhanced-image-html.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, COMPONENTS, opts);
}
