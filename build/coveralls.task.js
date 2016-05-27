// dependencies

var gulp = require('gulp');
var coveralls = require('gulp-coveralls');

// tasks

gulp.task('coveralls', [], function () {
    return gulp.src('reports/lcov/lcov.info').pipe(coveralls());
});