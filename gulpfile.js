var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();
var debug = require('gulp-debug');
gulp.task('scripts', () => {
    gulp.src([
        "tools/**/*.json",
        "lib/phaser.js",
        "src/**/*.js",
    ])
        .pipe(sourcemaps.init())
        // concat has support for sourcemaps.
        .pipe(concat('game.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

gulp.task('serve', () => {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("src/**/*.js", ['scripts']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch('lib/*.js', ['scripts']);
});

gulp.task('watch', () => {
    gulp.watch("src/**/*.js", ['scripts']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch('lib/*.js', ['scripts']);
});

gulp.task('default', ['serve']);
