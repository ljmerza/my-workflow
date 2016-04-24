var gulp = require('gulp'),                     
    sass = require('gulp-sass'),                
    plumber = require('gulp-plumber'),             
    autoprefixer = require('gulp-autoprefixer'),         
    browserSync = require('browser-sync'),             
    reload = browserSync.reload,                   
    uglify = require('gulp-uglify'),    
    minify = require('gulp-clean-css'),           
    concat = require('gulp-concat'),             
    csso = require('gulp-csso'),           
    jshint = require('gulp-jshint'),
    notify = require("gulp-notify")


// Javascript tasks
gulp.task('javascript', () => {
    gulp.src('./public/js/*.js', {base: './'})
    .pipe(plumber())
    .pipe(concat('script.js'))
    //.pipe(uglify())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('./'))
    .pipe(reload({stream:true}))  
})

// Sass tasks
gulp.task('sass', () => {
    gulp.src('./public/css/*.scss', {base: './'})
    .pipe(plumber())
    .pipe(sass())                 
    .pipe(autoprefixer('last 3 versions'))
    //.pipe(csso())
    .pipe(gulp.dest('./'))
    .pipe(reload({stream:true}))
})

// HTML/JADE tasks
gulp.task('html', () => {
    gulp.src('./public/*.html')
    .pipe(reload({stream:true}))                           
})
gulp.task('jade', () => {
    gulp.src('./views/*.jade')
    .pipe(reload({stream:true}))                    
})

// Browser-sync task
gulp.task('browser-sync', ['nodemon'], () => {
    browserSync({
        proxy: "localhost:3000",
        port: 5000,
        notify: true
    })
    gulp.src(".").pipe(notify("Browser synced!"))
})

// Node-sync task
gulp.task('nodemon', () => {
    nodemon({
        script: 'app.js',
        ignore: ['./gulpfile.js','./node_modules','./db']
    })
    .on('restart', () => {
        setTimeout(() =>  {
            reload({ stream: false })
        }, 1000)
        gulp.src(".").pipe(notify("Node Server Restarted!"))
    })
    .on('crash', () => {
        gulp.src(".").pipe(notify("Node Server Crash!"))
    })
    .on('start', () => {
        gulp.src(".").pipe(notify("Node Server Started!"))
    })
})

// Watch tasks
gulp.task('watch', () => {
    gulp.watch('./public/*.html', ['html'])
    gulp.watch('./public/js/*.js', ['javascript'])
    gulp.watch('./public/css/*.scss', ['sass'])
    gulp.watch('./views/*.jade', ['jade'])
})

// Default task
gulp.task('default', ['browser-sync', 'watch'])