var gulp = require('gulp');
var sass = require('gulp-sass');
var beautify = require('gulp-cssbeautify');
var browserSync = require('browser-sync');

var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var uglify = require('rollup-plugin-uglify');

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
// gulp.task('scripts', function() {
// 	// return gulp.src('public/scripts/bundle.js')
// 	return gulp.src('bundle.js')
// 		.pipe(babel({
// 			presets: ['babel-preset-env'],
// 			plugins: ['babel-plugin-transform-object-rest-spread']
// 		}))
// 		.pipe(uglify())
// 		.pipe(gulp.dest('./'));
// });

gulp.task('build', function() {
	return rollup.rollup({
		input: 'public/scripts/app.js',
		plugins: [
			babel({
				presets: [
					[
						'es2015', {
							'modules': false
						}
					]
				],
				babelrc: false,
				plugins: [
					'transform-object-rest-spread',
				],
				exclude: 'node_modules/**'
			}),
			uglify()
		]
	})
		.then(bundle => {
			return bundle.write({
				file: 'public/scripts/bundle.js',
				format: 'umd',
				name: 'bundle',
				sourcemap: false
			});
		});
});


gulp.task('default', ['sass', 'browser-sync'], function() {
	gulp.watch('./public/styles/*.scss', ['sass']);
});