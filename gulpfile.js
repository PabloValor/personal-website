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

/*		Enviroment Setup		*/
var isProduction = true;

	// Getting the current enviroment
if(gutil.env.dev === true) {
	isProduction = false;
	console.log('Gulp tasks running on development enviroment...');
}

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
		src: basePaths.src + 'scripts/',
		dest: basePaths.dest + 'scripts/',
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
		.pipe(isProduction ? minifyCSS({keepSpecialComments: 0}) : gutil.noop())
		.pipe(isProduction ? rename({suffix: '.min'}) : gutil.noop())
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(refresh());
});

/* JS task*/
gulp.task('javascript', function(){
	gulp.src([paths.scripts.src + 'vendor/*.js', paths.scripts.src + 'main.js'])
		.pipe(concat('main.js'))
		.pipe(isProduction ? uglify() : gutil.noop())
		.pipe(isProduction ? rename({suffix: '.min'}) : gutil.noop())
		.pipe(gulp.dest(paths.scripts.dest))
		.on('error',gutil.log)
		.pipe(refresh());
});


refresh.listen({start: true});

gulp.task('watch', function() {

	gulp.watch(paths.styles.src + '**/*.less', ['less']);
	gulp.watch(paths.scripts.src + '*.js', ['javascript']);
	
});

gulp.task('default', ['watch','less', 'javascript']);