'use strict'

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    nodemon = require('gulp-nodemon'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('gulp-cssnano'),
    babel = require('gulp-babel'),
    notify = require("gulp-notify"),
    ejs = require("gulp-ejs"),
    merge = require('merge-stream'),
    fs = require('fs')

//Javascript tasks
gulp.task('javascript', () => {
    return gulp.src([
        './public/js/jQuery/*.js',
        './public/js/jQuery Libraries/**/*.js',

        "./public/js/materialize/initial.js",
        "./public/js/materialize/jquery.easing.1.3.js",
        "./public/js/materialize/animation.js",
        "./public/js/materialize/velocity.min.js",
        "./public/js/materialize/hammer.min.js",
        "./public/js/materialize/jquery.hammer.js",
        "./public/js/materialize/global.js",
        "./public/js/materialize/collapsible.js",
        "./public/js/materialize/dropdown.js",
        "./public/js/materialize/leanModal.js",
        "./public/js/materialize/materialbox.js",
        "./public/js/materialize/parallax.js",
        "./public/js/materialize/tabs.js",
        "./public/js/materialize/tooltip.js",
        "./public/js/materialize/waves.js",
        "./public/js/materialize/toasts.js",
        "./public/js/materialize/sideNav.js",
        "./public/js/materialize/scrollspy.js",
        "./public/js/materialize/forms.js",
        "./public/js/materialize/slider.js",
        "./public/js/materialize/cards.js",
        "./public/js/materialize/chips.js",
        "./public/js/materialize/pushpin.js",
        "./public/js/materialize/buttons.js",
        "./public/js/materialize/transitions.js",
        "./public/js/materialize/scrollFire.js",
        "./public/js/materialize/date_picker/picker.js",
        "./public/js/materialize/date_picker/picker.date.js",
        "./public/js/materialize/character_counter.js",
        "./public/js/materialize/carousel.js",

        './public/js/*.js',
        ])
    .pipe(sourcemaps.init())
    // .pipe(babel({
    //     presets: ['es2015'],
    //     plugins: ['transform-runtime']
    // }))
    .pipe(uglify())
    .pipe(concat('script.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.reload({stream:true}))
})

// Sass tasks
gulp.task('sass', () => {
    let sassStream = gulp.src([
        "./public/sass/materialize/materialize.scss", "./public/sass/*.s*ss"
    ])
    .pipe(sass().on('error', sass.logError))

    let cssStream = gulp.src('./public/sass/*.css')
        
    return merge(sassStream, cssStream)
    .pipe(concat('style.css'))
    //.pipe(autoprefixer('last 2 versions'))
    //.pipe(cssnano())
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.reload({stream:true}))
})

// HTML tasks
gulp.task('html', () => {
    return gulp.src('./public/*.html')
    .pipe(browserSync.reload({stream:true}))                           
})

// Node-sync task
gulp.task('nodemon', () => {
    nodemon({
        script: 'dev-server.js',
        ignore: ['./gulpfile.js','./node_modules','./db', './public']
    })
    .on('restart', () => {
        setTimeout(() =>  {
            browserSync.reload({ stream: false })
        }, 1000)
    })
})

// Browser-sync task
gulp.task('browser-sync', ['nodemon'], () => {
    browserSync({
        proxy: "localhost:3000",
        port: 5000,
        notify: true
    })
})

// Watch tasks
gulp.task('watch', () => {
    gulp.watch('./public/*.html', ['html'])
    //gulp.watch('./public/js/*.js', ['javascript'])
    gulp.watch('./public/sass/*.s*ss', ['sass'])
})

// Default task
gulp.task('default', ['browser-sync', 'watch', 'sass'])