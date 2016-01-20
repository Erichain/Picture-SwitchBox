/**
 * gulpfile
 * used to build, test, etc.
 * @author Erichain
 * @date 2016-01-07
 */
'use strict';

/* packages */
var gulp = require('gulp'),
    compass = require('gulp-compass'),
    wiredep = require('wiredep').stream,
    cssnano = require('gulp-cssnano'),
    livereload = require('gulp-livereload'),
    rimraf = require('rimraf'),
    runSequence = require('run-sequence'),
    openURL = require('gulp-open'),
    jshint = require('gulp-jshint'),
    connect = require('gulp-connect'),

    /* define root app */
    rootApp = {
        app: '.',
        dist: 'dist'
    },

    /* files paths */
    paths = {
        scripts: [rootApp.app + '/example/js/**/*.js'],
        styles: [rootApp.app + '/example/scss/**/*.scss'],
        views: {
            main: rootApp.app + '/example/index.html',
            files: [rootApp.app + '/**/*.html']
        },
        devFiles: rootApp.app + '*.json'
    };

////////////////////////
// Tasks definition ////
////////////////////////

gulp.task('compass', function () {
    gulp.src(paths.styles)
        .pipe(compass({
            sass: rootApp.app + '/example/scss',
            css: rootApp.app + '/example/.tmp',
            image: 'images'
        }))
        .pipe(cssnano())
        .pipe(gulp.dest(rootApp.app + '/example/.tmp'))
        .pipe(connect.reload());
});

gulp.task('lint:scripts', function () {
    gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src(paths.views.files)
        .pipe(connect.reload());
});

gulp.task('clean:tmp', function ( cb ) {
    rimraf(rootApp.app + '/example/.tmp', cb);
});

gulp.task('clean:css', function ( cb ) {
    rimraf(rootApp.app + '/example/.tmp', cb)
});

gulp.task('start:server', function () {
    connect.server({
        root: [rootApp.app + '/example'],
        livereload: {
            port: 35730
        },
        port: 9007
    });
});

/*gulp.task('build', function () {
    gulp.src([paths.scripts, paths.styles])
        .pipe(compass())
        .pipe(cssnano())
        .dest(rootApp.app + '/dist');
});*/

gulp.task('start:client', ['start:server', 'compass'], function () {
    var options = {
        uri: 'http://0.0.0.0:9007',
        app: 'Google Chrome'
    };

    gulp.src(paths.views.main)
        .pipe(openURL(options));
});

gulp.task('watch', function () {
    gulp.watch(paths.styles, ['compass']);
    gulp.watch(paths.views.files, ['html']);
    gulp.watch(paths.scripts, ['lint:scripts']);
});

gulp.task('serve', function ( cb ) {
    runSequence(
        'clean:tmp',
        'clean:css',
        ['lint:scripts'],
        ['start:client'],
        'watch', cb)
});

gulp.task('default', ['start:server', 'watch']);
