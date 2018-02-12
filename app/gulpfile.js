var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
	browserSync.init(['*.html', './public/styles/*.css', './public/scripts/*.js'], {
		server: {
			baseDir: './'
		}
	});
});

gulp.task('default', ['browser-sync'], function() {
	// gulp.watch('./public/styles/**/*.css')
})