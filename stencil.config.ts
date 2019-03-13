import { Config } from '@stencil/core';



export const config: Config = {
    namespace: 'text-select-image-html',
    copy: [
        { src: 'test-assets' }
    ],
    outputTargets:[
        { type: 'dist' },
        { type: 'docs' },
        {
            type: 'www',
            serviceWorker: null
        }
    ]
};
