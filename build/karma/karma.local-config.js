// dependencies

var template = require('../../tests/config/karma.config-template');

// karma configuration

module.exports = function (config) {
    template(config, {
        singleRun: false,
        autoWatch: true,
        basePath: '../../'
    }, {
        plugins: ['karma-chrome-launcher', 'karma-firefox-launcher'],
        browsers: ['Chrome', 'Firefox']
    });
};