'use strict';

var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    wiredep = require('wiredep').stream,
    gulpNgConfig = require('gulp-ng-config'),
    autoprefixer = require('gulp-autoprefixer'),
    b2v = require('buffer-to-vinyl'),
    sync = require('gulp-npm-script-sync');

sync(gulp);

gulp.task('css', function () {
  return gulp.src('css/**/*.css')
    .pipe(minifyCSS())
    .pipe(concat('main.min.css'))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
    return gulp.src('app/**/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('config', function () {
    const json = JSON.stringify({
        BUCKET_SLUG: process.env.COSMIC_BUCKET,
        MEDIA_URL: 'https://api.cosmicjs.com/v1/' + process.env.COSMIC_BUCKET + '/media',
        URL: 'https://api.cosmicjs.com/v1/',
        READ_KEY: process.env.COSMIC_READ_KEY || '',
        WRITE_KEY: process.env.COSMIC_WRITE_KEY || '',
        STRIPE_KEY: process.env.STRIPE_KEY || ''
    });
    return b2v.stream(new Buffer(json), 'config.js')
        .pipe(gulpNgConfig('config'))
        .pipe(gulp.dest('app/config'));
});

gulp.task('default', function () {
  gulp.watch('css/**/*.css', ['css']);
  gulp.watch('app/**/**/*.js', ['js']);
  gulp.watch('bower.json', ['bower']);
});

gulp.task('bower', function () {
  gulp.src('index.html')
    .pipe(wiredep({
      directory: 'bower_components'
    }))
    .pipe(gulp.dest(''));
});
