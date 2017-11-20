var gulp = require ('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');

gulp.task('sass', function () {
    return gulp.src('./src/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [ 'last 2 versions' ],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('./dest/css/'))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {

    return gulp.src( ['./node_modules/bootstrap/dist/js/bootsrtap.min.js', './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', './node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('./dest/js/'))
        .pipe(browserSync.stream());

});


gulp.task('serve', ['sass'], function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })

    gulp.watch('./src/**/*.scss', ['sass'])
    gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['js','serve']);