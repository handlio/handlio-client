// dependencies

var gulp = require('gulp');
var path = require('path');
var karmaTools = require('./tools/karma.tools');

// tasks

gulp.task('karma-ci', _buildKarmaTask('karma/karma.ci-config.js'));
gulp.task('karma-local', _buildKarmaTask('karma/karma.local-config.js'));

// private functions

function _buildKarmaTask(configFile) {
    return function (done) {
        var karmaConfigFile = path.join(__dirname, configFile);

        var serverConfig = { configFile: karmaConfigFile };
        var server = karmaTools.createServer(serverConfig, done);

        server.start();
    }
}