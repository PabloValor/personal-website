var gulp 			= require('gulp'),
	less 			= require('gulp-less'),
	refresh			= require('gulp-livereload'),
	uglify 			= require('gulp-uglify'),
	gutil 			= require('gulp-util'),
	concat 			= require('gulp-concat'),
	rename 			= require('gulp-rename'),
	imagemin 		= require('gulp-imagemin'),
	minifyCSS 		= require('gulp-minify-css'),
	jshint			= require('gulp-jshint'),
	stylish 		= require('jshint-stylish'),
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
		.pipe(isProduction ? rename({basename:'pablovalor', suffix: '.min'}) : gutil.noop())
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(refresh());

		gutil.log(gutil.colors.bgGreen.bold('CSS ready!'));
});

/* JS task*/
gulp.task('javascript', function(){
	gulp.src([	paths.scripts.src + 'vendor/*.js',
				paths.scripts.src + 'google-map-api-v3.js',
			 	paths.scripts.src + 'main.js'
			 ])
		.pipe(concat('pablovalor.js'))
		.pipe(isProduction ? uglify() : gutil.noop())
		.pipe(isProduction ? rename({suffix: '.min'}) : gutil.noop())
		.pipe(gulp.dest(paths.scripts.dest + '/dist'))
		.on('error',gutil.log)
		.pipe(refresh());

		gutil.log(gutil.colors.bgGreen.bold('Javascript ready!'));
});

/* 	Jslint task	*/
gulp.task('lint', function() {
  return gulp.src(paths.scripts.src + 'main.js')
	    .pipe(jshint())
	    .pipe(jshint.reporter(stylish));
});


refresh.listen({start: true});

gulp.task('watch', function() {

	gulp.watch(paths.styles.src + '**/*.less', ['less']);
	gulp.watch(paths.scripts.src + '*.js', ['javascript', 'lint']);
});

gulp.task('default', ['watch','less', 'javascript', 'lint']);