const appName = 'image-text-select';

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");


const miniCssExtract = new MiniCssExtractPlugin({
    filename: `../css/${appName}.css`,
    disable: process.env.NODE_ENV === "development"
});
const path = require('path');


module.exports = {
    mode: 'development',
    // mode: 'production',
    entry: './app.ts',
    output: {
        filename: `${appName}.js`,
        path: path.resolve(__dirname, `${appName}/js`)
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        miniCssExtract
    ],
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "awesome-typescript-loader"
                }
            }
        ]
    }
};
