// dependencies

var gulp = require('gulp');
var path = require('path');
var karmaTools = require('./tools/karma.tools');

// tasks

gulp.task('karma-ci', _buildKarmaTask('karma/karma.ci-config.js', { singleRun: true }));
gulp.task('karma-local', _buildKarmaTask('karma/karma.local-config.js', { singleRun: false }));
gulp.task('karma-debug', _buildKarmaTask('karma/karma.debug-config.js', { singleRun: false }));

// private functions

function _buildKarmaTask(configFile, options) {
    return function (done) {
        var karmaConfigFile = path.join(__dirname, configFile);

        var serverConfig = { configFile: karmaConfigFile };
        var server = karmaTools.createServer(serverConfig, options, done);

        server.start();
    }
}