import { Config } from '@stencil/core';
import { inlineSvg } from 'stencil-inline-svg';
// import typescript from 'rollup-plugin-typescript2';
// import nodeResolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
// import builtins from 'rollup-plugin-node-builtins';
// import globals from 'rollup-plugin-node-globals';

// import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
// import sourceMaps from 'rollup-plugin-sourcemaps';
// import typescript from 'rollup-plugin-typescript2';
// import json from 'rollup-plugin-json';
// import builtins from 'rollup-plugin-node-builtins';
// import globals from 'rollup-plugin-node-globals';



export const config: Config = {
    namespace: 'enhanced-image-html',
    copy: [
        { src: 'test-assets' },
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
        // resolve(),

        // // Allow json resolution
        // json(),
        // commonjs(),
        // globals(),
        // builtins(),
        // // Allow node_modules resolution, so you can use 'external' to control
        // // Compile TypeScript files
        // typescript({ useTsconfigDeclarationDir: true }),
        // // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
        // resolve(),
        // // which external modules to include in the bundle
        // // https://github.com/rollup/rollup-plugin-node-resolve#usage

        // // Resolve source maps to the original source
        // sourceMaps(),

        // commonjs(),
        // globals(),
        // builtins(),
        // nodeResolve(),
        // typescript(),
        inlineSvg(),
    ],
};
