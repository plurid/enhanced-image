import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import depsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import replace from '@rollup/plugin-replace';

import pkg from '../package.json';



export default {
    input: 'source/index.tsx',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: 'es',
            exports: 'named',
            sourcemap: true,
        },
    ],
    plugins: [
        replace({
            'process.env.ENV_MODE': JSON.stringify(process.env.ENV_MODE),
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
            rollupCommonJSResolveHack: true,
            clean: true,
        }),
        commonjs(),
    ],
}
