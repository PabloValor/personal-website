var gulp 			= require('gulp'),
	less 			= require('gulp-less'),
	refresh			= require('gulp-livereload'),
	uglify 			= require('gulp-uglify'),
	gutil 			= require('gulp-util'),
	concat 			= require('gulp-concat'),
	rename 			= require('gulp-rename'),
	imagemin 		= require('gulp-imagemin'),
	minifyCSS 		= require('gulp-minify-css'),
	autoprefixer 	= require('gulp-autoprefixer');

/*	Configure Paths 	*/
var basePaths = {
	src: './app/public/',
	dest: './app/public/'
}

var paths = {
	images: {
		src: basePaths.src + 'images/',
		dest: basePaths.dest + 'images/min/',
	},
	scripts: {
		src: basePaths.src + 'js/',
		dest: basePaths.dest + 'js/',
	},
	styles: {
		src: basePaths.src + 'styles/',
		dest: basePaths.dest + 'styles/',
	}
}


/*	LESS task	*/
gulp.task('less', function() {
	gulp.src(paths.styles.src + 'main.less')
		.pipe(less({
			paths: './app/public/styles/',
			filename: 'main.less'
			}))
		.on('error', gutil.log)
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'IE 8', 'IE 9', 'last 5 versions', 'Firefox 14', 'Opera 11.1'],
            cascade: false
        	}
        ))		
		.pipe(minifyCSS({keepSpecialComments: 0}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(refresh());
});

gulp.task('watch', function() {
	refresh.listen({start: true});
	
	gulp.watch(paths.styles.src + '*.less', ['less']);
	
});

gulp.task('default', ['less']);