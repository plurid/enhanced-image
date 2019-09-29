import { Config } from '@stencil/core';
import { inlineSvg } from 'stencil-inline-svg';



export const config: Config = {
    namespace: 'text-select-image-html',
    copy: [
        { src: 'test-assets' },
        { src: 'test-data' },
    ],
    outputTargets: [
        { type: 'dist' },
        { type: 'docs' },
        {
            type: 'www',
            serviceWorker: null,
        },
    ],
    plugins: [
        inlineSvg(),
    ],
};
