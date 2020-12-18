// #region imports
    // #region libraries
    import commonjs from '@rollup/plugin-commonjs';
    import typescript from 'rollup-plugin-typescript2';
    // #endregion libraries


    // #region external
    import pkg from '../package.json';
    // #endregion external
// #endregion imports



// #region module
const common = {
    plugins: [
        typescript({
            tsconfig: './tsconfig.json',
        }),
        commonjs(),
    ]
};


const cli = {
    input: './source/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
        },
    ],
    external: [
        'os',
        'fs',
        'stream',
        'path',
        'readline',
        'commander',
        '@plurid/deon',
    ],
    plugins: [
        ...common.plugins,
    ],
};
// #endregion module



// #region exports
export default [
    cli,
];
// #endregion exports
