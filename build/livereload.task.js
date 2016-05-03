var path = require('path');

var gulp = require('gulp');
var connect = require('gulp-connect');

var paths = {
    app: path.join(__dirname, '../app')
};

var config = {
    html: path.join(paths.app, '/**/*.html'),
    js: path.join(paths.app, '/**/*.js')
};

gulp.task('livereload', ['connect', 'watch']);

gulp.task('connect', function () {
    connect.server({
        root: paths.app,
        livereload: true,
        fallback: paths.app + '/index.html',
        port: 3111
    });
});

gulp.task('watch', function () {
    gulp.watch([config.html, config.js], ['html', 'js']);
});

gulp.task('html', function () {
    gulp.src(config.html)
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src(config.js)
        .pipe(connect.reload());
});