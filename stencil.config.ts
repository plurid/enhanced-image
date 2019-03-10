import { Config } from '@stencil/core';



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
    ]
};
