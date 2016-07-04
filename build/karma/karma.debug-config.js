// dependencies

var template = require('../../tests/config/karma.config-template');

// karma configuration

module.exports = function (config) {
    template(config, {
        singleRun: false,
        autoWatch: true,
        basePath: '../../',
        preprocessors: {
            'tests/unit/**/*.js': ['browserify'],
            'tests/mocks/**/*.js': ['browserify'],

            'app/**/*.html': ['ng-html2js']
        }
    }, {
        plugins: ['karma-chrome-launcher', 'karma-firefox-launcher'],
        browsers: ['Chrome', 'Firefox']
    });
};