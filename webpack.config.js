'use strict';

const webpack = require('webpack');
const path = require('path');
const jsSrc = path.resolve('src');

const config = {
    context: jsSrc,
    entry: {
        Container: 'Container.js'
    },
    resolve: {
        root: jsSrc,
        extensions: ['', '.js']
    },
    output: {
        library: 'react-notification',
        path: 'dist',
        filename: 'react-notification.js',
        libraryTarget: 'umd'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query:{
                    "presets": ["es2015", "stage-1", "react"],
                    "plugins": ["transform-decorators-legacy", "add-module-exports"]
                } },
            {
                test: /\.sass$/,
                loaders:
                    [
                        'style?sourceMap',
                        'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                        'resolve-url',
                        'sass?sourceMap'
                    ]
            },
            {
                // Пидорасы
                test: /react-icons\/(.)*(.js)$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, './node_modules/react-icons/md'),
                query: { presets: ['es2015', 'react'] }
            },
        ]
    },
    externals: [
        {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            }
        },
        {
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom'
            }
        }
    ],
    plugins: [
        // set env
        new webpack.DefinePlugin({
            'process.env': {
                BROWSER: JSON.stringify(true),
                NODE_ENV: JSON.stringify('production')
            }
        }),
        // optimizations
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin()
    ],
};

module.exports = config;