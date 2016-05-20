// dependencies

var gulp = require('gulp');
var karma = require('karma');
var path = require('path');

// initialization

var karmaServer = karma.Server;

gulp.task('test', function (done) {
    var karmaConfig = {
        configFile: path.join(__dirname, '../', 'karma.config.js'),
        singleRun: true
    };
    new karmaServer(karmaConfig, done).start();
});

// private methods
