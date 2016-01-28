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
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),

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

gulp.task('start:server', function () {
    connect.server({
        root: [rootApp.app + '/example'],
        livereload: {
            port: 35730
        },
        port: 9007
    });
});

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
        ['lint:scripts'],
        ['start:client'],
        'watch', cb)
});

/////////////
// build task
////////////
gulp.task('clean:dist', function ( cb ) {
    rimraf(rootApp.app + '/dist', cb)
});


// compress js and css and rename them
gulp.task('compress', function () {
    gulp.src(rootApp.app + '/example/js/picture-switchbox.js')
        .pipe(gulp.dest(rootApp.app + '/dist'))
        .pipe(uglify())
        .pipe(rename(function ( path ) {
            path.extname = '.min.js'
        }))
        .pipe(gulp.dest(rootApp.app + '/dist'));

    gulp.src(paths.styles)
        .pipe(compass({
            sass: rootApp.app + '/example/scss',
            css: rootApp.app + '/dist',
            image: 'images'
        }))
        .pipe(gulp.dest(rootApp.app + '/dist'))
        .pipe(cssnano())
        .pipe(rename(function ( path ) {
            path.extname = '.min.css'
        }))
        .pipe(gulp.dest(rootApp.app + '/dist'))
});

gulp.task('build', function ( cb ) {
    runSequence(
        'clean:dist',
        ['compress'],
        cb
    )
});
/////////////////
// end build task
/////////////////

gulp.task('default', ['start:server', 'watch']);
