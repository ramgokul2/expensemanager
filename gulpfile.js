let gulp = require('gulp'),
	babel = require('gulp-babel'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	fs = require('fs'),
	babelify = require('babelify'),
	watch = require('gulp-watch'),
	livereload = require('gulp-livereload'),
	runSequence = require('run-sequence'),
	webserver = require('gulp-webserver'),
	assign = require('lodash-assign')

let customOpts = { debug: true };
let opts = assign({}, watchify.args, customOpts);
let wb = watchify( browserify(opts));

wb.transform(babelify, {});

wb.add('./app.js');

gulp.task('compile', () => {
	return wb.bundle()
			.on('error', (error) => {
			 	fs.createWriteStream('bundle/app.js')
		  	.write(
		  	'var errStr = "COMPILATION ERROR! '+err.message+'";' +
		  	'console.warn(errStr); document.write(errStr)')
      		 console.warn('Error :', err.message); this.emit('end')
	 		});
	.pipe(fs.createWriteStream('build/app.js'));
});

gulp.task('webserver-serve', ['compile'], function() {
	return gulp.src('.')
		   .pipe(webserver({
		   		fallback: 'index.html',
		   		port: 80
		   }));
});

gulp.task('webserver-dev', ['compile'], function() {
	return gulp.src('.')
			.pipe(webserver({
				fallback: 'app.html',
				open: true
			}));
});

gulp.task('watch', ['compile'], function () {
  livereload.listen()
  gulp.start('webserver-dev')

  watch(['*.html', 'src/**/*.js'], function () {
    runSequence(['compile'], function() {
      livereload.reload('app.html')
    })
  })
});

gulp.task('default', ['watch'])