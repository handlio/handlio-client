var path = require('path');

var gulp = require('gulp');
var connect = require('gulp-connect');

var paths = {
    app: path.join(__dirname, '../app')
};

var config = {
    html: path.join(paths.app, '/**/*.html'),
    js: path.join(paths.app, '/**/*.js'),
    css: path.join(paths.app, '/**/*.css')
};

gulp.task('livereload', ['livereload-connect', 'livereload-watch']);

gulp.task('livereload-connect', function () {
    connect.server({
        root: paths.app,
        livereload: true,
        fallback: paths.app + '/index.html',
        port: 3111
    });
});

gulp.task('livereload-watch', function () {
    return gulp.watch(
        [config.html, config.js, config.css],
        ['livereload-html', 'livereload-js', 'livereload-css']
    );
});

gulp.task('livereload-html', function () {
    return gulp.src(config.html).pipe(connect.reload());
});

gulp.task('livereload-js', function () {
    return gulp.src(config.js).pipe(connect.reload());
});

gulp.task('livereload-css', function () {
    return gulp.src(config.css).pipe(connect.reload());
});