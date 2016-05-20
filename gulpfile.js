var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    nodemon = require('gulp-nodemon'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('gulp-cssnano'),
    babel = require('gulp-babel')

/*
// Javascript tasks
gulp.task('javascript', () => {
    gulp.src('./public/js/*.js', {base: './'})
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }))
    .pipe(uglify())
    .pipe(concat('script.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.reload({stream:true}))
})*/

// Sass tasks
gulp.task('sass', () => {
    gulp.src('./public/sass/*.sass')
    //.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    //.pipe(autoprefixer('last 2 versions'))
    //.pipe(cssnano())
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.reload({stream:true}))
})

// HTML tasks
gulp.task('html', () => {
    gulp.src('./public/*.html')
    .pipe(browserSync.reload({stream:true}))                           
})
gulp.task('jade', () => {
    gulp.src('./views/*.jade')
    .pipe(reload({stream:true}))                    
})


// Node-sync task
gulp.task('nodemon', () => {
    nodemon({
        script: 'dev-server.js',
        ignore: ['./gulpfile.js','./node_modules','./db']
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
    gulp.watch('./public/sass/*.sass', ['sass'])
    gulp.watch('./views/*.jade', ['jade'])
})

// Default task
gulp.task('default', ['browser-sync', 'watch'])