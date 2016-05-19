// dependencies

var gulp = require('gulp');
var eslint = require('gulp-eslint');

// initialization

gulp.task('lint', function () {
    return gulp.src(['**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// private methods