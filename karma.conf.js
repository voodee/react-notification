var webpackConfig = require('./webpack.config')
var path          = require('path')

var testSrc = path.join('src', '/**/__tests__/*')

webpackConfig.externals = [];
delete webpackConfig.entry;
delete webpackConfig.output;


var coverage;
var reporters;
if (process.env.CONTINUOUS_INTEGRATION) {
    coverage = {
        type: 'lcov',
        dir: 'coverage/'
    };
    reporters = ['coverage', 'coveralls'];
}
else {
    coverage = {
        type: 'html',
        dir: 'coverage/'
    };
    reporters = ['nyan', 'coverage'];
}


var karmaConfig = {
    frameworks: ['mocha', 'sinon-chai'],
    files: [ testSrc ],
    preprocessors: {},
    webpack: webpackConfig,
    singleRun: process.env.TRAVIS_CI === 'true',
    reporters:reporters,
    browsers: [(process.env.TRAVIS_CI === 'true'? 'Firefox' : 'Chrome')],
    coverageReporter: coverage,
    files: [
        'node_modules/babel-polyfill/dist/polyfill.js',
        'src/__tests__/*.js'
    ]
}

karmaConfig.preprocessors[testSrc] = ['webpack']

module.exports = function(config) {
    config.set(karmaConfig)
}