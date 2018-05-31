var gulp           = require('gulp'),
	uglify         = require('gulp-uglify'),
	jshint         = require('gulp-jshint');

gulp.task('lint', function() {
  return gulp.src('./src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function () {
	gulp.watch('./src/**/*.js', ['lint']);
});

gulp.task('default', ['watch', 'lint']);