// dependencies

var gulp = require('gulp');
var karma = require('karma');

// initialization

var karmaServer = karma.Server;

gulp.task('test', function (done) {
    var karmaConfig = {
        configFile: __dirname + '/../karma.config.js',
        singleRun: true
    };
    new karmaServer(karmaConfig, done).start();
});

// private methods
