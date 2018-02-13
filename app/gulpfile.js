var gulp = require('gulp');
var sass = require('gulp-sass');
var beautify = require('gulp-cssbeautify');
var browserSync = require('browser-sync');

gulp.task('sass', function() {
	gulp.src('./public/styles/*.scss')
		.pipe(sass({ includePaths: ['scss'] }))
		.pipe(beautify())
		.pipe(gulp.dest('./public/styles'));
});

gulp.task('browser-sync', function() {
	browserSync.init(['*.html', './public/styles/*.css', './public/scripts/*.js'], {
		server: {
			baseDir: './'
		}
	});
});

gulp.task('default', ['sass', 'browser-sync'], function() {
	gulp.watch('./public/styles/**/*.scss', ['sass']);
});