var gulp = require('gulp'),  
    sass = require('gulp-sass'), 
    postcss = require('gulp-postcss'), //handles css plugins like autoprefixer and cssnano 
    autoprefixer = require('autoprefixer'), //autoprefixes css
    cssnano = require('cssnano'), //minifies css
	sourcemaps = require('gulp-sourcemaps'), //maps css to sass file in the DOM
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jade = require('gulp-jade'),
	imagemin = require('gulp-imagemin'); //optimize images
	cache = require('gulp-cache') //caches images so that minified images dont get reprocessed



// SASS

var sassSrc = ['app/src/sass/*.scss'],
	sassDist = ['app/dist/css'];

gulp.task('css', function () {
    var processors = [
        autoprefixer(),
        cssnano(), 
    ],
	sassOptions = {
	  errLogToConsole: true,
	  outputStyle: 'compressed'
	};
    return gulp.src(sassSrc)
		.pipe(sourcemaps.init())
        .pipe(sass(sassOptions))
        .pipe(postcss(processors))
		.pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('app/dist/css'));
});

// JAVASCRIPT

var jsSrc = ['app/src/js/*.js'],
	jsDist = ['app/dist/js'];

gulp.task('js', function() {  
    gulp.src(jsSrc) 
        .pipe(concat('script.js')) 
        .pipe(uglify()) 
        .pipe(gulp.dest('app/dist/js')); 
});

// JADE

var jadeSrc = ['app/src/jade/**/*.js'],
    jadeIndexSrc = ['app/src/jade/*.jade'],
    jadeReviewsSrc = ['app/src/jade/reviews/*.jade'];

gulp.task('jadeIndex', function() {
  return gulp.src(jadeIndexSrc)
    .pipe(jade())
    .pipe(gulp.dest(''));
});

gulp.task('jadeReviews', function() {
  return gulp.src(jadeReviewsSrc)
    .pipe(jade())
    .pipe(gulp.dest('reviews'));
});

gulp.task('jade', ['jadeIndex', 'jadeReviews']);

// ASSETS

gulp.task('images', function(){
  return gulp.src('app/src/img/**/*.+(png|jpg|jpeg|gif|svg)')
//  .pipe(cache(imagemin({
//      interlaced: true
//    })))
  .pipe(imagemin())
  .pipe(gulp.dest('app/dist/img'))
});

// WATCH

gulp.task('watch', function() {  
    gulp.watch(sassSrc, ['css']);
    gulp.watch(jsSrc, ['js']); 
	gulp.watch([jadeIndexSrc, jadeReviewsSrc], ['jade']);
});


gulp.task('default', ['css', 'js', 'jade', 'images', 'watch']);  

