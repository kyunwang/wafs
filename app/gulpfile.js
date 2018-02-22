var gulp = require('gulp');
var sass = require('gulp-sass');
var beautify = require('gulp-cssbeautify');
var browserSync = require('browser-sync');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

gulp.task('sass', function() {
	gulp.src('./public/styles/*.scss')
		.pipe(sass({ includePaths: ['scss'] }))
		.pipe(beautify())
		.pipe(gulp.dest('./public/styles'));
});

gulp.task('browser-sync', function() {
	browserSync.init(['*.html', './public/styles/main.css', './public/scripts/*.js'], {
		server: {
			baseDir: './'
		},
		port: 5000,
		ui: {
			port: 5001
		}
	});
});

// Quick transpile the bundle ES6+ JS to ES5
gulp.task('scripts', function() {
	return gulp.src('public/scripts/bundle.js')
		.pipe(babel({
			presets: ['babel-preset-env'],
			plugins: ['babel-plugin-transform-object-rest-spread']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('./'));
});


gulp.task('default', ['sass', 'browser-sync'], function() {
	gulp.watch('./public/styles/*.scss', ['sass']);
});