import { Config } from '@stencil/core';
import { inlineSvg } from 'stencil-inline-svg';



export const config: Config = {
    namespace: 'enhanced-image-html',
    copy: [
        { src: 'assets-test' }
    ],
    outputTargets: [
        { type: 'dist' },
        { type: 'docs' },
        {
            type: 'www',
            serviceWorker: null
        }
    ],
    plugins: [inlineSvg()]
};
