// dependencies

var gulp = require('gulp');
var gutil = require('gulp-util');
var karma = require('karma');
var path = require('path');

// initialization

var karmaServer = karma.Server;

gulp.task('test', function (done) {
    var karmaConfigFile = path.join(__dirname, '../', 'karma.config.js');

    var server = _buildKarmaServer({ configFile: karmaConfigFile }, done);

    server.start();
});

// private methods

function _buildKarmaServer(config, done) {
    var server = new karmaServer(config);

    server.on('browser_error', function (browser, err) {
        gutil.log('Karma Run Failed: ' + err.message);
        throw err;
    });

    server.on('run_complete', function (browsers, results) {
        if (results.failed) {
            throw new Error('Karma: Tests Failed');
        }
        gutil.log('Karma Run Complete: No Failures');
        done();
    });

    return server;
}