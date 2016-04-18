var path = require('path');

var gulp = require('gulp');
var server = require('gulp-server-livereload');

var paths = {
    www: path.join(__dirname, 'app')
};

gulp.task('livereload', function () {
    var config = {
        livereload: true,
        directoryListing: false,
        open: false,
        host: '127.0.0.1',
        port: 3111
    };

    return gulp.src(paths.www).pipe(server(config));
});