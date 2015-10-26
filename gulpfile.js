/*jshint unused:true*/
// 'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    jscs = require('gulp-jscs'),
    scsslint = require('gulp-scss-lint'),
    path = require('path'),
    compass = require('gulp-compass'),
    livereload = require('gulp-livereload'),
    config = require('./server/config'),
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

var fontName = "iconfonts";
var outputType = "css";
var templatesPath = "./node_modules/gulp-iconfont-css/templates/_icons.";

gulp.task('iconfont', function(){
    gulp.src(['client/icons/*.svg'])
    .pipe(iconfontCss({
        fontName: fontName,
        cssClass: 'Icon',
        path: templatesPath + outputType,
        targetPath: '../css/' + fontName + '.' + outputType,
        fontPath: '../fonts/'
    }))
    .pipe(iconfont({
        fontName: fontName,
        normalize: true
    }))
    .pipe(gulp.dest('./client/fonts/'));
});

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
    gulp.watch('client/icons/**/*.svg', ['iconfont']);
    // Dont watch .js files since the server will restart upon their changes.
    gulp.watch(['client/css/*.css', '**/*.hbs'], function (e) {
        livereload.changed(path.relative(__dirname, e.path));
    });
});

gulp.task('default', ['jshint', 'jscs', 'scsslint'], noop);
