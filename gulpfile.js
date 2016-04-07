// ===================================
// Required node modules
// ===================================
var gulp            = require('gulp'),                      // use gulp
    sass            = require('gulp-sass'),                 // compiles sass
    plumber         = require('gulp-plumber'),              // prevent pipe breaking in gulp
    autoprefixer    = require('gulp-autoprefixer'),         // autoprefixes css
    browserSync     = require('browser-sync'),              // browser-sync ftw
    nodemon 		= require('gulp-nodemon')
    reload          = browserSync.reload,                   // variable to reload the browser
    uglify          = require('gulp-uglify'),               // uglifies Javascript
    minify          = require('gulp-clean-css'),            // minifies CSS
    concat          = require('gulp-concat')                // concatenates files
    imagemin 		= require('gulp-imagemin')				// image minifier
    pngquant 		= require('imagemin-pngquant'),			//
    csso 			= require('gulp-csso'),					// css minifer 
    csslint 		= require('gulp-csslint')				// css linter
    htmlhint 		= require('gulp-htmlhint')				// html linter
    jshint 			= require('gulp-jshint')				// js linter
    notify 			= require("gulp-notify")

// ===================================
// Javascript task:
// ===================================
gulp.task('javascript', () => {
    gulp.src('./publis/js/**/*.js', {base: './'})           // Source: all .js files
    .pipe(plumber())                                        // Prevent pipe breaking if errors
    .pipe(concat('script.js'))                          	// Concatenate into one file
    //.pipe(uglify())                                       // Uglify the file (Comment this while in development)
    .pipe(jshint())						
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('./'))                                  // Destination folder
    .pipe(reload({stream:true}))                            // Reload the browser
});

// ===================================
// Sass task
// ===================================
gulp.task('sass', () => {
    gulp.src('./public/css/**/*.sass', {base: './'})        // Source: sass file that imports all others
    .pipe(plumber())                                        // Prevent pipe breaking if errors
    .pipe(sass())                                           // Compiles sass
    .pipe(autoprefixer('last 3 versions'))                  // Adds vendor prefixes to css
    //.pipe(csso())                                         // Minify the css (Comment this while in development)
    .pipe(csslint())
    .pipe(csslint.reporter())
    .pipe(gulp.dest('./'))                                 	// Destination folder
    .pipe(reload({stream:true}))                            // Reload the browser
});

// ===================================
// HTML/JADE tasks
// ===================================
gulp.task('html', () => {
    gulp.src('./public/**/*.html')
    .pipe(htmlhint())
    .pipe(reload({stream:true}))                          	// Reload the browser
})
gulp.task('jade', () => {
    gulp.src('./views/**/*.jade')
    .pipe(reload({stream:true}))                          	// Reload the browser
})

// ===================================
// Browser-sync task
// ===================================
gulp.task('browser-sync', ['nodemon'], () => {
    browserSync({
        proxy: "localhost:3000",
        port: 5000,
        notify: true
	})
})

// ===================================
// Node-sync task
// ===================================
gulp.task('nodemon', () => {
  	nodemon({
    	script: 'app.js',
    	ignore: ['gulpfile.js','node_modules/']
  	})
  	.on('restart', function () {
    	setTimeout(function () {
      		reload({ stream: false })
    	}, 1000)
    	gulp.src(".").pipe(notify("Node Server Restarted!"))
  	})
  	.on('crash', function(){
  		gulp.src(".").pipe(notify("Node Server Crash!"))
  	})
  	.on('start', function(){
  		gulp.src(".").pipe(notify("Node Server Started!"))
  	})
})

// ===================================
// Image task
// ===================================
gulp.task('image', () => {
	gulp.src('./public/img/**/*', {base: './'})
	.pipe(plumber()) 
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	}))

	.pipe(gulp.dest('./'))
	.pipe(reload({stream:true}))  
})

// ===================================
// Watch tasks
// ===================================
gulp.task('watch', () => {
    gulp.watch('./public/js/**/*.js', ['javascript'])
    gulp.watch('./public/css/**/*.sass', ['sass'])
    gulp.watch('./public/**/*.html', ['html'])
    gulp.watch('./views/**/*.jade', ['jade'])
    gulp.watch('./public/img/**/*', ['image'])
})

// ===================================
// Default task
// ===================================

gulp.task('default', ['javascript', 'sass',  'html', 'jade', 'browser-sync', 'watch'])