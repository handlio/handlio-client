// dependencies

var gutil = require('gulp-util');
var karma = require('karma');

var karmaServer = karma.Server;

// exports

module.exports = {
    createServer: _createServer
};

// initialization

// private methods

function _createServer(config, done) {
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