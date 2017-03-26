var webpackConfig = require('./webpack.config')
var path          = require('path')

var testSrc = path.join('src', '/**/__tests__/*')

webpackConfig.externals = [];
delete webpackConfig.entry;
delete webpackConfig.output;


var karmaConfig = {
    frameworks: ['mocha', 'sinon-chai'],
    files: [ testSrc ],
    plugins: [
        'karma-mocha',
        'karma-coverage',
        'karma-coveralls',
        'karma-nyan-reporter',
        'karma-chrome-launcher',
        'karma-webpack',
        'karma-sinon-chai'
    ],
    preprocessors: {},
    webpack: webpackConfig,
    singleRun: process.env.TRAVIS_CI === 'true',
    reporters: ['nyan', 'coverage', 'coveralls'],
    browsers: [(process.env.TRAVIS_CI === 'true'? 'Firefox' : 'Chrome')],
    coverageReporter: {
        reporters: [{
            type: 'lcov',
            dir: 'coverage'
        }, {
            type: 'html',
            dir: 'coverage/html/'
        }]
    },
    files: [
        'node_modules/babel-polyfill/dist/polyfill.js',
        'src/__tests__/*.js'
    ]
}

karmaConfig.preprocessors[testSrc] = ['webpack']

module.exports = function(config) {
    config.set(karmaConfig)
}