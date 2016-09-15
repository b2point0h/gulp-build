var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    minifycss = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

// gulp.task('browser-sync', function(){
// 	browserSync.init({
// 		server: {
// 			baseDir: './'
// 		}
// 	});
// });

gulp.task('less', function () {
    return gulp.src('./assets/less/style.less')
        .pipe(sourcemaps.init())
        .pipe(less().on('error', console.error.bind(console)))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.stream());
});

gulp.task('ourjs', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify().on('error', console.error.bind(console)))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.stream());
});


gulp.task('ourcss', function() {
    return gulp.src([])
        .pipe(sourcemaps.init())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('build/css'))
        .pipe(minifycss().on('error', console.error.bind(console)))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    return gulp.src('vendor/fonts/**/*')
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('img', function () {
    return gulp.src('vendor/img/**/*')
        .pipe(gulp.dest('build/img'));
});


gulp.task('styles', ['vendorcss']);

gulp.task('scripts', ['vendorjs', 'ourjs']);

gulp.task('clean', ['vendorjs', 'ourjs']);

gulp.task('build', ['less', 'css', 'js', 'fonts', 'img']);

gulp.task('default');

