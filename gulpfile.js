/*jshint unused:true*/
// 'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    scsslint = require('gulp-scss-lint'),
    path = require('path'),
    compass = require('gulp-compass'),
    livereload = require('gulp-livereload'),
    noop = function () {};

gulp.task('jshint', function () {
    gulp.src(['./**/*.js', '!./node_modules/**'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

// gulp.task('jscs', function () {
//     return gulp.src(['./client/js/**/*.js', '!./**/*.min.js'])
//         .pipe(jscs());
// });

gulp.task('scsslint', function () {
    gulp.src(['./client/**/*.scss'])
        .pipe(scsslint());
});

gulp.task('compass', function() {
    gulp.src('./client/sass/**/*.scss')
        .pipe(compass({
            project: __dirname,
            config_file: './client/config.rb',
            css: './client/css',
            sass: './client',
            image: './client/css/i',
            generated_images_path: './client/css/si'
        }))
        .pipe(gulp.dest('./client/css/'));
});

gulp.task('live', function() {
    livereload.listen({start:true});
    // livereload();
    gulp.watch('client/sass/**/*.scss', ['compass']);
    // Dont watch .js files since the server will restart upon their changes.
    gulp.watch(['client/css/*.css', '**/*.hbs'], function (e) {
        livereload.changed(path.relative(__dirname, e.path));
    });
});

gulp.task('default', ['jshint', 'jscs', 'scsslint'], noop);
