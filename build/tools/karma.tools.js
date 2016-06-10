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

function _createServer(config, options, done) {
    var server = new karmaServer(config);

    server.on('browser_error', function (browser, err) {
        gutil.log('Karma Run Failed: ' + err.message);
        throw err;
    });

    server.on('run_complete', function (browsers, results) {
        if (results.failed) {
            if (options.singleRun) {
                return done(new Error('Karma: Tests Failed'));
            }
            return;
        }
        if (options.singleRun) done();
    });

    return server;
}