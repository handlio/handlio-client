// dependencies

var template = require('../../tests/config/karma.config-template');

// karma configuration

module.exports = function (config) {
    template(config, {
        singleRun: true,
        basePath: '../../'
    });
};