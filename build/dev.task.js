var path = require('path');

var gulp = require('gulp');
var server = require('gulp-server-livereload');

var paths = {
    app: path.join(__dirname, '../app')
};

gulp.task('livereload', function () {
    var config = {
        livereload: true,
        directoryListing: false,
        open: true,
        host: '127.0.0.1',
        port: 3111,
        fallback: 'index.html'
    };

    console.log(`Turning on livereload for "${paths.app}"`);
    return gulp.src(paths.app).pipe(server(config));
});