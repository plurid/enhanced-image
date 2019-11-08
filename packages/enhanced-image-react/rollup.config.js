import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import depsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import replace from 'rollup-plugin-replace';

import pkg from './package.json';



const external = [
    'graphql',
    'react',
    'react-dom',
    'styled-components',
];

export default {
    input: 'source/index.tsx',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
            external,
        },
        {
            file: pkg.module,
            format: 'es',
            exports: 'named',
            sourcemap: true,
            external,
        }
    ],
    plugins: [
        replace({
            'process.env.MODE_ENV': JSON.stringify(process.env.MODE_ENV),
        }),
        depsExternal(),
        postcss({
            modules: true,
        }),
        url(),
        resolve({
            modulesOnly: true,
        }),
        typescript({
            check: false,
            rollupCommonJSResolveHack: true,
            clean: true
        }),
        commonjs(),
    ],
}
